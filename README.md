# Reach Ledger

LinkedIn Ads analytics that treats ad engagement as an outreach signal.

Most B2B LinkedIn advertising is judged on clicks, which is the wrong metric —
the majority of the effect is view-through. Reach Ledger reads company-level
engagement out of the LinkedIn Marketing API and answers a different question:
**which organisations watched your ad all the way through, and who has anyone
spoken to since?**

The point is not attribution reporting. It is to make a cold prospect slightly
warmer before anyone reaches out, and — where the individual can't be
identified — to at least know the interest exists somewhere in that company.

---

## What it does

**Analytics** — every organisation LinkedIn served an impression to, ranked by
watch depth rather than volume, with a lift score against the account's own
baseline. Filter by campaign, break the audience down by seniority, job
function, industry or company size, and log outreach directly from the table.

**Campaign management** — live campaign status straight from LinkedIn (not last
night's snapshot), pause and activate, and a boost flow that proposes targeting
from the audiences that actually completed video on that account. Everything it
creates is paused, capped at a small daily budget, and left for a human to
review in Campaign Manager.

**CRM** — who has been contacted, by whom, with a LinkedIn profile link, status
and notes. Sorted oldest-first so follow-ups surface themselves.

---

## Architecture

```
Cloud Scheduler ──06:00──▶ Cloud Run job (collector)
                               │
                               ├─▶ LinkedIn Marketing API
                               └─▶ BigQuery  (snapshots, creatives, demographics)
                                        │
Cloud Run service (Flask) ──────────────┤
   │                                    └─▶ Firestore (outreach, blocks, boosts)
   └─▶ Secret Manager (LinkedIn credentials, app password)
```

**BigQuery** holds the analytics: daily cumulative snapshots, per-creative
breakdowns, resolved company names, and the demographic splits. **Firestore**
holds the CRM records, because they are edited often and BigQuery is poor at
updates. Each store does what it is good at.

| Path | |
|---|---|
| `collector/` | Nightly snapshot job |
| `web/` | Flask service — the UI and API |
| `deploy.sh` | Deploy helper; pins project *and* account explicitly |
| `oauth_manual.py` | Three-legged OAuth by hand, syncs the refresh token to Secret Manager |
| `resolve_names.py` | Backfills `org_id` → company name |
| `collect_demographics.py` | Role/industry splits (runs locally, see below) |
| `probe.py` | Minimal check that the API returns anything at all |

---

## Things the LinkedIn API does that are not obvious

These cost real time to discover. They are the reason the design looks the way
it does.

**Never query analytics per day.** LinkedIn applies a 3-event reporting
threshold *per returned row*, so `timeGranularity=DAILY` silently drops any
company whose activity is thin on that day — measured at roughly half the
organisations on a live account. The collector snapshots cumulative lifetime
totals instead and derives daily movement by diffing consecutive snapshots.

**A "video view" is two seconds of autoplay.** It is close to meaningless as an
interest signal. Watch depth is the honest measure: of 2,776 companies reached
on one account, 506 "viewed", 191 watched half, and 68 watched to the end.
Everything ranks on completions.

**Company names come from `adTargetingEntities`, not `organizations`.**
`GET /rest/organizations/{id}` is partner-gated (403 `partnerApiOrganizations`),
but `adTargetingEntities?q=urns` resolves the same URNs and is part of the
standard Advertising API. That single substitution resolved 99% of names.

**Company and role can never be crossed.** Compound pivots are rejected and
`adAnalytics` has no company filter, so "a Director at Acme watched this" is not
obtainable. This is deliberate on LinkedIn's side — it prevents individual
re-identification — and it is why the product is framed around organisational
interest rather than named people.

**Company-attributed impressions are roughly a fifth of delivery.** The rest
falls below the reporting threshold. Worth stating plainly rather than letting
someone assume the numbers are total reach.

**Company size can be reported but not targeted.** `adAnalytics` returns bare
enums (`SIZE_1`); the `staffCountRanges` targeting facet has no URNs. The two do
not line up, so size is shown as insight only.

**Organic posts are partner-only.** Listing posts, reading post engagement and
page statistics all return `403 partnerApi*` regardless of scope. Boosting a
post converts it into an ad, at which point the full company breakdown applies —
so paid distribution is the dividing line for what is measurable.

**Creating a campaign has a specific valid shape.** `runSchedule`, `unitCost`
and `politicalIntent` are required with no defaults; objective, optimisation
target, format and cost type are validated as a *set*; currency must match the
account's; a campaign group must be created `DRAFT` then transitioned, because a
campaign cannot be paused under a draft group; and a creative must start `DRAFT`
because `PAUSED` requires an approved review. The reliable way to find any of
this is to read the shape off campaigns that already exist in the account.

---

## Access tiers

Development Tier caps the whole app at **5 ad accounts**, which is the binding
constraint on onboarding. Standard Tier is unlimited but reviewed. Accounts
appear automatically once your LinkedIn identity is granted a role on them — the
collector discovers whatever `adAccounts` returns, so no configuration is needed
per account.

---

## Running it

Requires a LinkedIn developer app with Advertising API access, a GCP project
with billing, and `gcloud` authenticated.

```bash
# one-off: obtain a token and push the refresh token to Secret Manager
python3 oauth_manual.py

# deploy the nightly collector, then run it once
./deploy.sh deploy
./deploy.sh run

# deploy the web service
./deploy.sh web

# what is deployed, when it last ran, how much data
./deploy.sh status
```

Scopes needed: `r_ads`, `r_ads_reporting`, and `rw_ads` only if you want the
boost flow to create campaigns.

Access tokens last 60 days; refresh tokens 365 and are rotated by LinkedIn on
use, so the collector writes each new one back to Secret Manager or the next run
would fail.

---

## Known rough edges

- **Demographics collection runs locally**, not in the nightly job. The same
  calls take ~35s from a laptop and stall for 30+ minutes in Cloud Run. A
  pooled HTTP session fixed this for the web service and has not yet been
  applied to the collector.
- **The app is protected by one shared password**, which is fine for internal
  use and not fine in front of customer data. IAP with an email allowlist is
  the intended replacement.
- **Multi-tenant is not built.** One member's token covers every account that
  member can reach, which works for an agency operator but not for customers
  authorising their own accounts.
