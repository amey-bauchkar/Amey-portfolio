# Software & Hardware Project Sections Implementation Plan

> **For Claude / Agent:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform the Projects section from displaying only hardware projects into two dedicated, beautifully crafted sections—**Software & Decision Systems** and **Robotics & Hardware Engineering**—featuring 4 new flagship software applications (Prakalp Drishti, DepthWizard, VARSHA, and MandiMitra) with their GitHub repositories, live deployments, and actual UI screenshots.

**Architecture:** Extend `src/data/projectsData.js` to structure projects with explicit categories (`software` vs `hardware`) and full metadata (GitHub URLs, live demo URLs, tags, and architecture snippets). Enhance `src/components/Projects.jsx` to render two distinct cinematic sections with dedicated section headers, an interactive category quick-switcher (`All`, `Software (4)`, `Hardware (5)`), direct action links on cards (Live Demo, GitHub, Explore), and enhanced modal dialogs (`ProjectModal.jsx` and `CodeViewerModal.jsx`).

**Tech Stack:** React 19, Vite, Tailwind CSS, GSAP 3 + ScrollTrigger, Lenis Smooth Scroll, FontAwesome Icons.

---

### Task 1: Asset Ingestion & Image Preloader Configuration

**Files:**
- Create/Copy:
  - `public/prakalp-drishti.png` (from user upload `media_1792350796930.png`)
  - `public/depthwizard.png` (from user upload `media_1792350970461.png`)
  - `public/varsha.png` (from user upload `media_1792351202873.png`)
  - `public/mandimitra.png` (from user upload `media_1792351445832.png`)
- Modify: `src/components/PreloadContainer.jsx:123-138`

**Step 1: Copy uploaded screenshot files to public directory**
Copy the 4 uploaded project screenshots into `public/` under clean, descriptive asset names.

**Step 2: Update `PreloadContainer.jsx`**
Add the 4 new project image paths to `imageUrls` in `PreloadContainer.jsx` to ensure instantaneous rendering without flickering during scroll.

```javascript
const imageUrls = [
  '/prakalp-drishti.png',
  '/depthwizard.png',
  '/varsha.png',
  '/mandimitra.png',
  '/aqualens-cover.png',
  '/line-follower.jpg',
  '/self-balancing.avif',
  '/smart-dustbin.jpg',
  '/crane-safety.jpg',
  '/amey-photo.png',
  '/Amey_Bauchkar_Resume.png',
];
```

**Step 3: Verify assets exist**
Run a PowerShell command to verify all 4 files are present in `public/` and have positive file sizes.

---

### Task 2: Data Architecture & Software Projects Dataset (`src/data/projectsData.js`)

**Files:**
- Modify: `src/data/projectsData.js`

**Step 1: Structure `softwareProjects` with rich metadata**
Add the 4 software projects with exact GitHub and deployed links, descriptive tags, categories, and real architectural code snippets:

1. **Prakalp Drishti**:
   - `id`: `'prakalp-drishti'`
   - `title`: `'Prakalp Drishti'`
   - `category`: `'software'`
   - `categoryLabel`: `'Decision Intelligence'`
   - `description`: `'An autonomous infrastructure decision intelligence platform for MoSPI monitoring 2,207+ national projects worth ₹13.60L Cr. Features multi-engine risk auditing (Satya Kavach, Kaal Chakra, Setu Varsha), HiGHS linear programming capital allocators, and cryptographically sealed SHA-256 audit trails.'`
   - `tags`: `['Next.js', 'Decision Intelligence', 'HiGHS LP Solver', 'Risk Modeling', 'Geospatial']`
   - `image`: `'prakalp-drishti.png'`
   - `link`: `'https://prakalp-drishti.vercel.app/'`
   - `github`: `'https://github.com/amey-bauchkar/Prakalp-Drishti-.git'`
   - `codeType`: `'js'`
   - `code`: HiGHS linear programming capital allocation and portfolio risk weighting solver logic.

2. **DepthWizard**:
   - `id`: `'depthwizard'`
   - `title`: `'DepthWizard'`
   - `category`: `'software'`
   - `categoryLabel`: `'3D Surface & Elevation Studio'`
   - `description`: `'High-precision 3D elevation and surface studio converting satellite and aerial imagery into metric DEM & nDSM digital twins. Delivers GPU-accelerated real-time 3D terrain rendering, LoD-1 extruded building meshes, multi-angle projections (Nadir, Oblique, Horizon), and geological hazard zoning.'`
   - `tags`: `['WebGL / Three.js', 'Digital Twin', 'DEM & nDSM', 'LoD-1 3D Mesh', 'Geospatial Studio']`
   - `image`: `'depthwizard.png'`
   - `link`: `'http://depthwizard.indiasouthcentral.cloudapp.azure.com/'`
   - `github`: `'https://github.com/amey-bauchkar/DepthWizard.git'`
   - `codeType`: `'js'`
   - `code`: Three.js shader-based terrain heightmap displacement and procedural LoD-1 building extrusion routine.

3. **VARSHA**:
   - `id`: `'varsha'`
   - `title`: `'VARSHA'`
   - `category`: `'software'`
   - `categoryLabel`: `'Epidemic & Flood Early Warning'`
   - `description`: `'Monsoon flood exposure and epidemic outbreak early warning system designed for Mumbai\'s 24 administrative wards. Correlates ERA5 weather reanalysis and precipitation telemetry with demographic density to trigger +38.1h advance waterlogging alerts and 72-hour preventive clinic intervention windows.'`
   - `tags`: `['GIS / Leaflet', 'Epidemic Surveillance', 'Hydrological Modeling', 'Predictive Analytics', 'Civic Tech']`
   - `image`: `'varsha.png'`
   - `link`: `'https://codeastra-three.vercel.app/'`
   - `github`: `'https://github.com/Tomeseto/Codeastra.git'`
   - `codeType`: `'js'`
   - `code`: Environmental flood vulnerability scoring index and 72-hour clinical outbreak lead-time pipeline.

