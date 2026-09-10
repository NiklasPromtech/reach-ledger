# Reach Ledger white LinkedIn-inspired redesign

## Goal
Create a polished frontend prototype for a LinkedIn Ads analytics product that turns high-intent ad engagement into a warmer outreach pipeline. The product should help teams see which companies watched or clicked, prioritize those organizations, and track follow-up.

## Visual direction
- Bright white canvas with LinkedIn-inspired blue, cool gray dividers, dark navy text, and restrained success/status colors.
- Professional network feel rather than an “intelligence tool” aesthetic.
- Clean, data-dense layouts with strong hierarchy, readable tables, compact filters, and familiar account/workspace navigation.
- Use the uploaded screens only as product and content references; do not embed them in the site.
- Responsive desktop and mobile layouts with subtle, purposeful interactions.

## Pages
1. **Landing page**
   - Position Reach Ledger as LinkedIn Ads analytics for finding warm accounts before outreach.
   - Explain the workflow: run targeted video ads, identify engaged companies, prioritize outreach, and track follow-up.
   - Use an in-product analytics preview as the main visual signal.
   - Add concise benefit sections and clear sign-in/demo actions without generic “AI intelligence” language.

2. **Login page**
   - White, LinkedIn-inspired sign-in screen with product branding, email/password fields, password recovery link, and clear validation states.
   - Frontend demonstration only; no real authentication or stored credentials.

3. **Account selection page**
   - Show available LinkedIn ad accounts with account name, ID, impressions, engaged companies, high-intent signals, and watched-to-end totals.
   - Make each account clearly selectable and provide a visible sign-out action.

4. **Account workspace**
   - Shared header with account switcher, signed-in user area, and primary navigation.
   - **Analytics:** KPI summary, campaign filters, company engagement rankings, completion/click metrics, lift indicators, and outreach status.
   - **Campaign management:** campaign status table plus a structured “boost a post” targeting form based on the reference flow.
   - **CRM:** searchable outreach table, status filters, follow-up flags, and an outreach dialog for person, role, LinkedIn URL, status, and notes.

## Interaction scope
- Navigation between all pages and workspace sections will work.
- Tabs, filters, account selection, campaign controls, and the outreach dialog will use realistic mock data and frontend state.
- No database, live LinkedIn connection, or real login will be added in this design phase.

## Technical details
- Build separate TanStack routes for the landing page, login, account selection, Analytics, Campaign management, and CRM.
- Create a shared workspace shell and reusable controls for metrics, tables, filters, status labels, and dialogs.
- Define the white/blue visual system with semantic design tokens in the global stylesheet.
- Add unique page titles and descriptions for each route.
- Verify the final experience at desktop and mobile widths, including table overflow, dialogs, navigation, and form states.
