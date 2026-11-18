"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { AppNav } from "@/components/app-nav";
import { Logo } from "@/components/logo";
import { ResetDemoButton } from "@/components/reset-demo-button";
import { buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { clientCompany } from "@/lib/data";
import { cn } from "@/lib/utils";

const titles: Record<string, string> = {
  "/": "Tableau de bord",
  "/contrats": "Mes contrats",
  "/nouvelle": "Nouvelle analyse",
  "/analyse": "Analyse des garanties",
  "/rapport": "Rapports",
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  const title = pathname.startsWith("/rapport/")
    ? "Rapport"
    : (titles[pathname] ?? "Sovereign Control");

  return (
    <div className="app-frame min-h-dvh bg-background">
      <a href="#contenu" className="skip-link">
        Aller au contenu
      </a>
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar px-4 py-5 text-sidebar-foreground lg:flex">
        <Logo />
        <div className="mt-8">
          <AppNav />
        </div>
        <div className="mt-auto px-3 pt-6">
          <p className="text-xs leading-5 text-sidebar-foreground/60">
            {clientCompany.name}
            <br />
            {clientCompany.contactName}, {clientCompany.contactRole.toLowerCase()}
          </p>
          <ResetDemoButton tone="sidebar" />
        </div>
      </aside>

      <div className="app-main lg:pl-64">
        <header className="no-print sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur lg:hidden">
          <Sheet open={open} onOpenChange={(next) => setMenuPath(next ? pathname : null)}>
            <SheetTrigger
              className={cn(buttonVariants({ variant: "outline", size: "icon" }), "size-10")}
              aria-label="Ouvrir le menu"
            >
              <Menu aria-hidden="true" />
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72 border-sidebar-border bg-sidebar p-4 text-sidebar-foreground sm:max-w-xs"
            >
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Logo />
              <div className="mt-8">
                <AppNav onNavigate={() => setMenuPath(null)} />
              </div>
              <div className="mt-6">
                <ResetDemoButton tone="sidebar" />
              </div>
            </SheetContent>
          </Sheet>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{title}</p>
            <p className="truncate text-xs text-muted-foreground">{clientCompany.name}</p>
          </div>
        </header>

        <main
          id="contenu"
          tabIndex={-1}
          className="mx-auto w-full max-w-6xl px-4 py-6 outline-none sm:px-6 lg:px-8 lg:py-8"
        >
          {children}
        </main>

        <footer className="no-print mx-auto w-full max-w-6xl px-4 pb-8 text-xs leading-5 text-muted-foreground sm:px-6 lg:px-8">
          <p>
            Maquette locale, sans compte et sans envoi de document. Les lectures sont simulées sur
            un contrat fictif : une validation humaine reste nécessaire. Rien ici ne constitue une
            certification ni un suivi automatique des changements de contrat.
          </p>
        </footer>
      </div>
    </div>
  );
}
