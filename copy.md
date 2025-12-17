# Homepage Animation Storyboard- "The Ultimate 3D Visualization"

> [!NOTE]
> **The Vision**: By installing `three`, `@react-three/fiber`, and `@react-three/drei`, we unlock **WebGL**. 
> This means we can render **5,000+ interactive points** (representing your actual database) instead of just 50 HTML cards. 
> The animation becomes a **Simulation**, not just a movie.

---

## 🎬 Phase 1: The Universe (The Database)
**Visual**:
- A rotating **Galaxy of Stars**. Each "Star" is an investor.
- Count: ~3,000 particles (Actual size of `angel_investors_rows.json`).
- Colors: 
  - Blue dots = Funds
  - Gold dots = Angels
  - White dots = Employees
- **Interaction**: Mouse hover creates a localized "distortion field" (fluid physics), showing the system is alive.
- **Micro-Label**: Tiny text occasionally fades in near a star: *"Sequoia"*, *"Jason Calacanis"*, *"a16z"*.

## 🎬 Phase 2: The Query (The Input)
**Visual**:
- User types "Fintech". 
- The Galaxy **implodes**.
- Non-matching stars (Consumer, BioTech) are flung to the periphery (dark space).
- Matching stars (Fintech) are pulled magnetically to the center formed a condensed **Sphere**.
- **Physics**: Real spring physics. The particles bounce and settle.

## 🎬 Phase 3: The Filter (The Backend Logic)
**Visual**:
- **Layer 1 (Stage)**: The Sphere passes through a "Plane of Light" (Series A filter). 
  - 50% of the particles drop out (fall down due to simulated gravity).
- **Layer 2 (Location)**: The remaining stars rotate to align with a transparent 3D Map of Europe (if "Spain" is selected).
  - Only the stars inside the map boundaries remain lit.

## 🎬 Phase 4: The Angel Score (The Elevation)
**Visual**:
- We are left with ~20 perfect matches.
- The system runs the `angel_score` function visually:
  - The stars move vertically (Y-axis) based on their score.
  - The highest `score` stars rise to the top.
- **The Transition**: The top 3 stars fly forward, closer... closer... until they *morph* from 3D points into 2D HTML Glass Cards (The UI).

## 🛠 Tech Stack Required
1.  **`three`**: The core 3D engine.
2.  **`@react-three/fiber`**: To componentize it in React.
3.  **`@react-three/drei`**: For "Float", "Stars", and "Text3D" helpers.
4.  **`maath`**: For efficient math/randomness buffers.

## 🚀 Feasibility
- **Possible?**: **YES.**
- **Performance**: WebGL handles 10,000 points easily on modern devices.
- **Result**: A stunning, award-winning visual that looks like a high-end Data Science dashboard.
