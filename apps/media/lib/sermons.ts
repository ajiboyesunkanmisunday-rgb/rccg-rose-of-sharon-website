/*
 * Sermons come from the church's YouTube channel (@rccgrostv) through its public feed, read on the server and
 * refreshed every half hour, so the page always shows the latest messages without anyone updating it by hand.
 */
export const CHANNEL_ID = "UCKlBidnN6lIqxDz4CYJXFUg";
export const CHANNEL_URL = "https://www.youtube.com/@rccgrostv";

export interface Sermon {
  id: string;
  title: string;
  date: string; // ISO
  thumb: string;
  series: string;
  seriesSlug: string;
}

const decode = (s: string) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));

/** Groups messages into series by what they are called (the channel itself has no series data in its feed). */
export function seriesOf(title: string): string {
  const t = title.toUpperCase();
  if (/DIGGING DEEP/.test(t)) return "Digging Deep";
  if (/FUNERAL|CELEBRATION OF LIFE|BURIAL/.test(t)) return "Celebration of Life";
  if (/CONFERENCE|CONVENTION|ABLAZE|CRUSADE|LIGHT UP/.test(t)) return "Conferences & Crusades";
  if (/SUNDAY|THANKSGIVING|SERVICE/.test(t)) return "Sunday Services";
  return "Messages";
}

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export async function getSermons(): Promise<Sermon[]> {
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`, { next: { revalidate: 1800 } });
    if (!res.ok) return [];
    const xml = await res.text();
    const seen = new Set<string>();
    const out: Sermon[] = [];
    for (const m of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
      const e = m[1];
      const id = e.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
      const title = e.match(/<title>([\s\S]*?)<\/title>/)?.[1];
      const date = e.match(/<published>(.*?)<\/published>/)?.[1];
      if (!id || !title || !date || seen.has(id)) continue;
      seen.add(id);
      const clean = decode(title).replace(/\s+/g, " ").trim();
      const series = seriesOf(clean);
      out.push({ id, title: clean, date, thumb: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`, series, seriesSlug: slugify(series) });
    }
    return out;
  } catch {
    return [];
  }
}
