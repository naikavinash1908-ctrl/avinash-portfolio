# 🚀 Avinash Naik — Developer Showcase & Dynamic GitHub Intelligence Hub

An ultra-sleek, interactive, and unique personal developer portfolio engineered specifically for **Avinash Naik** (`@naikavinash1908-ctrl`).

Built with modern semantic HTML5, high-performance CSS3 (Glassmorphism & CSS Variables), and dynamic vanilla JavaScript (ES6+), featuring zero bloated runtime dependencies.

---

## 🌟 What Makes This Website Unique?

1. **Dual-Paradigm Interface (GUI + Cyber Terminal HUD)**:
   - **Showcase GUI Mode**: Glassmorphic cards, smooth responsive scrolling, live metrics counters, interactive skills radar, and project categorization.
   - **Cyber Terminal CLI Mode**: Press <kbd>`</kbd> or click **Terminal Mode** to launch a full-featured retro-futuristic developer console! Execute commands like `help`, `repos`, `stats`, `whoami`, `demo clinic`, `theme cyber`, and `sync`.

2. **Live GitHub REST API Synchronization**:
   - Directly interfaces with `https://api.github.com/users/naikavinash1908-ctrl` to dynamically display repositories, active push timelines, language composition ratios, and follower counts.
   - Includes verified snapshot data fallback, ensuring seamless, instantaneous rendering even when offline or hitting GitHub rate limits.

3. **Interactive Project Simulators & Sandboxes (In-Modal Demos)**:
   Instead of static screenshots, visitors can click **"Launch Interactive Demo"** on any project to test functional prototypes right inside the site:
   - 🌿 **Avinash Natural Clinic & PremiumCare Clinic**: Specialist doctor selector, patient intake form, and live appointment verification receipt generator.
   - ✨ **Diva Clothing**: Dynamic catalog lookbook, "+ Add to Bag" state manager, live shopping cart calculations, item deletion, and checkout confirmation.
   - 📋 **TaskFlow (To-Do List)**: Priority task creator, status checkboxes, and local task lifecycle management.
   - 🎓 **StudentGate Portal**: Interactive student authentication simulation with error state checks.

4. **Web Audio API Synthesizer**:
   - Synthesizes futuristic sci-fi sound effects directly in code (clicks, success chimes, terminal beeps) using the browser's native AudioContext. No external audio assets needed! Fully toggleable with memory.

5. **Multi-Palette Dynamic Theme Engine**:
   - 🌌 **Cosmic Obsidian** (Dark Cyber Navy)
   - 🌿 **Emerald Clinical** (Spruce & Mint Healthcare)
   - ⚡ **Neon Cyberpunk** (Obsidian & Amber Gold)
   - ☀️ **Clean Minimalist** (Crisp Light Mode)

---

## 🛡️ Important Security Advisory Regarding Your Personal Access Token (PAT)

> [!CAUTION]
> **Token Security Best Practices**:
> You provided a Personal Access Token (`ghp_...`). 
> **Never embed or commit a GitHub Personal Access Token into client-side code** (HTML, CSS, JS) that will be hosted publicly on GitHub Pages or the web, because anyone inspecting your site's source code could extract the token.
>
> **How this portfolio protects you:**
> 1. This portfolio is engineered to communicate with GitHub's **Public REST API** (`api.github.com/users/naikavinash1908-ctrl`), which requires **no secret token** on the client side!
> 2. Because the token was pasted into this chat prompt, it is recommended to visit [GitHub Developer Settings > Personal Access Tokens](https://github.com/settings/tokens) and **rotate/revoke** this specific token to ensure your GitHub account remains 100% secure.

---

## 📂 Project Directory Structure

```text
avinash-dev-portfolio/
├── index.html        # Main semantic application structure
├── style.css         # Complete design system, glassmorphism & responsive styles
├── script.js        # Particles canvas, audio synth, live GitHub sync & terminal
└── README.md         # Documentation, deployment guide & security notice
```

---

## ⚡ How to Run & Preview Locally

1. **Directly in Browser**:
   - Navigate to `C:\Users\naika\.gemini\antigravity\scratch\avinash-dev-portfolio\`
   - Double-click `index.html` to open it in your browser (Chrome, Edge, Firefox, Brave).

2. **Using a Local Static Server**:
   If you have Python or any local server installed:
   ```bash
   # In the avinash-dev-portfolio folder:
   python -m http.server 8080
   # Then visit http://localhost:8080 in your browser
   ```

---

## 🌐 How to Deploy to GitHub Pages (Free Hosting)

1. Create a new repository on your GitHub account (`naikavinash1908-ctrl`) named `portfolio` (or `naikavinash1908-ctrl.github.io`).
2. Push the files in this directory (`index.html`, `style.css`, `script.js`, `README.md`) to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Avinash Naik portfolio"
   git branch -M main
   git remote add origin https://github.com/naikavinash1908-ctrl/portfolio.git
   git push -u origin main
   ```
3. Go to repository **Settings** > **Pages** > Set source to **Deploy from branch: main** > Save.
4. Your unique portfolio will be live at:
   `https://naikavinash1908-ctrl.github.io/portfolio/`
