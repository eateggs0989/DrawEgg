# 🥚 DrawEgg — Online Drawing & Idea Board

**Draw your ideas. Build your vision.**

DrawEgg is a modern, browser-based drawing and idea-board application designed to help people visualize business ideas, startup concepts, system architectures, workflows and creative thoughts.

Create diagrams, sketch ideas, add text, draw shapes and organize your thoughts on a simple digital canvas.

No complicated software. Just open your browser and start creating.

---

## ✨ Features

### 🎨 Drawing & Design
- Freehand drawing with customizable brush sizes.
- Smart drawing tool.
- Eraser for removing parts of drawings.
- Rectangle and circle shape tools.
- Text tool with customizable font and text size.
- Custom color picker with HEX color support.
- Multiple preset colors.
- Fill tool for changing paper color.

### 🖱️ Object Editing
- Select and move canvas elements.
- Resize objects using selection handles.
- Rotate selected objects.
- Edit individual text elements.
- Undo drawing actions.

### 📄 Canvas Customization
- Landscape, Square and Portrait paper formats.
- Multiple paper colors.
- Zoom in and zoom out.
- Brush size and line-style customization.
- PNG export to download your creations.

### 📱 Responsive Design
- Desktop-friendly workspace.
- Mobile-responsive interface.
- Touch-friendly drawing controls.
- Optimized toolbar layout for smaller screens.

### 🔒 Privacy & Simplicity
- Designed as a client-side drawing application.
- Drawing operations are processed in the browser.
- No account is required to start drawing.
- No automatic cloud synchronization in the current version.

---
## 🖥️ Preview
<img width="464" height="312" alt="Screenshot 2026-11-25 015035" src="https://github.com/user-attachments/assets/676ce05e-99ff-4182-af2a-a612a474f51d" />
<img width="1487" height="1058" alt="DrawEgg Idea Board Mind Map" src="https://github.com/user-attachments/assets/22a979e2-e16f-41ce-916e-0d17d3dadbc0" />

---

## 🛠️ Built With

| Technology | Purpose |
|---|---|
| React | User interface |
| Vite | Development server and build tool |
| JavaScript | Application logic |
| CSS | Styling and responsive layouts |
| Lucide React | Interface icons |
| HTML5 Canvas | Drawing and rendering |

---

## 📂 Project Structure

```text
DrawEgg/
│
├── public/
│   ├── favicon.svg
│   └── icons.svg
│
├── src/
│   ├── components/
│   │   ├── TopBar.jsx
│   │   ├── ToolRail.jsx
│   │   ├── SideDrawer.jsx
│   │   └── BottomBar.jsx
│   │
│   ├── data/
│   │   └── idealcons.js
│   │
│   ├── pages/
│   │   ├── AboutDrawEgg.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   ├── TermsOfService.jsx
│   │   └── LegalPages.css
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

---

## 🚀 Getting Started

Follow these steps to run DrawEgg locally.

### 1. Clone the repository

```bash
https://github.com/eateggs0989/DrawEgg.git
```

### 2. Open the project

```bash
cd DrawEgg
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### 5. Build for production

```bash
npm run build
```

---

## 🌐 Deployment

DrawEgg can be deployed using [Vercel](https://vercel.com/).

1. Push your project to GitHub.
2. Import the repository into Vercel.
3. Select Vite as the framework.
4. Use `npm run build` as the build command.
5. Use `dist` as the output directory.
6. Deploy your application.
7. website -- https://draw-egg.vercel.app/
---

## 🎯 Project Vision

The goal of DrawEgg is to make visual thinking simple and accessible.

Whether you're planning a startup, designing a system architecture, explaining a business model or simply sketching an idea, DrawEgg provides a simple space to bring your thoughts to life.

---

## 👨‍💻 Developer

Created and developed as an independent project.

**DrawEgg © 2026. All rights reserved.**

---

*Turn your thoughts into something you can see. 🥚*
