// Shared type for a single day's content
// Every week content file exports an array of these

export interface Verse {
  label: string;
  text: string;
  ref: string;
}

export interface DayContent {
  num: number;
  abbr: string;       // "Mon", "Tue" etc.
  name: string;       // "Monday" etc.
  title: string;
  theme: string;      // subtitle under the title
  accent: string;     // hex colour e.g. "#5A2D82"
  bg: string;         // light bg hex e.g. "#F5EEFA"
  verses: Verse[];
  revelation: string[];   // one string per paragraph
  prayers: string[];      // one string per paragraph
  amen: string;
  practices: string[];    // exactly 4 items
}
