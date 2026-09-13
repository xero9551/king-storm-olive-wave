import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Boxes,
  Crosshair,
  LayoutDashboard,
  Menu,
  Shield,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useDashboardStats } from "@/lib/sboim/use-kev";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Overview", icon: LayoutDashboard },
  { to: "/inventory", label: "Inventory", icon: Boxes },
  { to: "/matches", label: "Cross-check", icon: Crosshair },
  { to: "/kev", label: "KEV catalog", icon: ShieldAlert },
  { to: "/alerts", label: "Alerts", icon: Bell },
] as const;

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const stats = useDashboardStats();

  return (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const count =
          item.to === "/matches" ? stats.high : item.to === "/inventory" ? stats.sbomCount : null;
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex h-11 items-center gap-3 rounded-md px-3 text-sm transition-colors",
              active
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" />
            <span className="flex-1">{item.label}</span>
            {count !== null && count > 0 ? (
              <span className="font-mono text-xs tabular-nums text-muted-foreground">{count}</span>
            ) : null}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3 px-1 py-2">
      <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-secondary">
        <Shield className="size-4 text-signal" />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-medium tracking-tight">SBOIM</span>
        <span className="text-[11px] text-muted-foreground">SBOM intelligence</span>
      </span>
    </Link>
  );
}

function CatalogMeta() {
  const stats = useDashboardStats();
  return (
    <div className="rounded-lg border border-border bg-secondary/50 p-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] uppercase tracking-wide text-muted-foreground">CISA KEV</p>
        <Badge variant={stats.source === "live" ? "ok" : stats.source === "fallback" ? "low" : "signal"}>
          {stats.source ?? "…"}
        </Badge>
      </div>
      <p className="mt-2 font-mono text-lg tabular-nums leading-none">{stats.catalogCount || "—"}</p>
      <p className="mt-1 text-[11px] text-muted-foreground">
        {stats.catalogVersion ? `v${stats.catalogVersion}` : "polling feed"}
      </p>
    </div>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col gap-6">
      <Brand />
      <NavLinks onNavigate={onNavigate} />
      <div className="mt-auto">
        <CatalogMeta />
        <p className="mt-3 px-1 text-[11px] leading-relaxed text-muted-foreground">
          Ported from Purplelotusec/SBOIM — generate, sign, cross-check, alert.
        </p>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-svh bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-border bg-sidebar p-4 md:flex md:flex-col">
        <SidebarBody />
      </aside>

      <div className="md:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur md:hidden">
          <Button variant="ghost" size="icon" onClick={() => setOpen(true)} aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
          <Brand />
        </header>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="bg-sidebar p-4">
            <SidebarBody onNavigate={() => setOpen(false)} />
          </SheetContent>
        </Sheet>
        <main className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
    </div>
  );
}
