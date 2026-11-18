"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { contracts, DEMO_CONTRACT_ID } from "@/lib/data";

const STORAGE_KEY = "sovereign-control-demo-v1";
const CHANGE_EVENT = "sovereign-control-demo";

type DemoState = {
  analysisComplete: boolean;
  selectedContractId: string;
  activeFindingId: string | null;
  notice: string | null;
};

type DemoContextValue = DemoState & {
  selectContract: (id: string) => void;
  selectFinding: (id: string) => void;
  completeAnalysis: () => void;
  resetDemo: () => void;
};

const emptyState: DemoState = {
  analysisComplete: false,
  selectedContractId: DEMO_CONTRACT_ID,
  activeFindingId: null,
  notice: null,
};

let current = emptyState;
let storageLoaded = false;

function loadStorage() {
  if (storageLoaded || typeof window === "undefined") return;
  storageLoaded = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw) as Partial<DemoState>;
    const selected =
      typeof parsed.selectedContractId === "string" &&
      contracts.some((contract) => contract.id === parsed.selectedContractId)
        ? parsed.selectedContractId
        : DEMO_CONTRACT_ID;
    current = {
      analysisComplete: parsed.analysisComplete === true,
      selectedContractId: selected,
      activeFindingId: typeof parsed.activeFindingId === "string" ? parsed.activeFindingId : null,
      notice: null,
    };
  } catch {
    current = emptyState;
  }
}

function publish(next: DemoState, persist: boolean) {
  current = next;
  if (typeof window === "undefined") return;
  if (persist) {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        analysisComplete: next.analysisComplete,
        selectedContractId: next.selectedContractId,
        activeFindingId: next.activeFindingId,
      }),
    );
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CHANGE_EVENT, onStoreChange);
}

function getSnapshot() {
  loadStorage();
  return current;
}

function getServerSnapshot() {
  return emptyState;
}

const listeners = {
  selectContract(id: string) {
    if (!contracts.some((contract) => contract.id === id) || current.selectedContractId === id) {
      return;
    }
    publish({ ...current, selectedContractId: id }, true);
  },
  selectFinding(id: string) {
    if (current.activeFindingId === id) return;
    publish({ ...current, activeFindingId: id }, true);
  },
  completeAnalysis() {
    publish(
      {
        ...current,
        analysisComplete: true,
        selectedContractId: DEMO_CONTRACT_ID,
        activeFindingId: current.activeFindingId ?? "f-propriete",
        notice: null,
      },
      true,
    );
  },
  resetDemo() {
    publish(
      {
        ...emptyState,
        notice: "La démonstration est revenue à son point de départ.",
      },
      false,
    );
  },
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const value: DemoContextValue = {
    ...state,
    ...listeners,
  };
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) {
    throw new Error("useDemo doit être utilisé dans DemoProvider.");
  }
  return value;
}
