import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, BriefcaseBusiness, ChevronDown, LogOut, UsersRound } from "lucide-react";
import type { ReactNode } from "react";
import { Brand } from "./brand";
import { Button } from "./button";
import { cn } from "../lib/utils";

const nav = [
  { label: "Analytics", to: "/analytics", icon: BarChart3 },
  { label: "Campaign management", to: "/campaigns", icon: BriefcaseBusiness },
  { label: "CRM", to: "/crm", icon: UsersRound },
] as const;

export function WorkspaceShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center gap-5 px-4 lg:px-8">
          <Brand className="mr-auto sm:mr-3" />
          <button className="hidden min-w-56 items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-left sm:flex" aria-label="Switch ad account">
            <span><span className="block text-[10px] font-bold uppercase text-muted-foreground">Ad account</span><span className="block text-sm font-semibold">AudienceScan LinkedIn</span></span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </button>
          <nav className="hidden h-full items-end gap-1 lg:flex" aria-label="Workspace navigation">
            {nav.map((item) => <Link key={item.to} to={item.to} className={cn("flex h-full items-center gap-2 border-b-2 px-4 text-sm font-semibold", path === item.to ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground")}><item.icon className="size-4" />{item.label}</Link>)}
          </nav>
          <div className="ml-auto flex items-center gap-2 border-l border-border pl-4">
            <div className="grid size-8 place-items-center rounded-full bg-brand-soft text-xs font-bold text-primary">NA</div>
            <span className="hidden text-sm font-semibold xl:block">Niklas</span>
            <Button asChild variant="ghost" size="icon"><Link to="/login" aria-label="Sign out"><LogOut className="size-4" /></Link></Button>
          </div>
        </div>
        <nav className="flex overflow-x-auto px-3 lg:hidden" aria-label="Mobile workspace navigation">
          {nav.map((item) => <Link key={item.to} to={item.to} className={cn("flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 text-xs font-semibold", path === item.to ? "border-primary text-primary" : "border-transparent text-muted-foreground")}><item.icon className="size-4" />{item.label}</Link>)}
        </nav>
      </header>
      <main className="mx-auto max-w-[1500px] px-4 py-7 lg:px-8 lg:py-10">{children}</main>
    </div>
  );
}

export function PageHeading({ eyebrow, title, description, action }: { eyebrow: string; title: string; description: string; action?: ReactNode }) {
  return <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-2 text-xs font-bold uppercase text-primary">{eyebrow}</p><h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base">{description}</p></div>{action}</div>;
}

export function StatusBadge({ children, tone = "neutral" }: { children: ReactNode; tone?: "blue" | "green" | "orange" | "neutral" }) {
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold", tone === "blue" && "bg-brand-soft text-primary", tone === "green" && "bg-success-soft text-success", tone === "orange" && "bg-warning-soft text-warning", tone === "neutral" && "bg-muted text-muted-foreground")}>{children}</span>;
}
