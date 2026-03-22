# ADAS CENTRE

Professional website for **ADAS CENTRE** — a mobile ADAS (Advanced Driver Assistance Systems) calibration service based in Moscow and the Moscow region.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion, Canvas 2D
- **Email:** Nodemailer (Gmail SMTP)
- **Icons:** Lucide React

## Project Structure

```
app/
  page.tsx              # Homepage (hero, UTP, partnership, equipment, FAQ, contact)
  about/page.tsx        # About ADAS systems page
  services/page.tsx     # Service listing
  services/[id]/page.tsx # Individual service detail pages
  api/send-email/       # Contact form email endpoint
  loading.tsx           # Loading state (radar animation)
  not-found.tsx         # 404 page
  error.tsx             # Error boundary

components/
  sections/             # Page sections (Navbar, Footer, Hero, UTP, etc.)
  background/           # Animated Canvas 2D tech background
  ui/                   # Reusable UI components (PageShell, SectionHeading, Button)

hooks/
  useReducedMotion.ts   # Accessibility: detects reduced motion preference

lib/
  services.ts           # Service data (cameras, radars, LiDAR, diagnostics)
  email.ts              # Email template and sending logic
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file:

```env
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=your-app-password
```

## Scripts

| Command         | Description              |
|-----------------|--------------------------|
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |
