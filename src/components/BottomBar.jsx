
import React from 'react';

import {
  Minus,
  Plus,
} from 'lucide-react';

export default function BottomBar({
  zoom,
  setZoom,
  dashed,
  setDashed,
  brushSize,
  setBrushSize,
}) {
  const brushSizes = [3, 6, 12];

  return (
    <div className="bottom-bar">

      {/* Zoom Controls */}
      <div className="pill-group">

        <button
          onClick={() =>
            setZoom((z) => Math.max(50, z - 10))
          }
          title="Zoom out"
        >
          <Minus size={14} />
        </button>

        <span className="zoom-text">
          {zoom}%
        </span>

        <button
          onClick={() =>
            setZoom((z) => Math.min(150, z + 10))
          }
          title="Zoom in"
        >
          <Plus size={14} />
        </button>

      </div>

      {/* Line Style */}
      <div className="pill-group">

        <button
          className={!dashed ? 'active' : ''}
          onClick={() => setDashed(false)}
          title="Solid line"
        >
          —
        </button>

        <button
          className={dashed ? 'active' : ''}
          onClick={() => setDashed(true)}
          title="Dashed line"
        >
          --
        </button>

      </div>

      {/* Brush Size */}
      <div className="pill-group">

        {brushSizes.map((size) => (
          <button
            key={size}
            className={`size-dot-btn ${
              brushSize === size ? 'active' : ''
            }`}
            onClick={() => setBrushSize(size)}
            title={`Brush size ${size}`}
          >
            <span
              className="size-dot"
              style={{
                width: size + 4,
                height: size + 4,
              }}
            />
          </button>
        ))}

      </div>

    </div>
  );
}
