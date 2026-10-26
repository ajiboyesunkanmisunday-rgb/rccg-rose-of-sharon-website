# RCCG Rose of Sharon — websites

Four sites that are built and deployed **separately**, live in **one repository**, and link to one another:

| Site | Folder | Local address | Production address |
|---|---|---|---|
| Main church site (also the marketplace) | `apps/main` | http://localhost:3002 | www.rccgros.org |
| Youth fellowship | `apps/youth` | http://localhost:3003 | youth.rccgros.org |
| Training (Water Baptism, WIT, School of Disciples, School of Ministry, RILA, CSR) | `apps/training` | http://localhost:3004 | training.rccgros.org |
| Sermons & media (events, announcements, testimonies, gallery) | `apps/media` | http://localhost:3005 | media.rccgros.org (name to be confirmed) |

`packages/shared` holds what the sites have in common: the header and footer, the UI kit, the API client, the
cross-site link helper and the single pool of images, fonts and stylesheets.

## Run it locally

```bash
npm install            # once, from the repository root
npm run dev            # starts all four sites (3002, 3003, 3004, 3005)
npm run dev:youth      # or just one of them: dev:main, dev:youth, dev:training, dev:media
npm run build          # builds all four; build:main, build:youth ... builds one
```

## How the sites link to each other

Pages are written with one **canonical path** whichever site serves them, for example `/youth/about`,
`/trainings/water-baptism/register`, `/give`. The `Link` component from `@ros/shared/link` (and `A` for plain
anchors) turns that into the right address:

- a page on the **same site** becomes a normal local link (`/about` on the youth site),
- a page on **another site** becomes that site's full address (`https://youth.rccgros.org/about` from the main site).

The rules live in `packages/shared/src/sites.ts` (`RULES`). To move a page to another site, change the rule and move the file.

The addresses come from environment variables, with sensible defaults (localhost ports in development, the
`rccgros.org` addresses in production):

```
NEXT_PUBLIC_URL_MAIN      NEXT_PUBLIC_URL_YOUTH      NEXT_PUBLIC_URL_TRAINING      NEXT_PUBLIC_URL_MEDIA
ROS_API_ORIGIN            # where /ros-api/* is forwarded (default http://137.184.72.16:6001)
```

Set the four `NEXT_PUBLIC_URL_*` values on **every** app's host, because each build bakes them in. On the temporary
Netlify addresses use those; when everything moves to the server, change them to the real `rccgros.org` addresses.

## Images, fonts and stylesheets

Everything lives once in `packages/shared/public`. `scripts/sync-assets.mjs` copies into each app's `public/` folder
only the files that app uses (it runs automatically before `dev` and `build`; `apps/*/public` is generated and not
committed). If an image is reached through a dynamic name, list it in `apps/<app>/assets.extra.json`.

## Deploying one app (Netlify, temporary)

One Netlify project per site, all from this repository, branch `cci-redesign`:

| Setting | Value |
|---|---|
| Base directory | `apps/<app>` |
| Build command | `npm run build` |
| Publish directory | `.next` |
| Environment | the four `NEXT_PUBLIC_URL_*` values |

Each app's `netlify.toml` skips the build when neither that app nor `packages/shared` changed.

## Deploying on your own server (Digital Ocean)

Every app is an independent Next.js server, so each runs on its own port and the web server routes each
sub-domain to its port:

```bash
npm ci                                   # at the repository root
npm run build:youth                      # (or build:main, build:training, build:media)
NEXT_PUBLIC_URL_MAIN=... npm run start -w @ros/youth    # next start -p 3003
```

Put a process manager (pm2 or systemd) in front of each app and a reverse proxy mapping
`www.rccgros.org -> :3002`, `youth.rccgros.org -> :3003`, `training.rccgros.org -> :3004`,
`media.rccgros.org -> :3005`. Because the repository is shared but the builds are separate, you can deploy,
restart or roll back one site without touching the others.
