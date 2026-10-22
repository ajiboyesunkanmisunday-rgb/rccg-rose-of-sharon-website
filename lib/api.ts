export const API_BASE = "http://137.184.72.16:6001/api/v1";

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
