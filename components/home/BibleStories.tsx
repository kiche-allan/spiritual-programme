import type { ReactNode } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionTitle } from "@/components/ui/SectionTitle";

interface Story {
  slug: string;
  title: string;
  icon: ReactNode;
}

const iconProps = {
  width: 30, height: 30, viewBox: "0 0 24 24",
  fill: "none", stroke: "#8A4A1E",
  strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const,
};

const STORIES: Story[] = [
  {
    slug: "joseph-and-the-pit",
    title: "Joseph and the Pit",
    icon: (
      <svg {...iconProps}>
        <path d="M4 10 L20 10 L18 21 L6 21 Z" />
        <ellipse cx="12" cy="10" rx="8" ry="2.4" />
        <path d="M9 4 v4 M15 4 v4 M9 4 h6" />
      </svg>
    ),
  },
  {
    slug: "hagar-in-the-wilderness",
    title: "Hagar in the Wilderness",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3 C12 3 8 9 8 13 a4 4 0 0 0 8 0 C16 9 12 3 12 3 Z" />
        <path d="M4 21 q4 -3 8 0 q4 -3 8 0" />
      </svg>
    ),
  },
  {
    slug: "mephibosheth",
    title: "Mephibosheth",
    icon: (
      <svg {...iconProps}>
        <path d="M3 18 h18" />
        <path d="M6 18 V8 h12 v10" />
        <path d="M9 8 V5 h6 v3" />
        <circle cx="9" cy="21" r="0.6" fill="#8A4A1E" />
      </svg>
    ),
  },
  {
    slug: "hannahs-prayer",
    title: "Hannah's Prayer",
    icon: (
      <svg {...iconProps}>
        <path d="M12 21 V11" />
        <path d="M12 11 C12 7 9 6 7 4 C7 8 9 10 12 11 Z" />
        <path d="M12 11 C12 7 15 6 17 4 C17 8 15 10 12 11 Z" />
        <path d="M8 21 h8" />
      </svg>
    ),
  },
  {
    slug: "ruth-and-boaz",
    title: "Ruth and Boaz",
    icon: (
      <svg {...iconProps}>
        <path d="M12 21 V10" />
        <path d="M12 10 C9 10 8 7 8 3 C11 3 12 6 12 10 Z" />
        <path d="M12 10 C15 10 16 7 16 3 C13 3 12 6 12 10 Z" />
        <path d="M12 14 C9.5 14 8.5 11.5 8.5 9 C11 9 12 11 12 14 Z" />
        <path d="M12 14 C14.5 14 15.5 11.5 15.5 9 C13 9 12 11 12 14 Z" />
      </svg>
    ),
  },
  {
    slug: "moses-and-the-red-sea",
    title: "Moses and the Red Sea",
    icon: (
      <svg {...iconProps}>
        <path d="M2 8 q2.5 -3 5 0 q2.5 -3 5 0 q2.5 -3 5 0 q2.5 -3 5 0" />
        <path d="M2 13 q2.5 -3 5 0 q2.5 -3 5 0 q2.5 -3 5 0 q2.5 -3 5 0" />
        <path d="M2 18 q2.5 -3 5 0 q2.5 -3 5 0 q2.5 -3 5 0 q2.5 -3 5 0" />
      </svg>
    ),
  },
  {
    slug: "zacchaeus",
    title: "Zacchaeus",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3 v6" />
        <path d="M12 4 C7 4 6 9 6 10 h12 c0 -1 -1 -6 -6 -6 Z" />
        <path d="M12 9 v12" />
        <path d="M9 21 h6" />
        <circle cx="15" cy="12" r="1.6" />
      </svg>
    ),
  },
  {
    slug: "the-prodigal-father",
    title: "The Prodigal Father",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="6" r="2.2" />
        <path d="M12 8.5 v5" />
        <path d="M12 9 C8 9 5 12 4 16" />
        <path d="M12 9 C16 9 19 12 20 16" />
        <path d="M8 21 v-3 M16 21 v-3" />
      </svg>
    ),
  },
  {
    slug: "bartimaeus",
    title: "Bartimaeus",
    icon: (
      <svg {...iconProps}>
        <path d="M2 12 C5 7 9 5 12 5 C15 5 19 7 22 12 C19 17 15 19 12 19 C9 19 5 17 2 12 Z" />
        <circle cx="12" cy="12" r="2.6" />
      </svg>
    ),
  },
  {
    slug: "the-emmaus-road",
    title: "The Emmaus Road",
    icon: (
      <svg {...iconProps}>
        <path d="M4 21 L10 3 M20 21 L14 3" />
        <path d="M9 15 h6 M8 18 h8" />
        <circle cx="12" cy="7" r="2.2" />
      </svg>
    ),
  },
];

export function BibleStories() {
  return (
    <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 56px" }}>
      <Eyebrow text="Stories retold" />
      <SectionTitle text="Bible Stories" />
      <p style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: "1.1rem", fontStyle: "italic",
        color: "var(--tm)", marginTop: -12, marginBottom: 24,
      }}>
        Faith, failure, and hope
      </p>

      <div className="bible-stories-row">
        {STORIES.map(story => (
          <Link
            key={story.slug}
            href={`/blog/${story.slug}`}
            className="bible-story-card"
          >
            <span className="bible-story-icon">
              {story.icon}
            </span>
            <span className="bible-story-title">{story.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
