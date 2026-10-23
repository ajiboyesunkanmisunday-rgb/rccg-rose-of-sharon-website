/* Data for the Youth section (RCCG Rose of Sharon youth church — YLP). Placeholders are marked "To be announced". */

export const YOUTH_BASE = "/youth";
export const YOUTH_NAME = "Rose of Sharon Youth";
export const TBA = "To be announced";

export const SOCIALS = [
  { key: "instagram", name: "Instagram", handle: "@rccgrosylpf", href: "https://www.instagram.com/rccgrosylpf?srtk=MWUyOHM5ZmptdnpuZA==", text: "Daily moments, flyers and reels from the youth church." },
  { key: "tiktok", name: "TikTok", handle: "@ylpconnect", href: "https://www.tiktok.com/@ylpconnect?_r=1&_t=ZS-9AegOeHVSAW", text: "Short videos from hangouts, services and outreach." },
  { key: "x", name: "X (Twitter)", handle: "@ylpconnect", href: "https://x.com/ylpconnect?s=21", text: "Announcements and updates as they happen." },
  { key: "facebook", name: "Facebook", handle: "RCCG Rose of Sharon Youth", href: "https://www.facebook.com/share/19B3ECT71C/?mibextid=wwXIfr", text: "Events, albums and community conversations." },
] as const;

export interface YouthPage { key: string; label: string; href: string; icon: string; text: string }
export const YOUTH_PAGES: YouthPage[] = [
  { key: "overview", label: "Overview", href: YOUTH_BASE, icon: "🏠", text: "Start here." },
  { key: "about", label: "About us", href: `${YOUTH_BASE}/about`, icon: "🔥", text: "Our vision, mission and what we are about." },
  { key: "leadership", label: "Leadership", href: `${YOUTH_BASE}/leadership`, icon: "👥", text: "The president, vice presidents and the executive team." },
  { key: "departments", label: "Departments", href: `${YOUTH_BASE}/departments`, icon: "🧩", text: "Media, protocol, choir and every team you can serve in." },
  { key: "sunday", label: "Youth Sunday", href: `${YOUTH_BASE}/youth-sunday`, icon: "⛪", text: "The Sunday the youth anchor the whole service." },
  { key: "events", label: "Events", href: `${YOUTH_BASE}/events`, icon: "📅", text: "Hangouts, conferences and programs." },
  { key: "gallery", label: "Gallery", href: `${YOUTH_BASE}/gallery`, icon: "📸", text: "Photos from the youth church." },
  { key: "join", label: "Join us", href: `${YOUTH_BASE}/join`, icon: "🤝", text: "Tell us you are coming, or want to serve." },
  { key: "connect", label: "Connect", href: `${YOUTH_BASE}/connect`, icon: "📱", text: "Follow the youth church online." },
];

export interface Leader { role: string; name: string; note: string; image?: string }
export const PRESIDENT: Leader = {
  role: "Youth President",
  name: TBA,
  note: "Leads the youth church, chairs the executive council and works hand in hand with the pastor and the youth pastor.",
  image: "/youth/president.jpg",
};
export const VICE_PRESIDENTS: Leader[] = [
  { role: "Vice President (Male)", name: TBA, note: "Supports the president, oversees the male wing of the youth church and stands in when the president is away." },
  { role: "Vice President (Female)", name: TBA, note: "Supports the president, oversees the female wing of the youth church and champions girls' and young women's growth." },
];
export const EXECUTIVES: Leader[] = [
  { role: "General Secretary", name: TBA, note: "Keeps minutes, records and official correspondence." },
  { role: "Assistant Secretary", name: TBA, note: "Works with the secretary on records and communication." },
  { role: "Financial Secretary", name: TBA, note: "Keeps the books for every youth contribution and project." },
  { role: "Treasurer", name: TBA, note: "Safeguards youth funds and approves spending." },
  { role: "Welfare Director", name: TBA, note: "Cares for members in times of need and celebration." },
  { role: "Public Relations Officer", name: TBA, note: "Speaks for the youth church and manages invitations." },
];

