import type { Metadata } from "next";
import { SettingsPanel } from "@/components/save/SettingsPanel";

export const metadata: Metadata = {
  title: "Settings · Walking With God",
  description: "Your saved progress and account.",
};

export default function SettingsPage() {
  return <SettingsPanel />;
}
