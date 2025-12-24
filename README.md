# Cosmic Arcade Logs

[![Repo](https://img.shields.io/badge/repo-psoy%2Fspace--arcade--story-000?logo=github)](https://github.com/psoy/space-arcade-story)
[![Stars](https://img.shields.io/github/stars/psoy/space-arcade-story?style=flat)](https://github.com/psoy/space-arcade-story/stargazers)
[![Last commit](https://img.shields.io/github/last-commit/psoy/space-arcade-story?style=flat)](https://github.com/psoy/space-arcade-story/commits/main)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Phaser](https://img.shields.io/badge/Phaser-3-ef7d00)](https://phaser.io/)

Short-session arcade narrative game prototype (5-10 minutes) with space dinosaurs, climate crisis, and AI robots.

## Features

- Quick-play, story-forward arcade loop
- Seeded story generation with a local mock and an Anthropic prompt builder
- Phaser scenes for boot, menu, and story flow

## Local setup

1) Install dependencies (requires network access):

```
npm install
```

2) Run the dev server:

```
npm run dev
```

## Build

```
npm run build
```

```
npm run preview
```

## Anthropic integration note

Do not call Anthropic directly from the browser. Put API calls behind a serverless function or your own backend, then fetch from the game client.
Use `src/story/anthropic.ts` to build the prompt and validate the JSON seed on the server.