export interface Department { slug: string; name: string; icon: string; short: string; about: string; does: string[]; skills: string; meets: string }
export const DEPARTMENTS: Department[] = [
  { slug: "media", name: "Media", icon: "🎥", short: "Cameras, photos, livestream, design and social media.", about: "The media department tells the story of the youth church. From the photo at the door to the livestream on Sunday and the flyer on Instagram, the team captures and shares what God is doing.", does: ["Photography and videography at services and events", "Livestream and sound-to-screen coordination", "Flyers, social media posts and short videos", "Archive of every youth program"], skills: "Photography, video editing, graphic design, content writing, social media", meets: "Rehearsals and shoots before every major youth program" },
  { slug: "protocol", name: "Protocol", icon: "🛡️", short: "Hospitality, order and a warm welcome for everyone.", about: "Protocol makes every guest feel expected. The team plans arrivals, seating and special-guest care so programs run in order and with honour.", does: ["Welcoming guests and special visitors", "Seating, access and crowd order", "Programme flow with the anchors", "Coordinating with ushers and security"], skills: "Courtesy, time-keeping, organisation, calm under pressure", meets: "Briefing before each program, review after" },
  { slug: "choir", name: "Choir & Music", icon: "🎤", short: "Worship leaders, vocalists and instrumentalists.", about: "The youth choir leads worship on Youth Sunday and at youth programs — songs that carry a young generation into God's presence.", does: ["Lead worship at youth services", "Rehearse new songs and arrangements", "Train new singers and instrumentalists", "Minister at outreaches and conferences"], skills: "Singing, instruments, harmony, stage presence", meets: "Weekly rehearsal; extra sessions before Youth Sunday" },
  { slug: "ushering", name: "Ushering", icon: "🤲", short: "Order, seating and care inside the auditorium.", about: "Ushers are the first faces people meet inside. They keep the service orderly and attend to those who need help.", does: ["Seating members and visitors", "Taking offerings and counting attendance", "Helping with first-timer care", "Keeping the auditorium tidy"], skills: "Friendliness, discipline, attention to detail", meets: "Before every service" },
  { slug: "evangelism", name: "Evangelism & Outreach", icon: "🌍", short: "Taking the gospel to campuses, streets and communities.", about: "The outreach team plans programs that take the good news to schools, neighbourhoods and online spaces.", does: ["Plan campus and street outreaches", "Follow up new converts", "Organise community service days", "Run online evangelism"], skills: "Boldness, communication, compassion", meets: "Monthly outreach; planning meeting beforehand" },
  { slug: "prayer", name: "Prayer", icon: "🙏", short: "Intercession for the youth church and its members.", about: "Prayer covers every program. The team leads prayer meetings and carries the requests of the youth church to God.", does: ["Lead youth prayer meetings", "Intercede before major programs", "Collect and pray over prayer requests", "Organise night vigils and fasting"], skills: "Faithfulness, discipline, a heart for intercession", meets: "Weekly prayer meeting" },
  { slug: "drama", name: "Drama & Creative Arts", icon: "🎭", short: "Drama, dance, poetry and spoken word.", about: "Creative arts brings the message to life through drama, dance and spoken word for services, events and outreach.", does: ["Script and perform drama", "Dance and choreography", "Poetry and spoken word", "Creative pieces for special programs"], skills: "Acting, dancing, writing, creativity", meets: "Rehearsals ahead of programs" },
  { slug: "technical", name: "Technical & Sound", icon: "🎛️", short: "Sound, lights, projection and stage.", about: "The technical team makes sure every voice is heard and every slide is seen, so the message is never lost.", does: ["Sound mixing and microphones", "Lighting and stage setup", "Projection of lyrics and slides", "Equipment care and storage"], skills: "Audio, lighting, patience, problem-solving", meets: "Setup before each service" },
  { slug: "welfare", name: "Welfare & Counselling", icon: "💛", short: "Caring for members through every season.", about: "Welfare walks with members through celebrations, challenges and bereavement, and connects them to pastoral counselling.", does: ["Visit and support members in need", "Birthday and celebration follow-up", "Refer to pastoral counselling", "Run support drives"], skills: "Empathy, listening, discretion", meets: "As needs arise; monthly review" },
  { slug: "sports", name: "Sports & Fellowship", icon: "⚽", short: "Football, games and friendships beyond the pews.", about: "Sports and fellowship builds friendships through games, retreats and hangouts.", does: ["Football and indoor games", "Youth hangouts and picnics", "Inter-fellowship competitions", "Retreats and excursions"], skills: "Teamwork, fun, fitness", meets: "Monthly fellowship day" },
];
export function getDepartment(slug: string) { return DEPARTMENTS.find((d) => d.slug === slug); }

export const PHOTOS = [
  { src: "/youth/hangout-1.jpg", alt: "Youth Hangout 2026 — the whole group", w: 1280, h: 746 },
  { src: "/youth/hangout-3.jpg", alt: "Youth Hangout 2026 — group photo", w: 1280, h: 759 },
  { src: "/youth/hangout-4.jpg", alt: "Youth Hangout 2026 — smiles", w: 1080, h: 577 },
  { src: "/youth/hangout-2.jpg", alt: "Youth Hangout 2026 — fellowship", w: 1280, h: 821 },
  { src: "/youth/hangout-5.jpg", alt: "Youth Hangout 2026 — outside the venue", w: 1080, h: 597 },
];

export const EVENTS = [
  { title: "Youth Hangout 2026", when: "2026", where: "Rose of Sharon youth community", text: "A day of fellowship, games and friendships for the whole youth church and their friends.", status: "past" as const, image: "/youth/hangout-1.jpg" },
  { title: "Youth Sunday", when: TBA, where: "Rose of Sharon main auditorium", text: "The youth anchor the whole Sunday service — praise, the word, drama and testimonies.", status: "upcoming" as const },
  { title: "Youth Conference", when: TBA, where: TBA, text: "Teaching, ministration and impartation for a generation. Details will be announced here.", status: "upcoming" as const },
  { title: "Campus & Community Outreach", when: TBA, where: TBA, text: "Taking the gospel to campuses and neighbourhoods with the evangelism team.", status: "upcoming" as const },
];

export const VALUES = [
  { title: "Worship", text: "A generation that loves God's presence above everything.", icon: "🙌" },
  { title: "The Word", text: "Rooted in scripture, growing in knowledge and character.", icon: "📖" },
  { title: "Community", text: "No young person walks alone — we belong to one another.", icon: "🤝" },
  { title: "Service", text: "Every gift has a place; every member serves.", icon: "🛠️" },
  { title: "Mission", text: "Taking Christ to campuses, workplaces and cities.", icon: "🌍" },
  { title: "Excellence", text: "Doing everything as unto the Lord.", icon: "⭐" },
];
