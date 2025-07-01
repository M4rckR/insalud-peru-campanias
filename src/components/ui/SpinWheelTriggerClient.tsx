"use client";

import dynamic from "next/dynamic";
import { SpinWheelTriggerProps } from "@/types";

export const SpinWheelTriggerClient = dynamic(
  () => import("./SpinWheelTrigger").then(mod => mod.SpinWheelTrigger),
  { ssr: false }
);

// Re-exportar las props para TypeScript
export type { SpinWheelTriggerProps }; 