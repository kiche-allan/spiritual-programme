// components/ui/ProgressBackup.tsx
"use client";
import { useRef, useState } from "react";
import { exportProgress, importProgress } from "@/lib/progress-backup";

interface Props {
  onImported?: () => void; // called after successful import so parent can refresh
}

export function ProgressBackup({ onImported }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string>("");
  const [statusType, setStatusType] = useState<"ok" | "err" | "">("");

  const handleExport = () => {
    exportProgress();
    setStatus("Progress exported successfully.");
    setStatusType("ok");
    setTimeout(() => setStatus(""), 3000);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await importProgress(file);
    if (result.ok) {
      setStatus(`✓ Imported progress for ${result.weeksImported} week${result.weeksImported !== 1 ? "s" : ""}.`);
      setStatusType("ok");
      onImported?.();
    } else {
      setStatus(result.error);
      setStatusType("err");
    }

    // Reset the input so the same file can be re-selected if needed
    if (fileRef.current) fileRef.current.value = "";
    setTimeout(() => setStatus(""), 4000);
  };

  const btnBase: React.CSSProperties = {
    padding: "8px 16px",
    borderRadius: 8,
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: ".06em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "Lato,sans-serif",
    transition: "all .2s",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        {/* Export */}
        <button
          onClick={handleExport}
          style={{
            ...btnBase,
            background: "var(--bg2)",
            border: "1.5px solid var(--border)",
            color: "var(--tm)",
          }}
        >
          ↓ Export Progress
        </button>

        {/* Import — triggers hidden file input */}
        <button
          onClick={() => fileRef.current?.click()}
          style={{
            ...btnBase,
            background: "var(--bg2)",
            border: "1.5px solid var(--border)",
            color: "var(--tm)",
          }}
        >
          ↑ Import Progress
        </button>

        <input
          ref={fileRef}
          type="file"
          accept=".json"
          onChange={handleImport}
          style={{ display: "none" }}
        />
      </div>

      {status && (
        <p style={{
          fontSize: 12,
          color: statusType === "ok" ? "#2E6B50" : "#7A1A1A",
          fontWeight: 600,
        }}>
          {status}
        </p>
      )}
    </div>
  );
}
