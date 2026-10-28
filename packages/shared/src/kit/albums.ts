/*
 * Event photo albums from the media team. The pictures live with the site (public/gallery/<slug>/NN.jpg, with a
 * smaller NN-thumb.jpg for grids), so visitors never leave the website to see them.
 */
export interface Album { slug: string; title: string; date: string; text: string; count: number }

export const ALBUMS: Album[] = [
  { slug: "light-up-ikeja", title: "Light Up Ikeja Crusade 2025", date: "Nov 22nd, 2025", text: "A night of worship, the word and testimonies as we lit up Ikeja.", count: 16 },
  { slug: "light-up-ikeja-2024", title: "Light Up Ikeja Crusade 2024", date: "2024", text: "Pictures from the 2024 Light Up Ikeja crusade: the crowd, the worship and the volunteers.", count: 12 },
  { slug: "back-to-school", title: "Back to School", date: "Sept 6th, 2026", text: "Sending our children back to school with prayers, backpacks and joy.", count: 12 },
  { slug: "fathers-day", title: "Father's Day", date: "June 15th, 2025", text: "Honouring the fathers of Rose of Sharon in worship and celebration.", count: 12 },
];

export function albumPhoto(slug: string, n: number, thumb = false) {
  return `/gallery/${slug}/${String(n).padStart(2, "0")}${thumb ? "-thumb" : ""}.jpg`;
}

export function albumPhotos(album: Album) {
  return Array.from({ length: album.count }, (_, i) => ({ src: albumPhoto(album.slug, i + 1), thumb: albumPhoto(album.slug, i + 1, true), alt: `${album.title} — photo ${i + 1}` }));
}
