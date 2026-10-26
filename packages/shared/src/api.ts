export const API_BASE = "/ros-api";

export async function post(path: string, body: object) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(err.message || "Submission failed");
  }
  return res.json();
}

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "An error occurred" }));
    throw new Error(err.message || "Request failed");
  }
  return res.json();
}

/* ─── Groups / departments ──────────────────────────────────────────────────── */

export interface GroupResponse {
  id: string;
  name: string;
}

/** All church groups (the admin web calls them Groups; the public forms call them Departments). */
export async function getGroups(): Promise<GroupResponse[]> {
  return apiFetch<GroupResponse[]>("/groups/all");
}

/* ─── Profile picture upload ────────────────────────────────────────────────── */

/** Shrinks a photo in the browser (longest side 1200px, JPEG) so the upload is small and quick. */
export async function prepareImage(file: File, maxSide = 1200): Promise<File> {
  if (typeof document === "undefined" || !file.type.startsWith("image/")) return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((res) => canvas.toBlob(res, "image/jpeg", 0.85));
    if (!blob || blob.size >= file.size) return file;
    return new File([blob], file.name.replace(/\.[^.]+$/, "") + ".jpg", { type: "image/jpeg" });
  } catch {
    return file;
  }
}

/** Uploads a profile picture the same way the admin web does and returns the picture's address. */
export async function uploadProfilePicture(file: File): Promise<string> {
  const photo = await prepareImage(file);
  const params = new URLSearchParams({
    title: `profile-${Date.now()}`,
    type: "IMAGES",
    category: "IMAGES",
    size: String(photo.size),
    isFromMedia: "true",
  });
  const form = new FormData();
  form.append("multipartFile", photo);
  const res = await fetch(`${API_BASE}/media?${params.toString()}`, { method: "POST", body: form });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: "Photo upload failed" }));
    throw new Error(err.message || "Photo upload failed");
  }
  const data = await res.json();
  const url = data.displayUrl ?? data.url;
  if (!url) throw new Error("Photo uploaded but no address was returned");
  return url as string;
}

/* ─── RILA ─────────────────────────────────────────────────────────────────── */

export interface CreateQualificationRequest {
  nameOfInstitution?: string;
  yearFrom?: string;
  yearTo?: string;
  courseOfStudy?: string;
  qualification?: string;
  isProfessional?: boolean;
}

export interface CreatePastPlaceOfWorshipRequest {
  name?: string;
  address?: string;
  phoneNumber?: string;
  pastorName?: string;
  pastorPhoneNumber?: string;
  positionHeld?: string;
}

export interface CreateStudentReferenceRequest {
  name?: string;
  address?: string;
  phoneNumber?: string;
}

export interface CreateRilaRequest {
  title?: string;
  set: string;
  programme?: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  campus?: string;
  maidenName?: string;
  countryCode?: string;
  phoneNumber: string;
  email?: string;
  profilePictureUrl?: string;
  sex?: string;
  street?: string;
  otherPhoneNumber?: string;
  dateOfBirth?: string;
  noOfChildren?: number;
  spouseName?: string;
  maritalStatus?: string;
  nationality?: string;
  placeOfBirth?: string;
  lga?: string;
  stateOfOrigin?: string;
  weddingDate?: string;
  nextOfKinName?: string;
  nextOfKinRelationship?: string;
  nextOfKinPhoneNumber?: string;
  nextOfKinFullAddress?: string;
  officeFullAddress?: string;
  position?: string;
  occupation?: string;
  employer?: string;
  officePhoneNumber?: string;
  jobDescription?: string;
  previousOccupation?: string;
  previousEmployer?: string;
  previousPosition?: string;
  previousOfficeFullAddress?: string;
  previousOfficePhoneNumber?: string;
  previousJobDescription?: string;
  salvationDate?: string;
  salvationLocation?: string;
  waterBaptismDate?: string;
  waterBaptismLocation?: string;
  holySpiritBaptismDate?: string;
  holySpiritBaptismLocation?: string;
  believerClassDate?: string;
  believerClassLocation?: string;
  workersInTrainingDate?: string;
  workersInTrainingLocation?: string;
  otherBibleSchoolDate?: string;
  otherBibleSchoolLocation?: string;
  currentChurchName?: string;
  currentChurchAddress?: string;
  currentChurchPhoneNumber?: string;
  currentPastorName?: string;
  currentPastorPhoneNumber?: string;
  yourMinistry?: string;
  giftsManifesting?: string[];
  heardAboutUs?: string;
  reasonForApplying?: string;
  selfSponsored?: boolean;
  createPastPlaceOfWorshipRequests?: CreatePastPlaceOfWorshipRequest[];
  createStudentReferenceRequests?: CreateStudentReferenceRequest[];
  qualificationRequests?: CreateQualificationRequest[];
}

export interface RilaFullResponse {
  id: string;
  [key: string]: unknown;
}

export async function createRila(body: CreateRilaRequest): Promise<RilaFullResponse> {
  return apiFetch<RilaFullResponse>("/rilas", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

export async function updateRilaSponsor(
  id: string,
  body: { name: string; address: string; phoneNumber: string },
): Promise<void> {
  await apiFetch(`/rilas/${id}/sponsor`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}

export async function updateRilaPastorRecommendation(
  id: string,
  body: { name: string; phoneNumber: string },
): Promise<void> {
  await apiFetch(`/rilas/${id}/pastor-recommendation`, {
    method: "PUT",
    body: JSON.stringify(body),
  });
}
