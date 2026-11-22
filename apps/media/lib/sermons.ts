/*
 * Sermons are the messages uploaded to the church's own server through the media section of the management app.
 * The YouTube channel (@rccgrostv) is not played here: visitors are sent to it through CHANNEL_URL.
 */
import { fetchCategory, isVideoUrl } from "./library";

export const CHANNEL_URL = "https://www.youtube.com/@rccgrostv";

export interface Sermon {
  id: string;
  title: string;
  date: string; // ISO
  thumb: string;
  /** the main series this message belongs to, or "" when it stands alone */
  series: string;
  seriesSlug: string;
  /** every series it belongs to (a message can be in a multi-part series and a subject series) */
  all: string[];
  part?: number;
  /** the message as audio (podcast style); empty until the audio file is uploaded */
  audio?: string;
  /** the message as a video file from the media library (played in a video window) */
  video?: string;
  speaker?: string;
  description?: string;
}

const NUMBER_WORDS: Record<string, number> = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5, SIX: 6, SEVEN: 7, EIGHT: 8, NINE: 9, TEN: 10 };
const PART_RE = /\bPART\s*(\d+|ONE|TWO|THREE|FOUR|FIVE|SIX|SEVEN|EIGHT|NINE|TEN)\b/i;

const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|[\s(-])([a-z])/g, (_, a, b) => a + b.toUpperCase()).replace(/'S\b/g, "'s");

/**
 * Multi-part messages ("Part 1", "Part Two" ...) form one series named after the message.
 * Returns the series name and the part number, or null when the title has no part marker.
 */
export function partSeries(title: string): { name: string; part: number } | null {
  const segs = title.split(/\|\|?|\/\//).map((x) => x.trim());
  const seg = segs.find((x) => PART_RE.test(x));
  if (!seg) return null;
  const m = seg.match(PART_RE)!;
  const part = /^\d+$/.test(m[1]) ? parseInt(m[1], 10) : NUMBER_WORDS[m[1].toUpperCase()];
  const base = seg
    .replace(PART_RE, "")
    .replace(/\([^)]*\)/g, "")
    .replace(/[^\p{L}\p{N}?!'’\s-]/gu, " ")
    .replace(/\b(LIVE NOW|LIVE)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  return base.length > 3 ? { name: titleCase(base), part } : null;
}

/** Subjects that bring related messages together even when they are not numbered parts. */
const THEMES: { name: string; re: RegExp }[] = [
  { name: "The Love of God", re: /\bLOV(E|ES|ED|ING)\b/i },
  { name: "Faith", re: /\bFAITH/i },
  { name: "Grace", re: /\bGRACE/i },
  { name: "Prayer", re: /\bPRAY|\bVIGIL|\bFASTING\b/i },
  { name: "Healing", re: /\bHEAL/i },
  { name: "The Holy Spirit", re: /\bHOLY SPIRIT|\bANOINT/i },
  { name: "Wisdom & Guidance", re: /\bWISDOM|\bGUIDANCE|\bINTELLIGENCE|\bDECISION|\bDIVINE\b/i },
  { name: "Giving & Wealth", re: /\bWEALTH|\bGIVING|\bMONEY|\bTITHE|\bOFFERING|\bPROSPER|\bFINANC/i },
  { name: "Discipline & Growth", re: /\bDISCIPLINE|\bNEXT LEVEL|\bGROWTH/i },
  { name: "Forgiveness & Offence", re: /\bOFFEN|\bFORGIV/i },
  { name: "Salvation", re: /\bSALVATION|\bBORN AGAIN|\bREDEMPTION|\bTHE CROSS\b/i },
  { name: "Thanksgiving", re: /\bTHANKSGIVING/i },
  { name: "Digging Deep Bible Study", re: /DIGGING DEEP/i },
  { name: "Youth Sunday", re: /YOUTH SUNDAY/i },
  { name: "Celebration of Life", re: /FUNERAL|CELEBRATION OF LIFE|BURIAL/i },
  { name: "Conferences & Crusades", re: /CONFERENCE|CONVENTION|ABLAZE|CRUSADE|LIGHT UP IKEJA/i },
  { name: "Sunday Services", re: /SUNDAY (FIRST |SECOND )?SERVICE|LIVE SUNDAY|PRAYER SUNDAY/i },
];

/** Every series a message belongs to: its multi-part series first, then any subjects it speaks about. */
export function seriesFor(title: string): { names: string[]; part?: number } {
  const names: string[] = [];
  const p = partSeries(title);
  if (p) names.push(p.name);
  THEMES.forEach((t) => { if (t.re.test(title) && !names.includes(t.name)) names.push(t.name); });
  return { names, part: p?.part };
}

export const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/**
 * Messages as audio from the church's media library (Rose of Sharon API, kept on the church server). The API needs a
 * token, so it is read here on the server with ROS_MEDIA_TOKEN and never reaches the browser.
 */
async function getLibrarySermons(): Promise<Sermon[]> {
  const out: Sermon[] = [];
  for (const category of ["SERMON", "PODCAST", "VIDEOS"]) {
    for (const m of await fetchCategory(category)) {
      if (!m.displayUrl || !m.title) continue;
      const f = seriesFor(String(m.title));
      const series = f.names[0] ?? "";
      const isVideo = isVideoUrl(m.displayUrl);
      out.push({
        id: String(m.id), title: String(m.title), date: m.date || m.createdOn || new Date(0).toISOString(), thumb: m.thumbnailUrl || "/ros-logo.png",
        series, seriesSlug: slugify(series), all: f.names, part: f.part,
        ...(isVideo ? { video: m.displayUrl } : { audio: m.displayUrl }),
        speaker: m.speaker || undefined, description: m.description || undefined,
      });
    }
  }
  return out.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

/** The messages uploaded to the church server, newest first. */
export async function getSermons(): Promise<Sermon[]> {
  return getLibrarySermons();
}
