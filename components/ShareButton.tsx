"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2 } from "lucide-react";

interface Props { title: string; text: string; url?: string; }

export default function ShareButton({ title, text, url }: Props) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = `${title}\n\n${text.slice(0, 120)}...\n\n${shareUrl}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1.5 text-xs font-bold tracking-wide uppercase"
        >
          <Share2 className="h-3.5 w-3.5" />
          {copied ? "Copied!" : "Share"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => window.open(
            `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            "_blank", "width=600,height=400"
          )}
        >
          📘 Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => window.open(
            `https://wa.me/?text=${encodeURIComponent(shareText)}`,
            "_blank"
          )}
        >
          💬 WhatsApp
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer" onClick={copyLink}>
          🔗 Copy link
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
