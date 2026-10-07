# Keval Bhatt — Portfolio

Personal site for [Keval Bhatt](https://github.com/KevalBH), Lead Frontend Developer. Content is taken from the resume: roles, selected work, stack, education, and contact.

**Repo:** [github.com/KevalBH/my-portfolio](https://github.com/KevalBH/my-portfolio)

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- Prettier
- ESLint
- commitlint

## Layout

Application code lives in `src/`. The project root keeps configuration, `public/`, and this readme.

- `src/app/` — thin routes (`metadata` + page render)
- `src/screens/` — page views
- `src/components/` — reusable UI (`src/components/ui` for Shadcn)
- `src/lib/` — resume data and theme
- `src/utils/` — helpers
- `src/queries/` — data accessors

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run format
npm run build
```

Commits use conventional messages, for example `feat(home): keep experience copy flush on tablet`.

## WebMCP

The open page registers frontend commands on `navigator.modelContext` and `document.modelContext`. A WebMCP client runs them in the browser:

- `set_theme` — set the site to `light` or `dark`
- `toggle_theme` — switch the current theme
- `go_to_section` — scroll to `overview`, `experience`, `work`, `stack`, `education`, or `contact`

## Contact

- Email: keval.bhatt.777@gmail.com
- LinkedIn: [keval-dev](https://www.linkedin.com/in/keval-dev)
- GitHub: [KevalBH](https://github.com/KevalBH)
