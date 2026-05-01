# Appilico Web — AI-Powered Analytics for Australian Mining & Resources

Production-ready SaaS marketing and platform website for [appilico.com](https://www.appilico.com).

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui-style components
- **Animations:** Framer Motion
- **Forms:** React Hook Form + Zod validation
- **API Client:** Axios → `https://api.appilico.com`
- **Theme:** next-themes (dark/light mode)
- **Deployment:** Vercel (Sydney region)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/Sadramst/SaaS.git
cd SaaS/appilico-web
npm install
```

### Environment Variables

Copy the example file and configure:

```bash
cp .env.example .env.local
```

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `https://api.appilico.com` |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (for SEO/OG) | `https://www.appilico.com` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics measurement ID | — |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build

```bash
npm run build
npm start
```

## Project Structure

```
appilico-web/
├── app/
│   ├── (marketing)/          # Public pages (home, features, pricing, about, blog, contact)
│   ├── (auth)/               # Auth pages (login, register, forgot-password)
│   ├── (dashboard)/          # Protected dashboard pages
│   ├── api/                  # Next.js API routes (thin proxies)
│   ├── layout.tsx            # Root layout
│   └── globals.css
├── components/
│   ├── ui/                   # Base UI components (Button, Card, Input, etc.)
│   ├── marketing/            # Landing page sections
│   ├── dashboard/            # Dashboard components
│   └── shared/               # Navbar, Footer, ThemeToggle, etc.
├── lib/                      # API client, auth helpers, utilities
├── hooks/                    # React hooks (useAuth, useWaitlist)
├── types/                    # TypeScript interfaces
└── public/                   # Static assets
```

## Architecture Decisions

- **App Router with Route Groups:** Marketing `(marketing)`, auth `(auth)`, and dashboard `(dashboard)` use separate layouts for clean separation of concerns.
- **Client/Server Split:** Pages use server components for metadata/SEO and client components for interactivity.
- **API Proxy Pattern:** The waitlist API route acts as a thin proxy to the backend, keeping the API URL server-side when needed.
- **Placeholder Data:** Blog posts and visuals include hardcoded fallbacks so the site works without a backend connection.
- **Auth via localStorage:** JWT tokens stored in localStorage with an Axios interceptor for automatic Bearer token attachment.

## Deployment to Vercel

1. Push to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Set the root directory to `appilico-web`
4. Add environment variables in Vercel project settings
5. Deploy — Vercel will auto-detect Next.js

The `vercel.json` configures:
- Sydney (`syd1`) region for low-latency Australian access
- Security headers (X-Frame-Options, X-Content-Type-Options, etc.)

## API Backend

The frontend communicates with the ASP.NET Core API at `https://api.appilico.com`. See the backend repository for API documentation.

## License

Proprietary — Appilico Pty Ltd. All rights reserved.
