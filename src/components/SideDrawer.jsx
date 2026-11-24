import React from 'react';

import {
  X,
  Download,
  Trash2,
  ShieldCheck,
  FileText,
  Info,
  Code2,
  ExternalLink,
} from 'lucide-react';

const PAPER_COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Warm Cream', value: '#FDF6E3' },
  { name: 'Soft Gray', value: '#E5E7EB' },
  { name: 'Dark Slate', value: '#1E293B' },
];

const PAPER_SIZES = [
  { id: 'landscape', label: 'Landscape', w: 960, h: 580 },
  { id: 'square', label: 'Square', w: 700, h: 700 },
  { id: 'portrait', label: 'Portrait', w: 560, h: 740 },
];

const GITHUB_URL = 'https://github.com/eateggs0989';

export default function SideDrawer({
  menuOpen,
  setMenuOpen,
  paperColor,
  setPaperColor,
  setPaperSize,
  setElements,
  setCurrentEl,
  handleDownloadPng,
  onNavigate,
}) {
  if (!menuOpen) return null;

  const closeDrawer = () => setMenuOpen(false);

  const navigateTo = (page) => {
    closeDrawer();
    if (onNavigate) onNavigate(page);
  };

  const handleStartOver = (size) => {
    setPaperSize({ w: size.w, h: size.h });
    setElements([]);
    setCurrentEl(null);
    closeDrawer();
  };

  const handleClear = () => {
    setElements([]);
    setCurrentEl(null);
    closeDrawer();
  };

  return (
    <div className="drawer-backdrop" onClick={closeDrawer}>
      <nav
        className="side-drawer"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <span>DrawEgg</span>
          <button
            className="drawer-close"
            onClick={closeDrawer}
            title="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="drawer-section">
          <div className="drawer-title">Start over</div>
          <div className="size-presets">
            {PAPER_SIZES.map((size) => (
              <button
                key={size.id}
                className="preset-btn"
                onClick={() => handleStartOver(size)}
              >
                <div className={`preset-box ${size.id}`} />
                <span>{size.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="drawer-section">
          <div className="drawer-title">Paper Color</div>
          <div className="drawer-colors">
            {PAPER_COLORS.map((color) => (
              <button
                key={color.value}
                className={`paper-swatch ${
                  paperColor === color.value ? 'active' : ''
                }`}
                style={{ backgroundColor: color.value }}
                onClick={() => setPaperColor(color.value)}
                title={color.name}
              />
            ))}
          </div>
        </div>

        <button
          className="drawer-link"
          onClick={() => {
            handleDownloadPng();
            closeDrawer();
          }}
        >
          <Download size={16} />
          Download (.png)
        </button>

        <button className="drawer-link" onClick={handleClear}>
          <Trash2 size={16} />
          Clear Paper
        </button>

        <div className="drawer-info-section">
          <div className="drawer-title">ABOUT DRAW EGG</div>

          <button
            className="drawer-link"
            onClick={() => navigateTo('privacy')}
          >
            <ShieldCheck size={16} />
            Privacy Policy
          </button>

          <button
            className="drawer-link"
            onClick={() => navigateTo('terms')}
          >
            <FileText size={16} />
            Terms of Service
          </button>

          <button
            className="drawer-link"
            onClick={() => navigateTo('about')}
          >
            <Info size={16} />
            About DrawEgg
          </button>

          
        </div>

        <div className="drawer-footer">
           DrawEgg © 2026. All rights reserved.
        </div>
      </nav>
    </div>
  );
}
