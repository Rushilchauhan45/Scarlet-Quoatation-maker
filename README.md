# Scarlet Quotation Maker

<p align="left">
  <img alt="React" src="https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES202x-F7DF1E?logo=javascript&logoColor=111" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss&logoColor=white" />
  <img alt="Vercel Ready" src="https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green" />
</p>

A production-grade quotation builder for **Scarlet Interior Design (Ahmedabad)**.

This application enables your team to create, edit, preview, store, and export polished interior quotations as branded multi-page PDFs — with a fast, backend-free workflow.

---

## 🛠️ Technology Stack

<p>
  <img src="https://skillicons.dev/icons?i=react,vite,js,tailwind,html,css,vercel,git,github" alt="Tech Stack Icons" />
</p>

| Layer | Tools |
|---|---|
| Frontend | React 18, React Router DOM |
| Build & Tooling | Vite, ESLint |
| Styling | Tailwind CSS + custom CSS |
| PDF Engine | html2canvas + jsPDF |
| UI Icons | lucide-react |
| Data Persistence | localStorage (client-side) |

---

## ✨ Product Capabilities

- **5-step guided quotation wizard** for fast user onboarding and structured data entry
- **Dual authoring mode**:
  - **Edit Pre-built Format** (template-first)
  - **Build from Scratch** (fully custom)
- **Rich content builders** for scope items, material specs, notes, payment schedule, and total estimate
- **Professional branded PDF output** (A4 multi-page layout, section formatting, footer/signature area)
- **Quotation history management** with recent 7 records and quick load/delete actions
- **SPA-friendly deployment** with Vercel rewrite configuration

---

## 🧭 End-to-End Flow

1. Add client and quotation metadata
2. Select project type (BHK/category/package)
3. Load template or build quotation manually
4. Review content in the live preview
5. Save quotation to local history
6. Export downloadable PDF for client sharing

---

## 📁 Project Structure

```text
Scarlet-Quoatation-maker/
├── prompt.txt
├── README.md
├── LICENSE.md
└── scarlet-quotation-app/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── builder/
    │   │   ├── pdf/
    │   │   ├── steps/
    │   │   └── ui/
    │   ├── data/
    │   ├── hooks/
    │   └── utils/
    ├── package.json
    ├── vercel.json
    └── vite.config.js
```

---

## 🚀 Local Development

Move to app directory:

`scarlet-quotation-app/`

Run development server:

`npm run dev`

Create production build:

`npm run build`

Preview production output:

`npm run preview`

---

## ✅ Engineering Checks

Inside `scarlet-quotation-app/`:

- Lint: `npm run lint`
- Build: `npm run build`

These checks should be run before any production deploy.

---

## 🌐 Vercel Deployment

This repository is configured as an SPA using `scarlet-quotation-app/vercel.json` rewrite rules.

### Recommended Vercel configuration

- **Framework Preset:** Vite
- **Root Directory:** `scarlet-quotation-app`
- **Install Command:** `npm install`
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

---

## 💾 Client-Side Storage Keys

- `scarlet_quotations` → quotation history
- `scarlet_quote_counter` → sequential quotation counter

---

## 🧾 PDF Export Design Notes

- A4 portrait multi-page output
- Scarlet-themed branding and color system
- Structured content blocks:
  - Scope of work
  - Material specification
  - Notes
  - Payment schedule
  - Total estimated cost

---

## 🤝 Contribution Guidelines

1. Work in a dedicated feature branch
2. Keep commits focused and descriptive
3. Run lint and production build before PR/merge
4. Preserve existing branding and PDF layout consistency

---

## 📜 License

Licensed under the **MIT License**. See [`LICENSE.md`](./LICENSE.md) for full text.
