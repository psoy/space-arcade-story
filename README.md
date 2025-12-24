# Cosmic Arcade Logs

Short-session arcade narrative game prototype (5-10 minutes) with space dinosaurs, climate crisis, and AI robots.

## Local setup

1) Install dependencies (requires network access):

```
npm install
```

2) Run the dev server:

```
npm run dev
```

## Anthropic integration note

Do not call Anthropic directly from the browser. Put API calls behind a serverless function or your own backend, then fetch from the game client.
Use `src/story/anthropic.ts` to build the prompt and validate the JSON seed on the server.