4. **MandiMitra**:
   - `id`: `'mandimitra'`
   - `title`: `'MandiMitra'`
   - `category`: `'software'`
   - `categoryLabel`: `'APMC Protocol & Shared Freight'`
   - `description`: `'Joint economics optimizer for Indian farmers under Maharashtra APMC markets. Computes AsliDaam™ (true wallet cash realization after haulage diesel, APMC tariffs, and storage shrinkage) paired with SajhaBazaar dynamic shared freight corridor pooling for up to 40% logistical savings.'`
   - `tags`: `['Agritech', 'Logistics Optimization', 'AsliDaam™ Protocol', 'Freight Pooling', 'Multilingual']`
   - `image`: `'mandimitra.png'`
   - `link`: `'https://sic-2-pi.vercel.app/'`
   - `github`: `'https://github.com/amey-bauchkar/SIC2.git'`
   - `codeType`: `'js'`
   - `code`: Net wallet realization engine calculating diesel haulage, mandi cess, and multi-smallholder freight corridor matching.

**Step 2: Update existing hardware projects with category attributes**
- Mark AquaLens, Line Follower Robot, Self Balancing Robot, Smart Dustbin, and Crane Safety with `category: 'hardware'` and `categoryLabel: 'Robotics & Embedded'`.

**Step 3: Export clean interfaces**
```javascript
export const softwareProjects = [ ... ];
export const hardwareProjects = [ ... ];
export const projectsData = [ ...softwareProjects, ...hardwareProjects ];
```

---

### Task 3: Modal Dialogs Enhancement (`ProjectModal.jsx` & `CodeViewerModal.jsx`)

**Files:**
- Modify: `src/components/ProjectModal.jsx`
- Modify: `src/components/CodeViewerModal.jsx`

**Step 1: Add GitHub link and Category Badge to `ProjectModal.jsx`**
- Show a Category Pill (`Software Platform` or `Hardware System`) next to the title.
- In the actions row, render:
  - `Live Demo` (primary accent button) if `project.link` exists
  - `GitHub Repo` (styled glass button with `<i className="fab fa-github">`) if `project.github` exists
  - `View Source` (code icon button) if `project.code` exists

**Step 2: Enhance `CodeViewerModal.jsx`**
- Add a direct "Open GitHub" link button in the top header bar when `project.github` is present.
- Support file type badges for `.js`, `.cpp`, `.py`, etc.

---

### Task 4: Dual-Section UI & Filter System in `Projects.jsx`

**Files:**
- Modify: `src/components/Projects.jsx`

**Step 1: Design Section Header & Category Filter Controls**
- Below the "My Archive" header, implement an interactive, sticky glass pill navigation bar:
  - `[ All Projects (9) ]`
  - `[ 💻 Software Systems (4) ]`
  - `[ ⚡ Hardware & Robotics (5) ]`
- Provides two complementary modes:
  - Fast Category Filtering: instantly toggles between Software, Hardware, or Both, updating the height and ScrollTrigger seamlessly.
  - Smooth Section Scrolling: smooth-scrolls directly to `#software-projects` or `#hardware-projects` when browsing in 'All' mode.

**Step 2: Implement Distinct Section Headers & Theming**
- **Section 1: Software & Decision Systems**
  - Monospace eyebrow: `01 // SOFTWARE & DECISION INTELLIGENCE`
  - Headline: `Decision Engines, 3D Twins & Predictive Systems`
  - Subtext: `Architected for high-impact decision support, real-time spatial computing, and mathematical optimization.`
- **Section 2: Robotics & Hardware Engineering**
  - Monospace eyebrow: `02 // ROBOTICS & EMBEDDED ENGINEERING`
  - Headline: `Sensors, Kinematics & Physical Automation`
  - Subtext: `Engineered from circuit schematics, custom firmware, PID control loops, and fail-safe industrial load testing.`

**Step 3: Enhance Project Cards with Direct Action Buttons**
- Add `project-glass-card` class name so GSAP ScrollTrigger entrance animations execute properly.
- Include direct action links on the card itself:
  - `Explore Work` (modal trigger)
  - `Live Demo` direct icon link
  - `GitHub` direct icon link
- Category badge pill on each card (`Software Platform` / `Robotics`).

**Step 4: Dynamic Container Sizing & Canvas Sequence Synchronization**
- Dynamically scale the container height depending on the active filter state so the background sequence scrubs proportionally.
- Trigger `ScrollTrigger.refresh()` on filter change and image load.

---

### Task 5: Testing, Visual Verification & Build Validation

**Files:**
- Verify: `npm run build`
- Browser Test: Browser subagent / local preview on `http://localhost:5173/projects`

**Step 1: Run Vite build validation**
Ensure all imports, asset references, and JSX pass without errors or warnings.

**Step 2: Visual and functional verification**
- Navigate to `/projects`.
- Verify the 4 software projects display their high-resolution screenshots, badges, tags, and titles.
- Verify clicking `Live Demo` opens the external URL in a new tab.
- Verify clicking `GitHub` opens the repository in a new tab.
- Verify clicking `Explore Work` opens the modal with both Live Demo and GitHub buttons.
- Verify toggling between `All`, `Software`, and `Hardware` filters.
- Verify smooth scrolling and background canvas sequence responsiveness across both sections.
