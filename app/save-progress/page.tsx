import type { Metadata } from "next";
import { Suspense } from "react";
import { SaveProgressScreen } from "./SaveProgressScreen";

export const metadata: Metadata = {
  title: "Save your progress · Walking With God",
  description: "Optionally save the days you have finished to a free account.",
};

export default function SaveProgressPage() {
  return (
    <Suspense fallback={null}>
      <SaveProgressScreen />
    </Suspense>
  );
}
