import { BarChart3 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "../lib/utils";

export function Brand({ compact = false, className }: { compact?: boolean; className?: string }) {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2.5 font-extrabold tracking-tight text-foreground", className)}>
      <span className="grid size-8 place-items-center rounded bg-primary text-primary-foreground"><BarChart3 className="size-5" /></span>
      {!compact && <span className="text-lg">Reach Ledger</span>}
    </Link>
  );
}
