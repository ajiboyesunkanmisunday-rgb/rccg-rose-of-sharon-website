/*
 * The church's own online links. Fill in the empty ones when the publication unit shares them; a link that is
 * still empty shows on Quick Links but goes nowhere until it is filled in.
 */
export const CHURCH_LINKS = {
  /** invite link of the church WhatsApp group, e.g. https://chat.whatsapp.com/... */
  whatsapp: "",
  /** the church's Instagram page, e.g. https://www.instagram.com/... */
  instagram: "https://www.instagram.com/rccgros",
  /** the attendance form / page, once the church has one */
  attendance: "",
  /** the church's Mixlr channel (live audio), e.g. https://mixlr.com/<channel> */
  mixlr: "",
  youtube: "https://www.youtube.com/@rccgrostv",
} as const;

/**
 * WhatsApp groups shown on the Join Us page, each with a QR code. Paste the group's invite link
 * (https://chat.whatsapp.com/...) and the code is made from it; an empty link shows "coming soon".
 * To use a ready-made QR picture instead, put it in public/join and set `qr` (e.g. "/join/men.png").
 */
export const WHATSAPP_GROUPS: { key: string; name: string; text: string; link: string; qr?: string }[] = [
  { key: "men", name: "Men", text: "Hearts of David (Men)", link: "" },
  { key: "women", name: "Women", text: "Oaks of Righteousness (Women)", link: "https://chat.whatsapp.com/LwBNCX4r16j11C9C3y7I8p" },
  { key: "youth", name: "Youth", text: "Young Leaders & Professionals (Youth)", link: "https://chat.whatsapp.com/LaaACQjqsljGO0acRHcQAW" },
];
