import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Weekly Spiritual Programme · Walking With God",
  description: "A 7-day devotional programme published weekly — scripture, revelation, prayer and daily practices.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('spp_theme')||'light';document.documentElement.classList.toggle('dark',t==='dark')}catch(e){}` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
