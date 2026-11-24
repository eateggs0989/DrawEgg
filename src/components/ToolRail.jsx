
import React, { useState, useRef } from 'react';

import {
  Move,
  Wand2,
  Pencil,
  Eraser,
  Type,
  PaintBucket,
  Shapes,
  Undo2,
  Trash2,
  Square,
  Circle,
  Pipette,
  Copy,
  Check,
  Palette,
  X,
} from 'lucide-react';

const INK_COLORS = [
  '#2563EB', '#111827', '#DC2626', '#16A34A',
  '#D97706', '#FFFFFF', '#7C3AED', '#EC4899',
  '#0891B2', '#0D9488', '#65A30D', '#CA8A04',
  '#EA580C', '#9333EA', '#475569', '#F472B6',
  '#38BDF8', '#A3E635', '#FACC15', '#F54927',
];

const TOOLS = [
  { id: 'move', icon: Move, label: 'Select / Move' },
  { id: 'autodraw', icon: Wand2, label: 'AutoDraw' },
  { id: 'pen', icon: Pencil, label: 'Draw' },
  { id: 'rubber', icon: Eraser, label: 'Eraser' },
  { id: 'text', icon: Type, label: 'Text' },
  { id: 'fill', icon: PaintBucket, label: 'Fill Paper' },
];

function hsvToHex(h, s, v) {
  s /= 100;
  v /= 100;

  const k = (n) => (n + h / 60) % 6;
  const f = (n) => v - v * s * Math.max(
    0,
    Math.min(k(n), 4 - k(n), 1)
  );

  const toHex = (value) =>
    Math.round(value * 255).toString(16).padStart(2, '0');

  return `#${toHex(f(5))}${toHex(f(3))}${toHex(f(1))}`.toUpperCase();
}

