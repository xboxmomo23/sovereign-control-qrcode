"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSearch, FolderOpen, LayoutDashboard, ScrollText } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/contrats", label: "Mes contrats", icon: FolderOpen },
  { href: "/nouvelle", label: "Nouvelle analyse", icon: FileSearch },
  { href: "/rapport", label: "Rapports", icon: ScrollText },
];

export function AppNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Navigation principale">
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 outline-none hover:bg-sidebar-accent hover:text-sidebar-foreground focus-visible:ring-2 focus-visible:ring-turquoise-bright",
                  active &&
                    "bg-sidebar-accent text-sidebar-foreground shadow-[inset_3px_0_0_0_var(--turquoise-bright)]",
                )}
              >
                <Icon aria-hidden="true" className="size-4 shrink-0" />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
