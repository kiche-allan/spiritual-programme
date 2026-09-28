"use client";
import { useEffect, useState } from "react";
import { WifiOff } from "lucide-react";

export function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    setOffline(!navigator.onLine);
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);
    window.addEventListener("offline", goOffline);
    window.addEventListener("online", goOnline);
    return () => {
      window.removeEventListener("offline", goOffline);
      window.removeEventListener("online", goOnline);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: "#FDF3DC", color: "#92400E",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: 8, fontSize: 13, fontWeight: 700,
        fontFamily: "Lato,sans-serif",
        maxHeight: offline ? 44 : 0,
        padding: offline ? "10px 16px" : "0 16px",
        overflow: "hidden",
        opacity: offline ? 1 : 0,
        transform: offline ? "translateY(0)" : "translateY(-100%)",
        transition: "transform .3s ease, opacity .3s ease, max-height .3s ease, padding .3s ease",
      }}
    >
      <WifiOff size={15} />
      You&apos;re offline — reading from saved content
    </div>
  );
}
