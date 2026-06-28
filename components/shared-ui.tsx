"use client";

// This file is now a hub that re-exports components from their new modular locations.
// This maintains backward compatibility while moving towards a cleaner structure.

export * from "@/lib/schemas";
export * from "@/components/ui/Button";
export * from "@/components/ui/StatusIcons";
export * from "@/components/ui/Animations";
export * from "@/components/ui/LayoutUtils";
export * from "@/components/ui/Misc";

// Re-export specific data that might still be expected from here
import { COMPLAINT_GUIDELINES } from "@/lib/complaint-data";
export { COMPLAINT_GUIDELINES };
