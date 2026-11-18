"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DEMO_CONTRACT_ID } from "@/lib/data";
import { useDemo } from "@/lib/demo-context";
import { cn } from "@/lib/utils";

export function StartDemoButton({
  children,
  className,
  size = "lg",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "lg";
}) {
  const { selectContract } = useDemo();
  const router = useRouter();

  return (
    <Button
      size={size}
      className={cn(className)}
      onClick={() => {
        selectContract(DEMO_CONTRACT_ID);
        router.push("/nouvelle");
      }}
    >
      {children}
      <ArrowRight aria-hidden="true" />
    </Button>
  );
}
