# Nuansa Psychology Consulting

This is the official website for **Nuansa Psychology Consulting**, built with modern web technologies to provide a fast, responsive, and accessible experience for users seeking psychological counseling services.

## Features

- **Modern Tech Stack**: Built with [Next.js](https://nextjs.org/) (App Router), React, and TypeScript.
- **Styling**: Tailwind CSS for utility-first styling with dark mode support.
- **Animations**: Framer Motion (`motion/react`) for smooth, accessible UI transitions and scroll effects.
- **Interactive UI**: Includes dynamic modals, cost calculators, and interactive service sections.
- **Form Validation**: Uses Zod for robust client-side form validation before redirecting to WhatsApp.
- **SEO Optimized**: Configured with dynamic sitemaps, metadata, and canonical URLs.
- **Responsive Design**: Fully responsive layout tailored for mobile, tablet, and desktop screens.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/budhijokos/nuansa-nextjs.git
   cd new-nuansa-nextjs
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/`: Next.js App Router directory containing pages, layouts, and global styles.
- `components/`: Reusable React components.
  - `sections/`: Major page sections (Hero, About Us, Services, Contact, etc.).
  - `modals/`: Interactive modal components for consultations and testimonials.
- `lib/`: Utility functions and static data.
- `public/`: Static assets like images, favicon, and `robots.txt`.
- `src/assets/`: Source asset files that are processed or copied during the build.

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to catch formatting and code quality issues.
