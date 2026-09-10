import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MousePointerClick, Play, Target, UsersRound } from "lucide-react";
import { Button } from "../components/button";
import { SiteHeader } from "../components/site-header";
import { companies } from "../data/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Reach Ledger — Turn ad engagement into warmer outreach" },
    { name: "description", content: "See which companies engage with your LinkedIn ads and turn that signal into a prioritized outreach pipeline." },
    { property: "og:title", content: "Reach Ledger — Warmer outreach from LinkedIn Ads" },
    { property: "og:description", content: "Identify engaged companies, prioritize outreach, and track every follow-up." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ]}), component: LandingPage,
});

function LandingPage() {
  return <div className="min-h-screen bg-background"><SiteHeader /><main>
    <section className="overflow-hidden border-b border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-14 pt-16 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:px-8 lg:pb-24 lg:pt-24">
        <div className="animate-rise">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-brand-soft px-3 py-1.5 text-xs font-bold text-primary"><span className="size-1.5 rounded-full bg-primary" />LinkedIn Ads → Outreach</div>
          <h1 className="max-w-xl text-5xl font-extrabold leading-[1.06] tracking-tight md:text-6xl">Know which companies are already interested.</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground">Reach Ledger shows which organisations watched, clicked, and engaged with your LinkedIn ads—so your next conversation starts warm, not cold.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg"><Link to="/login">Explore the demo <ArrowRight className="size-4" /></Link></Button><Button asChild variant="secondary" size="lg"><a href="#how-it-works"><Play className="size-4" />See how it works</a></Button></div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground"><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" />Company-level intent</span><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" />No guesswork</span><span className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" />Built for outreach</span></div>
        </div>
        <ProductPreview />
      </div>
    </section>
    <section id="how-it-works" className="border-b border-border py-20"><div className="mx-auto max-w-7xl px-5 lg:px-8"><p className="text-xs font-bold uppercase text-primary">From signal to conversation</p><h2 className="mt-3 max-w-2xl text-3xl font-extrabold tracking-tight md:text-4xl">Turn campaign engagement into a focused outreach list.</h2><div className="mt-12 grid gap-px overflow-hidden rounded-lg border border-border bg-border md:grid-cols-3">{[
      [Target,"01","Run a focused campaign","Target the roles, industries, and company sizes that matter to your team."],
      [MousePointerClick,"02","See who engaged","Surface companies where people watched to the end or clicked through."],
      [UsersRound,"03","Reach out with context","Prioritize the organisations showing intent and track your follow-up."],
    ].map(([Icon,n,t,d]) => { const I = Icon as typeof Target; return <div key={String(n)} className="bg-card p-7"><div className="flex items-center justify-between"><I className="size-6 text-primary" /><span className="text-xs font-extrabold text-border-strong">{String(n)}</span></div><h3 className="mt-8 text-lg font-bold">{String(t)}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{String(d)}</p></div>})}</div></div></section>
    <section className="bg-foreground py-16 text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-5 md:flex-row md:items-center lg:px-8"><div><h2 className="text-3xl font-extrabold">Make your next lead less cold.</h2><p className="mt-2 text-sm text-primary-foreground/70">Explore the full workflow with realistic sample campaign data.</p></div><Button asChild className="bg-card text-foreground hover:bg-muted" size="lg"><Link to="/login">Open demo workspace <ArrowRight className="size-4" /></Link></Button></div></section>
  </main><footer className="border-t border-border bg-card"><div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-8 text-xs text-muted-foreground lg:px-8"><span className="font-bold text-foreground">Reach Ledger</span><span>LinkedIn engagement, made actionable.</span></div></footer></div>;
}

function ProductPreview() { return <div id="product" className="animate-rise overflow-hidden rounded-lg border border-border bg-card shadow-[0_24px_80px_-36px_var(--color-foreground)] [animation-delay:120ms]"><div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-3"><span className="text-xs font-bold">AudienceScan LinkedIn</span><span className="rounded-full bg-success-soft px-2 py-1 text-[10px] font-bold text-success">LIVE DATA</span></div><div className="p-5"><div className="flex items-end justify-between"><div><p className="text-[10px] font-bold uppercase text-muted-foreground">Engaged companies</p><p className="mt-1 text-3xl font-extrabold">2,264</p></div><p className="text-xs font-bold text-success">↑ 18.4%</p></div><div className="mt-5 grid grid-cols-3 gap-2">{[["43,952","Impressions"],["395","Completed"],["194","High intent"]].map(([v,l]) => <div key={l} className="rounded border border-border p-3"><p className="text-lg font-bold">{v}</p><p className="text-[10px] text-muted-foreground">{l}</p></div>)}</div><div className="mt-5"><div className="grid grid-cols-[1fr_64px_64px] border-b border-border pb-2 text-[9px] font-bold uppercase text-muted-foreground"><span>Company</span><span>Completed</span><span>Signal</span></div>{companies.slice(0,4).map((c,i)=><div key={c.company} className="grid grid-cols-[1fr_64px_64px] items-center border-b border-border/70 py-3 text-xs"><span className="font-semibold">{c.company}</span><span>{c.completed}</span><span className="font-bold text-primary">{c.signal}</span><div className="col-span-3 mt-2 h-1 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary" style={{width:`${84-i*13}%`}} /></div></div>)}</div></div></div> }
