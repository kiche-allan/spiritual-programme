import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy · Walking With God",
  description: "What we store, why, and how to delete it.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-sp-cream px-4 pb-28 pt-6 font-sans text-sp-ink">
      <div className="mx-auto w-full max-w-xl">
        <Link href="/" className="mb-4 inline-flex min-h-[44px] items-center text-[14px] font-bold text-sp-muted">← Back to reading</Link>
        <h1 className="font-serif text-[2rem] font-semibold">Privacy</h1>

        <h2 className="mt-6 font-serif text-[1.4rem] font-semibold">Reading needs no account</h2>
        <p className="mt-2 leading-relaxed text-sp-muted">
          You can read every devotional without signing in. By default, the days you finish are kept only in your browser on this device.
        </p>

        <h2 className="mt-6 font-serif text-[1.4rem] font-semibold">If you save your progress</h2>
        <p className="mt-2 leading-relaxed text-sp-muted">Saving your progress is optional. If you choose it, we store:</p>
        <ul className="mt-2 list-disc pl-6 leading-relaxed text-sp-muted">
          <li>your email address (from Google or the address you type), so that you can sign in;</li>
          <li>the days you have finished (week number, day number and the time you finished it).</li>
        </ul>
        <p className="mt-2 leading-relaxed text-sp-muted">
          We use this for one purpose only: so your finished days follow you to any phone and survive clearing your browser data. We do not sell it and we do not use it for advertising.
        </p>

        <h2 className="mt-6 font-serif text-[1.4rem] font-semibold">Deleting your data</h2>
        <p className="mt-2 leading-relaxed text-sp-muted">
          Go to <Link href="/settings" className="font-bold text-sp-rust underline">Settings</Link> and choose &ldquo;Delete my account and progress&rdquo;. This removes your email address and your saved days from our database straight away. Days stored in your own browser stay on your phone until you clear them.
        </p>

        <h2 className="mt-6 font-serif text-[1.4rem] font-semibold">Your rights</h2>
        <p className="mt-2 leading-relaxed text-sp-muted">
          We handle personal data in line with the Data Protection Act, 2019 of Kenya. You have the right to know what we hold, to have it corrected and to have it deleted. You may also complain to the Office of the Data Protection Commissioner.
        </p>
        <p className="mt-2 leading-relaxed text-sp-muted">
          Accounts are provided by Supabase. If you sign in with Google, Google tells us your email address and nothing else.
        </p>
      </div>
    </main>
  );
}
