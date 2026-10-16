# EstateIQ AI — Intelligent Real Estate Intelligence Platform
### Developed for VM Intellect Pvt. Ltd., Pune, Maharashtra, India

> **Enterprise Real Estate Suite Integrating Property Intelligence, Land Development Feasibility, Ready Reckoner Benchmark Rates, DPDP Act 2023 Compliance, and Vastu Shastra Spatial Analysis.**

---

## 1. Executive Summary & Brand Identity

**EstateIQ AI** (configurable as *VM Estate Intelligence*) is an enterprise-grade AI-powered real estate intelligence web application developed for **VM Intellect Pvt. Ltd., Pune**. 

The platform bridges real estate data collection, government rate valuation benchmarks, statutory privacy governance, and traditional spatial harmony into a unified decision-support engine.

### Corporate Brand Identity
- **Company Reference:** [VM Intellect Official Website](https://www.vmintellect.com/index.html)
- **Original Logo Asset:** Preserved in `/public/VMI-logo.png`
- **Project-Specific Treatment:** Metallic gold emblem with restrained obsidian/black badge frame preserved in `/public/vmi-gold-logo.svg`
- **UI Theme:** Enterprise White and Blue palette with Deep Navy (`#0A2540`, `#0F172A`), Royal Blue (`#2563EB`), Light Blue highlights, and subtle Metallic Gold accents.

---

## 2. Four Primary User Personas & Workflows

1. **Builder / Developer Panel (Segment A):**
   - Configurable land acquisition and FSI/FAR feasibility calculator.
   - Low, Base, and High absorption scenario matrix.
   - Civil construction, liaisoning, infrastructure, and financing cost breakdown.
   - Break-even selling price per saleable sq.ft and project ROI modeling.
   - Exportable project feasibility audit report.

2. **Land Owner Panel (Segment B):**
   - True land valuation comparing owner asking price against official Ready Reckoner rates.
   - Opportunity matrix: Outright Sale vs. Joint Development Agreement (JDA 60:40) vs. Ground Lease vs. Self-Development.
   - Land due diligence readiness tracker (7/12 Satbara, mutation entries, demarcation survey).

3. **Realtor / Real Estate Agent Panel (Segment C):**
   - Active inventory management with automated duplicate listing alerts.
   - Weighted multi-parameter smart client matching engine (budget, locality, BHK, possession, and Vastu preferences).
   - Privacy-preserving CRM inquiry pipeline with DPDP consent records.

4. **Customer / Property Buyer Panel (Segment D):**
   - Property discovery across Pune clusters (Shivaji Nagar, Kharadi, Baner, Wakad, Hinjewadi, Kalyani Nagar).
   - Side-by-side multi-property comparison matrix.
   - True acquisition cost & mortgage EMI calculator factoring in down payment, loan tenure, 5% Maharashtra Stamp Duty, 1% Metro Cess, ₹30,000 capped registration fee, and interior fit-out buffers.

---

## 3. Core Regulatory & Traditional Pillars

### Pillar 1: Ready Reckoner Rates / Annual Statement of Rates (ASR)
- **Official Source:** Inspector General of Registration & Controller of Stamps (IGR), Maharashtra ([igrmaharashtra.gov.in](https://igrmaharashtra.gov.in/)).
- **Verified Locality Rates (FY 2025-26):** Baner, Wakad, Hinjewadi Phase 1-3, Kothrud, Kalyani Nagar, Kharadi, Viman Nagar, Hadapsar, Shivaji Nagar, Bavdhan.
- **Statutory Computation:** Indicative Benchmark Value = Official Rate × Area.
- **Safe Harbor Evaluation:** Automated variance check under Section 43CA and Section 56(2)(x) of the Indian Income Tax Act (10% tolerance band).
- **Historical Analysis:** Year-on-year rate appreciation trends from FY 2022-23 to FY 2025-26.

### Pillar 2: DPDP Act 2023 & DPDP Rules 2025 Compliance Centre
- **Official Source:** Ministry of Electronics and Information Technology (MeitY), Government of India.
- **Statutory Privacy Notice:** Itemized purpose-specific notice under Section 5.
- **Granular Consent Management:** Active/revoked toggles honoring Section 6(4) withdrawal rights.
- **Data Inventory & RoPA:** Record of Processing Activities mapping data categories, storage location (Mumbai, India), retention periods, and lawful bases.
- **Data Principal Rights:** Interactive ledger to submit and process Access, Correction, Erasure, and Grievance requests with statutory 30-day TAT tracking.
- **Designated Data Protection Officer (DPO):** Adv. Radhika S. Kulkarni (`dpo@vmintellect.com`), Baner, Pune.

### Pillar 3: Vastu Dosh Detection & Property Layout Engine (Key Differentiator)
- **Foundational Guide:** *Astrology, Numerology, Vastu & Home Purchase Guide*.
- **Directional Framework:** 8 Cardinal/Ordinal zones (NE Ishanya, SE Agneya, SW Nairutya, NW Vayavya) plus central Brahmasthan.
- **18 Property Categories:** Residential plots, flats, independent houses, bungalows, entrances, bedrooms, kitchens, toilets, stairs, commercial offices, shops, factories, etc.
- **Interactive 3×3 Layout Grid:** Visual compass builder allowing users to position main entrance and rooms on the coordinate grid and receive real-time Vastu Dosh findings.
- **Non-Destructive Practical Remedies:** Color balance, sea salt diffusers, copper/brass threshold spirals, and furniture adjustments without structural demolition.
- **Scientific Responsibility Disclaimer:** Prominently explains that Vastu is a traditional cultural belief system and does not predict future life outcomes or substitute for legal/structural diligence.

### Additional Features:
- **Numerology & Muhurta Purchase Guide:** Single-digit house number reduction (e.g. Flat 245 → 2), personal birth number compatibility, and auspicious Muhurta calendar for booking, registration, and Griha Pravesh.
- **Title Verification Workspace:** 10-point due diligence checklist, 30-year chain of title, 7/12 Satbara extract review, draft Registration Bill 2025 paperless reforms, and e-Courts litigation cross-checking.
- **Data Ingestion Pipeline:** Multi-stage CSV/Excel import wizard with column mapping, price outlier detection, duplicate record flagging, and data hygiene scoring.
- **EstateIQ AI Copilot:** Interactive decision assistant providing cited answers referencing official IGR Maharashtra schedules and DPDP Gazette rules.

---

## 4. Technology Stack

- **Framework:** Next.js 16.4 (App Router)
- **Core Library:** React 19, TypeScript
- **Styling:** Tailwind CSS v4, custom enterprise scrollbars & print stylesheets
- **Icons:** Lucide React
- **Brand Assets:** Vector SVG metallic gold badge & official PNG corporate logo

---

## 5. Local Setup & Quick Start

### Recommended Workspace
Set the active workspace in your editor/terminal to:
\`\`\`bash
cd "C:\Users\Tanmay Kalokhe\.gemini\antigravity\scratch\estateiq-ai"
\`\`\`

### Installation & Run
1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Start development server:
   \`\`\`bash
   npm run dev
   \`\`\`

3. Open in browser:
   [http://localhost:3000](http://localhost:3000)

4. Production Build:
   \`\`\`bash
   npm run build
   \`\`\`

---

## 6. Pre-Configured Demo Accounts (1-Click Login)

On the authentication screen, select any 1-click persona button to test:

| Persona | Name | Email | Default Password |
| :--- | :--- | :--- | :--- |
| **Builder / Developer** | Rajesh Singhania | `builder@vmintellect.com` | `EstateIQ@2026` |
| **Land Owner** | Dilip Rao Bhosale | `landowner@vmintellect.com` | `EstateIQ@2026` |
| **Realtor / Agent** | Meera Deshpande | `realtor@vmintellect.com` | `EstateIQ@2026` |
| **Customer / Buyer** | Vikramaditya Deshmukh | `buyer@vmintellect.com` | `EstateIQ@2026` |
| **Administrator** | Dr. Vivek Mane (CTO) | `admin@vmintellect.com` | `EstateIQ@2026` |

---

## 7. Compliance & Scientific Transparency Note

- **Legal Verification:** The platform assists in tracking and organizing due diligence documents; it does not replace independent legal opinion or title search by a qualified advocate.
- **Government Rates:** Ready Reckoner benchmarks reflect official published ASR schedules; actual stamp duty may vary depending on municipal concessions or special valuation rules.
- **Vastu & Traditional Systems:** Provided for cultural and architectural harmony. Dosh findings represent traditional interpretive checklists only and carry no scientific prediction of financial or health outcomes.

*© 2026 VM Intellect Pvt. Ltd., Pune, Maharashtra, India. All rights reserved.*
