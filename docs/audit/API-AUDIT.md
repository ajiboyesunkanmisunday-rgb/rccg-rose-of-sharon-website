# Public website API audit (2026-10-31)

Source of truth: the backend's Swagger (`/v3/api-docs`) and live probes with empty bodies (no records created).

## Server settings (each Vercel project: main, training, media)
| Variable | Purpose |
|---|---|
| `ROS_API_EMAIL` + `ROS_API_PASSWORD` | Preferred. A read-only service account. The site signs in like the management app (POST /users/login, token in the `Authorization` response header), caches the token and signs in again on 401. |
| `ROS_API_TOKEN` / `ROS_MEDIA_TOKEN` | Alternative: a ready-made token. It expires and must be replaced. |
| `ROS_API_ORIGIN` | Optional, defaults to the backend address. |

Without either, every login-gated feature below shows its normal fallback (nothing breaks, it just is not live).

## Working with no login (public endpoints)
First-timer, member, e-member, new-convert registration; testimonies (submit + featured list); prayer, counselling, suggestion requests; product listing (filter-approved) and product submission; announcement submission; media upload; groups list; events calendar and upcoming; voting PUT.

## Need the server login (now handled by server routes)
Member/e-member check (`/users/{member|e-member}/search`), seller check, Face of the Month list and vote, media library, announcements list (`/announcements/read`, also needs a JSON Content-Type), training schedules (`/training-events?category&set`).

## Fixed in this round
- Public Announcements page called a login-only endpoint from the browser (always failed): now `/api/announcements` on the server.
- Training "Next class" now reads the schedule (`/api/next-class`), falling back to the existing wording.
- Server login + token renewal (`lib/ros-server.ts`), media library uses it.
- Rate limit on member check, seller check, vote (429 after 12 / 8 tries in 10 minutes).
- API helper keeps HTTP status, 20 s timeout, friendly messages for network/5xx.
- Safari-safe API date parsing.
- Earlier "404s" were wrong probe paths, not site bugs: real paths are `/users/member`, `/users/e-member`, `/school-of-ministries`; the site already uses them.

## QA items
- SOM/SOD passport photo: SOD already had it; SOM now has a required passport box (uploaded; SOM has no picture field in the API, so the address is added to "other information").
- Exams: one attempt per admission number per device, recorded when the exam starts; Retake buttons removed; correct answers no longer shown after submit. No exam endpoint exists in the API, so this cannot be enforced across devices until the backend has one.
- Events/Calendar pages exist (media site `/events`, live from `/events/calendar`).

## Backend problems (not fixable on the website)
1. `POST /requests/baby-christening` (and likely baby-dedication) returns 500 for real submissions; the site falls back to a suggestion.
2. `/products` public listing exposes seller email, phone, address.
3. API dates use "yyyy-MM-dd HH:mm:ss" (space), breaking Safari unless parsed.
4. No endpoint for exams/results, so one-attempt cannot be server-enforced.
5. SOM create request has no picture field.
6. `training-events` needs `set`; the site assumes the set is the year (current and next) - confirm with the training office.

## Round 2 (2026-11-02): management-app features now on the public site
- Face of the Month: only approved events (those with voting times, as in the management app) are shown; open event first, then the next to open, then the latest closed; Hall of Fame of past winners (top brother and sister per finished event).
- Announcement submission deadline (`/settings` -> `announcementDeadline`): the submit section shows "Submit before ..." or "Submissions closed", through `/api/announcement-settings`.
- Official training results (`/score-sheets/broadsheet?category&set`): "Check my result" on each program's Results page by set + admission number, through `/api/result` (rate limited, returns only that student).
- Welfare requests: member verified first, filed under `/requests/welfare`; management app has a matching Welfare section.

## Backend watch (2026-11-03)
Compared the live Swagger with the endpoint list from 2026-11-02: one new endpoint, `GET /users/verify?text=` ("Verify user", returns id, names, email, phone, sex). It needs the login and, in testing with real member emails, phones, ids and names, answered "User Not Found" every time (also with `textRequest=`), so it is not usable yet; the site keeps using member / e-member search. Recheck later. A copy of the Swagger is saved as `swagger-2026-11-03.json` to diff against next time.

## Backend bug: calendar for May (2026-11-07)
`GET /events/calendar` returns damaged JSON for any range that includes 31 May 2026: the event "THANKSGIVING SERVICE" lists a new convert (mary ige) whose `service` field contains the same event again, hundreds of levels deep (circular reference), and the output ends in `"createdOn":]`. The management app repairs the text before reading it; the website now does the same on the server (`/api/calendar`) and also drops the first timers / second timers / new converts the endpoint attaches to events (their emails and phone numbers are publicly readable on this endpoint, which is a privacy problem to report). Backend fix: return an event DTO without the nested people.
