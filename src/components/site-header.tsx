import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Brand } from "./brand";
import { Button } from "./button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand />
        <nav className="hidden items-center gap-8 text-sm font-semibold text-muted-foreground md:flex" aria-label="Main navigation">
          <a href="#how-it-works" className="hover:text-foreground">How it works</a>
          <a href="#product" className="hover:text-foreground">Product</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm"><Link to="/login">Sign in</Link></Button>
          <Button asChild size="sm"><Link to="/login">View demo <ArrowRight className="size-3.5" /></Link></Button>
        </div>
      </div>
    </header>
  );
}