function hexToHsv(hex) {
  const value = hex.replace('#', '');
  if (!/^[0-9a-fA-F]{6}$/.test(value)) {
    return null;
  }

  const r = parseInt(value.slice(0, 2), 16) / 255;
  const g = parseInt(value.slice(2, 4), 16) / 255;
  const b = parseInt(value.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;

  let h = 0;

  if (delta !== 0) {
    if (max === r) h = 60 * (((g - b) / delta) % 6);
    else if (max === g) h = 60 * ((b - r) / delta + 2);
    else h = 60 * ((r - g) / delta + 4);
  }

  if (h < 0) h += 360;

  return {
    h,
    s: max === 0 ? 0 : (delta / max) * 100,
    v: max * 100,
  };
}

export default function ToolRail({
  activeTool,
  setActiveTool,
  inkColor,
  setInkColor,
  elements,
  setElements,
  setCurrentEl,
}) {
  const [shapesOpen, setShapesOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [hue, setHue] = useState(220);
  const [saturation, setSaturation] = useState(85);
  const [brightness, setBrightness] = useState(95);
  const [hexInput, setHexInput] = useState(inkColor);
  const [copied, setCopied] = useState(false);

  const colorAreaRef = useRef(null);

  const updateColor = (h, s, v) => {
    const nextColor = hsvToHex(h, s, v);
    setHue(h);
    setSaturation(s);
    setBrightness(v);
    setInkColor(nextColor);
    setHexInput(nextColor);
  };

  const setColorFromHex = (value) => {
    setHexInput(value);

    if (/^#[0-9a-fA-F]{6}$/.test(value)) {
      const hsv = hexToHsv(value);
      setInkColor(value.toUpperCase());

      if (hsv) {
        setHue(hsv.h);
        setSaturation(hsv.s);
        setBrightness(hsv.v);
      }
    }
  };

  const openColorPicker = () => {
    const hsv = hexToHsv(inkColor);

    if (hsv) {
      setHue(hsv.h);
      setSaturation(hsv.s);
      setBrightness(hsv.v);
    }

    setHexInput(inkColor);
    setColorOpen((prev) => !prev);
    setShapesOpen(false);
  };

  const handleColorArea = (e) => {
    const rect = colorAreaRef.current.getBoundingClientRect();

    const s = Math.max(
      0,
      Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
    );

    const v = Math.max(
      0,
      Math.min(100, 100 - ((e.clientY - rect.top) / rect.height) * 100)
    );

    updateColor(hue, s, v);
  };

  const pickScreenColor = async () => {
    if (!window.EyeDropper) {
      alert('Screen color picking is not supported in this browser. You can still use the custom color picker.');
      return;
    }

    try {
      const eyeDropper = new window.EyeDropper();
      const result = await eyeDropper.open();
      setColorFromHex(result.sRGBHex.toUpperCase());
    } catch (error) {
      // User cancelled the eyedropper.
    }
  };

  const copyColor = async () => {
    try {
      await navigator.clipboard.writeText(inkColor);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      setHexInput(inkColor);
    }
  };

  const handleUndo = () => {
    setElements((prev) => prev.slice(0, -1));
    setCurrentEl(null);
  };

  const handleClear = () => {
    if (!elements.length) return;

    if (window.confirm('Clear everything from this paper?')) {
      setElements([]);
      setCurrentEl(null);
    }
  };

  const selectShape = (shape) => {
    setActiveTool(shape);
    setShapesOpen(false);
  };

  return (
    <aside className="tool-rail">

      {TOOLS.map((tool) => {
        const Icon = tool.icon;

        return (
          <button
            key={tool.id}
            className={`tool-btn ${
              activeTool === tool.id ? 'active' : ''
            }`}
            onClick={() => {
              setActiveTool(tool.id);
              setShapesOpen(false);
              setColorOpen(false);
            }}
            title={tool.label}
          >
            <Icon size={19} />
          </button>
        );
      })}

      {/* Shapes Picker */}
      <div className="shape-picker-wrapper">
        <button
          className={`tool-btn ${
            ['box', 'circle'].includes(activeTool) ? 'active' : ''
          }`}
          onClick={() => {
            setShapesOpen((prev) => !prev);
            setColorOpen(false);
          }}
          title="Shapes"
          aria-expanded={shapesOpen}
        >
          <Shapes size={19} />
        </button>

        {shapesOpen && (
          <div className="shape-popup">
            <span className="shape-popup-title">Shapes</span>

            <button
              className={`shape-option ${
                activeTool === 'box' ? 'selected' : ''
              }`}
              onClick={() => selectShape('box')}
            >
              <Square size={22} />
              <span>Rectangle</span>
            </button>

            <button
              className={`shape-option ${
                activeTool === 'circle' ? 'selected' : ''
              }`}
              onClick={() => selectShape('circle')}
            >
              <Circle size={22} />
              <span>Circle</span>
            </button>
          </div>
        )}
      </div>

      <div className="divider" />

      {/* Active Color */}
      <div className="color-picker-wrapper">

        <button
          className="current-color-button"
          onClick={openColorPicker}
          title="Custom Color Picker"
          aria-label="Open custom color picker"
          style={{ '--current-ink': inkColor }}
        >
          <span
            className="current-color-preview"
            style={{ backgroundColor: inkColor }}
          />
        </button>

        {colorOpen && (
          <div className="color-picker-popup">

            <div className="color-picker-header">
              <div>
                <strong>Custom Color</strong>
                <span>Choose your drawing color</span>
              </div>

              <button
                className="color-close"
                onClick={() => setColorOpen(false)}
                title="Close"
              >
                <X size={17} />
              </button>
            </div>

            {/* Saturation and brightness */}
            <div
              ref={colorAreaRef}
              className="color-saturation-area"
              style={{ backgroundColor: `hsl(${hue}, 100%, 50%)` }}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                handleColorArea(e);
              }}
              onPointerMove={(e) => {
                if (e.currentTarget.hasPointerCapture(e.pointerId)) {
                  handleColorArea(e);
                }
              }}
            >
              <div
                className="color-picker-indicator"
                style={{
                  left: `${saturation}%`,
                  top: `${100 - brightness}%`,
                }}
              />
            </div>

            {/* Hue slider */}
            <div className="hue-slider-wrapper">
              <input
                type="range"
                min="0"
                max="360"
                value={hue}
                onChange={(e) =>
                  updateColor(
                    Number(e.target.value),
                    saturation,
                    brightness
                  )
                }
                className="hue-slider"
                aria-label="Hue"
              />
            </div>

            {/* HEX input */}
            <div className="hex-color-row">
              <span
                className="hex-preview"
                style={{ backgroundColor: inkColor }}
              />

              <span className="hex-prefix">#</span>

              <input
                value={hexInput.replace('#', '')}
                maxLength={6}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/[^0-9a-fA-F]/g, '')
                    .slice(0, 6);

                  setColorFromHex(`#${value}`);
                }}
                className="hex-input"
                aria-label="HEX color"
              />

              <button
                className="copy-color-button"
                onClick={copyColor}
                title="Copy HEX"
              >
                {copied ? <Check size={17} /> : <Copy size={17} />}
              </button>

              <button
                className="eyedropper-button"
                onClick={pickScreenColor}
                title="Pick color from screen"
              >
                <Pipette size={18} />
              </button>
            </div>

            {/* Preset colors */}
            <div className="custom-color-presets">
              <div className="preset-heading">
                <span>Preset colors</span>
                <span>{INK_COLORS.length} colors</span>
              </div>

              <div className="preset-grid">
                {INK_COLORS.map((color) => (
                  <button
                    key={color}
                    className={`preset-color ${
                      inkColor.toUpperCase() === color ? 'selected' : ''
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setColorFromHex(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>

          </div>
        )}
      </div>

      {/* Quick Colors */}
      <div className="quick-color-group">
        {INK_COLORS.slice(0, 5).map((color) => (
          <button
            key={color}
            className={`ink-dot ${
              inkColor.toUpperCase() === color ? 'selected' : ''
            }`}
            style={{ backgroundColor: color }}
            onClick={() => {
              setInkColor(color);
              const hsv = hexToHsv(color);
              if (hsv) {
                setHue(hsv.h);
                setSaturation(hsv.s);
                setBrightness(hsv.v);
              }
            }}
            title={color}
          />
        ))}
      </div>

      <div className="divider" />

      <button
        className="tool-btn"
        onClick={handleUndo}
        disabled={elements.length === 0}
        title="Undo"
      >
        <Undo2 size={19} />
      </button>

      <button
        className="tool-btn danger"
        onClick={handleClear}
        title="Clear Paper"
      >
        <Trash2 size={19} />
      </button>

    </aside>
  );
}
