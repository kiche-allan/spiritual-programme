// lib/email-templates.ts
import type { DayContent } from "@/lib/content/types";
import type { WeekMeta } from "@/lib/weeks";

export function buildDailyEmail({
  day,
  week,
  appUrl,
  unsubscribeToken,
}: {
  day: DayContent;
  week: WeekMeta;
  appUrl: string;
  unsubscribeToken: string;
}): { subject: string; html: string } {
  const weekUrl = `${appUrl}/week/${week.id}`;
  const unsubUrl = `${appUrl}/api/unsubscribe?token=${unsubscribeToken}`;
  const anchorVerse = day.verses[0];
  const revelationSnippet = day.revelation[0].slice(0, 280) + "...";

  const subject = `Day ${day.num}: ${day.title} — ${week.subtitle}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Georgia',serif;">
  <div style="max-width:580px;margin:0 auto;background:#ffffff;">

    <!-- Header -->
    <div style="background:#0D1F3C;padding:32px 40px;text-align:center;">
      <p style="margin:0 0 6px;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#B8CCEC;font-family:Arial,sans-serif;">
        ${week.subtitle} · Day ${day.num}
      </p>
      <h1 style="margin:0;font-size:26px;font-weight:300;color:#FAF7F2;line-height:1.3;">
        ${day.title}
      </h1>
    </div>

    <!-- Body -->
    <div style="padding:36px 40px;">

      <!-- Verse -->
      <div style="border-left:4px solid #1A3A6E;padding:14px 20px;background:#EBF1FA;border-radius:0 8px 8px 0;margin-bottom:28px;">
        <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#1A3A6E;font-family:Arial,sans-serif;">
          ${anchorVerse.label}
        </p>
        <p style="margin:0 0 8px;font-size:16px;line-height:1.7;color:#3A332A;font-style:italic;">
          &ldquo;${anchorVerse.text}&rdquo;
        </p>
        <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:.06em;color:#7A6E62;text-transform:uppercase;font-family:Arial,sans-serif;">
          ${anchorVerse.ref}
        </p>
      </div>

      <!-- Revelation snippet -->
      <h2 style="margin:0 0 12px;font-size:13px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#1A3A6E;font-family:Arial,sans-serif;">
        Today's Revelation
      </h2>
      <p style="margin:0 0 28px;font-size:15px;line-height:1.8;color:#3A332A;">
        ${revelationSnippet}
      </p>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:32px;">
        <a href="${weekUrl}" style="display:inline-block;padding:14px 32px;background:#1A3A6E;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:8px;font-family:Arial,sans-serif;">
          Read Today's Full Programme →
        </a>
      </div>

      <!-- Prayer teaser -->
      <div style="background:#F2EDE3;border-radius:8px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 8px;font-size:10px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#7A6E62;font-family:Arial,sans-serif;">
          Morning Prayer
        </p>
        <p style="margin:0;font-size:14px;line-height:1.75;color:#3A332A;font-style:italic;">
          ${day.prayers[0].slice(0, 200)}...
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #E0D8CC;padding:24px 40px;text-align:center;background:#F2EDE3;">
      <p style="margin:0 0 8px;font-size:13px;font-style:italic;color:#7A6E62;">
        &ldquo;Your word is a lamp to my feet and a light to my path.&rdquo; — Psalm 119:105
      </p>
      <p style="margin:0;font-size:11px;color:#B0A89E;font-family:Arial,sans-serif;">
        Walking With God · Weekly Spiritual Programme<br>
        <a href="${unsubUrl}" style="color:#B0A89E;">Unsubscribe</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();

  return { subject, html };
}

export function buildWelcomeEmail({
  appUrl,
}: {
  appUrl: string;
}): { subject: string; html: string } {
  const subject = "Welcome to Walking With God 🙏";

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:'Georgia',serif;">
  <div style="max-width:580px;margin:0 auto;background:#ffffff;">

    <!-- Header -->
    <div style="background:#0D1F3C;padding:40px 40px;text-align:center;">
      <h1 style="margin:0;font-size:32px;font-weight:300;color:#FAF7F2;line-height:1.3;">
        Welcome
      </h1>
      <p style="margin:8px 0 0;font-size:14px;color:#B8CCEC;font-family:Arial,sans-serif;">
        Your spiritual journey begins today
      </p>
    </div>

    <!-- Body -->
    <div style="padding:40px 40px;">

      <!-- Main message -->
      <p style="margin:0 0 20px;font-size:16px;line-height:1.8;color:#3A332A;">
        Thank you for joining <strong>Walking With God</strong>! We're excited to guide you through 7 weeks of spiritual reflection, scripture study, and prayer.
      </p>

      <p style="margin:0 0 28px;font-size:16px;line-height:1.8;color:#3A332A;">
        Starting tomorrow morning, you'll receive daily emails with:
      </p>

      <!-- Features list -->
      <ul style="margin:0 0 28px;padding-left:20px;list-style:none;">
        <li style="margin-bottom:12px;font-size:15px;line-height:1.6;color:#3A332A;">
          ✓ Anchor verses with daily scriptures
        </li>
        <li style="margin-bottom:12px;font-size:15px;line-height:1.6;color:#3A332A;">
          ✓ Spiritual revelations to meditate on
        </li>
        <li style="margin-bottom:12px;font-size:15px;line-height:1.6;color:#3A332A;">
          ✓ Practical daily practices
        </li>
        <li style="margin-bottom:12px;font-size:15px;line-height:1.6;color:#3A332A;">
          ✓ Prayer guidance for your morning
        </li>
      </ul>

      <!-- CTA -->
      <div style="text-align:center;margin-bottom:32px;">
        <a href="${appUrl}" style="display:inline-block;padding:14px 32px;background:#1A3A6E;color:#ffffff;font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border-radius:8px;font-family:Arial,sans-serif;">
          View This Week's Programme →
        </a>
      </div>

      <!-- Quote -->
      <div style="background:#EBF1FA;border-radius:8px;padding:24px;border-left:4px solid #1A3A6E;margin-bottom:28px;">
        <p style="margin:0;font-size:15px;line-height:1.8;color:#3A332A;font-style:italic;">
          &ldquo;Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.&rdquo;
        </p>
        <p style="margin:12px 0 0;font-size:12px;font-weight:700;letter-spacing:.06em;color:#7A6E62;text-transform:uppercase;font-family:Arial,sans-serif;">
          — Proverbs 3:5-6
        </p>
      </div>

      <p style="margin:0;font-size:15px;line-height:1.8;color:#3A332A;">
        We pray this journey deepens your faith and strengthens your walk with God.
      </p>

    </div>

    <!-- Footer -->
    <div style="border-top:1px solid #E0D8CC;padding:24px 40px;text-align:center;background:#F2EDE3;">
      <p style="margin:0;font-size:11px;color:#B0A89E;font-family:Arial,sans-serif;">
        Walking With God · Weekly Spiritual Programme<br>
        <a href="${appUrl}" style="color:#B0A89E;text-decoration:none;">Visit our website</a> | <a href="${appUrl}" style="color:#B0A89E;text-decoration:none;">View this week</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();

  return { subject, html };
}
