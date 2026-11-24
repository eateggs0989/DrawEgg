import React from 'react';
import {
  Menu,
  Download,
  Egg,
} from 'lucide-react';

import { IDEA_ICONS } from '../data/idealcons.js';

const PAPER_COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Warm Cream', value: '#FDF6E3' },
  { name: 'Soft Gray', value: '#E5E7EB' },
  { name: 'Dark Slate', value: '#1E293B' },
];

const FONT_FAMILIES = [
  { label: 'Roboto Mono', value: '"Roboto Mono", monospace' },
  { label: 'Arial', value: 'Arial, sans-serif' },
  { label: 'Verdana', value: 'Verdana, sans-serif' },
  { label: 'Georgia', value: 'Georgia, serif' },
  { label: 'Times New Roman', value: '"Times New Roman", serif' },
  { label: 'Comic Sans', value: '"Comic Sans MS", cursive' },
];

const FONT_SIZES = [12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 96];

const DRAWING_TOOLS = ['pen', 'pencil', 'draw', 'freehand', 'box'];

export default function TopBar({
  activeTool,
  setMenuOpen,
  handleSelectStamp,
  paperColor,
  setPaperColor,
  handleDownloadPng,
  brushSize,
  setBrushSize,
  textFontFamily,
  setTextFontFamily,
  textFontSize,
  setTextFontSize,
}) {
  const isTextTool = activeTool === 'text';
  const isDrawingTool = DRAWING_TOOLS.includes(activeTool);

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-btn"
          onClick={() => setMenuOpen(true)}
          title="Menu"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        <div className="brand">
          <Egg size={22} className="brand-icon" />
          <div>
            <div className="brand-title">DrawEgg</div>
            <div className="brand-sub">Idea Board</div>
          </div>
        </div>
      </div>

      {isTextTool ? (
        <div className="topbar-context topbar-text-controls">
          <span className="context-title">Type</span>

          <label className="topbar-control-wrap font-family-control">
            <span className="sr-only">Font family</span>
            <select
              className="topbar-select"
              value={textFontFamily}
              onChange={(e) => setTextFontFamily(e.target.value)}
            >
              {FONT_FAMILIES.map((font) => (
                <option key={font.label} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </label>

          <label className="topbar-control-wrap font-size-control">
            <span className="sr-only">Font size</span>
            <select
              className="topbar-select"
              value={textFontSize}
              onChange={(e) => setTextFontSize(e.target.value)}
            >
              {FONT_SIZES.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
        </div>
      ) : isDrawingTool ? (
        <div className="topbar-context topbar-draw-controls">
          <span className="context-title">Draw</span>
          <input
            className="pen-size-slider"
            type="range"
            min="1"
            max="30"
            step="1"
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            aria-label="Pen size"
            style={{ '--range-progress': `${((brushSize - 1) / 29) * 100}%` }}
          />
          <span className="pen-size-value">{brushSize}px</span>
        </div>
      ) : (
        <div className="suggestion-strip">
          <span className="suggestion-label">
            {activeTool === 'autodraw' ? 'Do you mean:' : 'Ideas:'}
          </span>
          <div className="suggestion-icons">
            {IDEA_ICONS.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  className="stamp-btn"
                  onClick={() => handleSelectStamp(item.id)}
                  title={item.label}
                  aria-label={item.label}
                >
                  <Icon size={21} strokeWidth={1.8} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="topbar-right">
        <div className="paper-picker">
          <span className="picker-label">Paper:</span>
          {PAPER_COLORS.map((color) => (
            <button
              key={color.value}
              className={`paper-swatch ${paperColor === color.value ? 'active' : ''}`}
              style={{ backgroundColor: color.value }}
              onClick={() => setPaperColor(color.value)}
              title={color.name}
              aria-label={`${color.name} paper`}
            />
          ))}
        </div>

        <button className="download-btn" onClick={handleDownloadPng}>
          <Download size={16} />
          <span>Download PNG</span>
        </button>
      </div>
    </header>
  );
}
