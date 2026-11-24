import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import AboutDrawEgg from './pages/AboutDrawEgg';
import './pages/LegalPages.css';
import TopBar from './components/TopBar';
import ToolRail from './components/ToolRail';
import SideDrawer from './components/SideDrawer';
import BottomBar from './components/BottomBar';

// ==========================================
// DRAWING HELPERS
// ==========================================

function drawStampShape(ctx, stampId, x, y, color, size) {
  // Normalize IDs so names such as "database", "db" and
  // "database-stack" all render the same shape.
  const rawId = String(stampId || '').toLowerCase();
  const id = rawId.replace(/[^a-z0-9]/g, '');

  const is = (...names) => names.some((name) =>
    id === name || id.includes(name)
  );

  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = Math.max(2, (size || 3) * 0.65);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (is('server', 'rack')) {
    [-16, 0, 16].forEach((oy) => {
      ctx.beginPath();
      ctx.roundRect(-24, oy - 6, 48, 12, 3);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-15, oy, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  } else if (is('user', 'person', 'profile')) {
    ctx.beginPath();
    ctx.arc(0, -10, 9, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 22, 17, Math.PI, 0);
    ctx.stroke();
  } else if (is('database', 'db', 'stack')) {
    ctx.beginPath();
    ctx.ellipse(0, -13, 18, 6, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-18, -13);
    ctx.lineTo(-18, 13);
    ctx.moveTo(18, -13);
    ctx.lineTo(18, 13);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 13, 18, 6, 0, 0, Math.PI);
    ctx.stroke();
  } else if (is('arrow', 'rightarrow')) {
    ctx.beginPath();
    ctx.moveTo(-25, 0);
    ctx.lineTo(23, 0);
    ctx.moveTo(12, -11);
    ctx.lineTo(24, 0);
    ctx.lineTo(12, 11);
    ctx.stroke();
  } else if (is('cost', 'dollar', 'money', 'price')) {
    ctx.font = 'bold 38px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('$', 0, 1);
  } else if (is('cloud')) {
    ctx.beginPath();
    ctx.moveTo(-23, 10);
    ctx.bezierCurveTo(-31, 8, -29, -5, -18, -7);
    ctx.bezierCurveTo(-16, -22, 3, -25, 9, -11);
    ctx.bezierCurveTo(23, -14, 31, -3, 27, 6);
    ctx.bezierCurveTo(25, 11, 20, 12, 14, 12);
    ctx.closePath();
    ctx.stroke();
  } else if (is('box', 'flowchart', 'rectangle', 'square')) {
    ctx.beginPath();
    ctx.rect(-25, -17, 50, 34);
    ctx.stroke();
  } else if (is('circle', 'oval')) {
    ctx.beginPath();
    ctx.arc(0, 0, 19, 0, Math.PI * 2);
    ctx.stroke();
  } else if (is('laptop', 'computer', 'monitor')) {
    ctx.beginPath();
    ctx.roundRect(-21, -19, 42, 30, 3);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-28, 17);
    ctx.lineTo(28, 17);
    ctx.lineTo(22, 11);
    ctx.moveTo(-28, 17);
    ctx.lineTo(-22, 11);
    ctx.stroke();
  } else if (is('lightbulb', 'bulb', 'idea')) {
    ctx.beginPath();
    ctx.arc(0, -5, 15, Math.PI * 1.08, Math.PI * 1.92);
    ctx.bezierCurveTo(16, 8, 8, 12, 7, 16);
    ctx.lineTo(-7, 16);
    ctx.bezierCurveTo(-8, 12, -16, 8, -15, -5);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-7, 21); ctx.lineTo(7, 21);
    ctx.moveTo(-5, 26); ctx.lineTo(5, 26);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, -29); ctx.lineTo(0, -24);
    ctx.moveTo(-25, -8); ctx.lineTo(-21, -6);
    ctx.moveTo(25, -8); ctx.lineTo(21, -6);
    ctx.stroke();
  } else if (is('mobile', 'phone', 'smartphone')) {
    ctx.beginPath();
    ctx.roundRect(-13, -25, 26, 50, 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-5, -18); ctx.lineTo(5, -18);
    ctx.arc(0, 18, 1.8, 0, Math.PI * 2);
    ctx.stroke();
  } else if (is('gear', 'settings', 'cog')) {
    ctx.beginPath();
    for (let i = 0; i < 24; i++) {
      const angle = (Math.PI * 2 * i) / 24 - Math.PI / 2;
      const radius = i % 3 === 0 ? 25 : 20;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, 8, 0, Math.PI * 2);
    ctx.stroke();
  } else if (is('cart', 'shopping', 'basket')) {
    ctx.beginPath();
    ctx.moveTo(-25, -20);
    ctx.lineTo(-19, -20);
    ctx.lineTo(-12, 10);
    ctx.lineTo(18, 10);
    ctx.lineTo(25, -10);
    ctx.lineTo(-16, -10);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(-7, 20, 3, 0, Math.PI * 2);
    ctx.arc(15, 20, 3, 0, Math.PI * 2);
    ctx.stroke();
  } else if (is('document', 'file', 'page', 'note')) {
    ctx.beginPath();
    ctx.moveTo(-16, -24);
    ctx.lineTo(7, -24);
    ctx.lineTo(19, -12);
    ctx.lineTo(19, 24);
    ctx.lineTo(-16, 24);
    ctx.closePath();
    ctx.moveTo(7, -24);
    ctx.lineTo(7, -12);
    ctx.lineTo(19, -12);
    ctx.moveTo(-8, 0); ctx.lineTo(11, 0);
    ctx.moveTo(-8, 8); ctx.lineTo(11, 8);
    ctx.moveTo(-8, 16); ctx.lineTo(6, 16);
    ctx.stroke();
  } else if (is('star', 'favorite')) {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const angle = -Math.PI / 2 + (i * Math.PI) / 5;
      const radius = i % 2 === 0 ? 25 : 11;
      const px = Math.cos(angle) * radius;
      const py = Math.sin(angle) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.stroke();
  } else {
    // Visible fallback for any future icon ID instead of an invisible stamp.
    ctx.beginPath();
    ctx.roundRect(-24, -20, 48, 40, 7);
    ctx.stroke();
    ctx.font = 'bold 20px Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(stampId || '?').slice(0, 1).toUpperCase(), 0, 1);
  }

  ctx.restore();
}

// ==========================================
// ELEMENT GEOMETRY
// ==========================================

function getElementBounds(el) {
  if (el.type === 'stroke') {
    if (!el.points || el.points.length === 0) {
      return { left: el.x || 0, top: el.y || 0, right: el.x || 0, bottom: el.y || 0 };
    }

    const xs = el.points.map((p) => p.x);
    const ys = el.points.map((p) => p.y);
    const padding = Math.max(8, (el.size || 1) * 2);

    return {
      left: Math.min(...xs) - padding,
      top: Math.min(...ys) - padding,
      right: Math.max(...xs) + padding,
      bottom: Math.max(...ys) + padding,
    };
  }

  if (el.type === 'box' || el.type === 'circle') {
    return {
      left: Math.min(el.x, el.x + el.w) - 5,
      top: Math.min(el.y, el.y + el.h) - 5,
      right: Math.max(el.x, el.x + el.w) + 5,
      bottom: Math.max(el.y, el.y + el.h) + 5,
    };
  }

  if (el.type === 'text') {
    const fontSize = el.fontSize || Math.max(18, (el.size || 3) * 5);
    const width = Math.max(20, el.value.length * fontSize * 0.62);

    return {
      left: el.x - 5,
      top: el.y - fontSize - 5,
      right: el.x + width + 5,
      bottom: el.y + 8,
    };
  }

  if (el.type === 'stamp') {
    const radius = 34 * (el.scale || 1);
    return {
      left: el.x - radius,
      top: el.y - radius,
      right: el.x + radius,
      bottom: el.y + radius,
    };
  }

  return {
    left: (el.x || 0) - 10,
    top: (el.y || 0) - 10,
    right: (el.x || 0) + 10,
    bottom: (el.y || 0) + 10,
  };
}

function getCenter(bounds) {
  return {
    x: (bounds.left + bounds.right) / 2,
    y: (bounds.top + bounds.bottom) / 2,
  };
}

// Important: all fragments of an erased stroke keep the same transformOrigin.
function getTransformOrigin(el) {
  return el.transformOrigin || getCenter(getElementBounds(el));
}

function transformPoint(point, center, scale, rotation) {
  const dx = (point.x - center.x) * scale;
  const dy = (point.y - center.y) * scale;

  return {
    x: center.x + dx * Math.cos(rotation) - dy * Math.sin(rotation),
    y: center.y + dx * Math.sin(rotation) + dy * Math.cos(rotation),
  };
}

function inverseTransformPoint(point, center, scale, rotation) {
  const dx = point.x - center.x;
  const dy = point.y - center.y;
  const cos = Math.cos(rotation);
  const sin = Math.sin(rotation);

  return {
    x: center.x + (dx * cos + dy * sin) / scale,
    y: center.y + (-dx * sin + dy * cos) / scale,
  };
}

// Translate both the element's geometry and its fixed transform origin.
// This keeps rotated/scaled elements moving with the pointer.
function moveElement(el, dx, dy) {
  const transformOrigin = el.transformOrigin
    ? {
        x: el.transformOrigin.x + dx,
        y: el.transformOrigin.y + dy,
      }
    : undefined;

  if (el.points) {
    return {
      ...el,
      points: el.points.map((p) => ({
        x: p.x + dx,
        y: p.y + dy,
      })),
      ...(transformOrigin ? { transformOrigin } : {}),
    };
  }

  return {
    ...el,
    x: el.x + dx,
    y: el.y + dy,
    ...(transformOrigin ? { transformOrigin } : {}),
  };
}

// ==========================================
// DESTRUCTIVE ERASER
// ==========================================

function distanceToSegment(p, a, b) {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  const lengthSquared = dx * dx + dy * dy;

  if (lengthSquared === 0) {
    return Math.hypot(p.x - a.x, p.y - a.y);
  }

  const t = Math.max(
    0,
    Math.min(
      1,
      ((p.x - a.x) * dx + (p.y - a.y) * dy) / lengthSquared
    )
  );

  const closestX = a.x + t * dx;
  const closestY = a.y + t * dy;

  return Math.hypot(p.x - closestX, p.y - closestY);
}

function eraseStroke(stroke, from, to, radius) {
  if (!stroke.points || stroke.points.length < 2) {
    return [stroke];
  }

  const sampledPoints = [];

  // Densely sample each segment so erasing works even when pointer events
  // are far apart or the original stroke has only a few points.
  for (let i = 0; i < stroke.points.length - 1; i++) {
    const a = stroke.points[i];
    const b = stroke.points[i + 1];
    const distance = Math.hypot(b.x - a.x, b.y - a.y);
    const steps = Math.max(1, Math.ceil(distance / 2));

    for (let j = 0; j < steps; j++) {
      const t = j / steps;
      sampledPoints.push({
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
      });
    }
  }

  sampledPoints.push(stroke.points[stroke.points.length - 1]);

  const groups = [];
  let currentGroup = [];

  sampledPoints.forEach((point) => {
    const erased = distanceToSegment(point, from, to) <= radius;

    if (erased) {
      if (currentGroup.length >= 2) {
        groups.push(currentGroup);
      }
      currentGroup = [];
    } else {
      currentGroup.push(point);
    }
  });

  if (currentGroup.length >= 2) {
    groups.push(currentGroup);
  }

  // Keep all metadata, especially transformOrigin, scale and rotation.
  return groups.map((points) => ({
    ...stroke,
    points,
  }));
}

// ==========================================
// MAIN APPLICATION
// ==========================================

export default function App() {
  const canvasRef = useRef(null);
  const [textEditor, setTextEditor] = useState(null);
  const textInputRef = useRef(null);
  const textWasOpen = useRef(false);
  const eraserActive = useRef(false);
  const lastEraserPoint = useRef(null);
  const interactionRef = useRef(null);

  const [elements, setElements] = useState([]);
  const [currentEl, setCurrentEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [activeTool, setActiveTool] = useState('autodraw');
  const [inkColor, setInkColor] = useState('#2563EB');

  // Native browser eyedropper. ToolRail can call this from its eyedropper button.
  // Requires a supported browser and a secure context (localhost or HTTPS).
  const handlePickColor = async () => {
    if (typeof window === 'undefined' || !('EyeDropper' in window)) {
      console.warn('The eyedropper is not supported by this browser.');
      return;
    }

    try {
      const picker = new window.EyeDropper();
      const result = await picker.open();
      if (result?.sRGBHex) {
        setInkColor(result.sRGBHex.toUpperCase());
      }
    } catch (error) {
      // Escape/cancel is normal; do not interrupt the drawing workflow.
      if (error?.name !== 'AbortError') {
        console.error('Unable to pick a color:', error);
      }
    }
  };
  const [paperColor, setPaperColor] = useState('#FFFFFF');

  const [paperSize, setPaperSize] = useState({
    w: 960,
    h: 580,
  });

  const [brushSize, setBrushSize] = useState(3);

  // Text defaults apply only to text being created next/currently edited.
  // Each saved text object keeps its own font settings.
  const [textFontFamily, setTextFontFamily] = useState('Roboto Mono');
  const [textFontSize, setTextFontSize] = useState(48);

  const [dashed, setDashed] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [activePage, setActivePage] = useState('board');
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    // Focus only when a new text editor opens, not on every keystroke
    // or font-control change (which would steal focus from the toolbar).
    if (textEditor && !textWasOpen.current && textInputRef.current) {
      textInputRef.current.focus();
    }
    textWasOpen.current = Boolean(textEditor);
  }, [textEditor]);
  // ==========================================
  // SELECTION HANDLES
  // ==========================================
  
  const getSelectionHandles = (el) => {
    const bounds = getElementBounds(el);
    const center = getTransformOrigin(el);
    const scale = el.scale ?? 1;
    const rotation = el.rotation ?? 0;

    const corners = [
      { x: bounds.left, y: bounds.top },
      { x: bounds.right, y: bounds.top },
      { x: bounds.right, y: bounds.bottom },
      { x: bounds.left, y: bounds.bottom },
    ];

    const transformedCorners = corners.map((p) =>
      transformPoint(p, center, scale, rotation)
    );

    const rotate = transformPoint(
      { x: (bounds.left + bounds.right) / 2, y: bounds.top - 30 },
      center,
      scale,
      rotation
    );

    return {
      corners: transformedCorners,
      rotate,
      center,
    };
  };

  // ==========================================
  // CANVAS RENDERING
  // ==========================================

  const renderCanvas = useCallback((ctx, showSelection = true) => {
    ctx.clearRect(0, 0, paperSize.w, paperSize.h);

    ctx.fillStyle = paperColor;
    ctx.fillRect(0, 0, paperSize.w, paperSize.h);

    const all = currentEl ? [...elements, currentEl] : elements;

    all.forEach((el) => {
      ctx.save();

      // Every element is transformed around its stored origin.
      // Erased fragments retain that same origin, preventing them from
      // jumping apart after a rotation.
      const center = getTransformOrigin(el);

      ctx.translate(center.x, center.y);
      ctx.rotate(el.rotation ?? 0);
      ctx.scale(el.scale ?? 1, el.scale ?? 1);
      ctx.translate(-center.x, -center.y);

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.setLineDash(el.dashed ? [10, 8] : []);

      if (el.type === 'stroke') {
        ctx.strokeStyle = el.color;
        ctx.lineWidth = el.size;

        if (el.points?.length > 0) {
          ctx.beginPath();
          ctx.moveTo(el.points[0].x, el.points[0].y);

          el.points.forEach((pt) => {
            ctx.lineTo(pt.x, pt.y);
          });

          ctx.stroke();
        }
      } else if (el.type === 'box') {
        ctx.strokeStyle = el.color;
        ctx.lineWidth = el.size;

        ctx.strokeRect(
          el.x,
          el.y,
          el.w,
          el.h
        );
      }

      else if (el.type === 'circle') {
        ctx.strokeStyle = el.color;
        ctx.lineWidth = el.size;

        ctx.beginPath();

        ctx.ellipse(
          el.x + el.w / 2,
          el.y + el.h / 2,
          Math.abs(el.w / 2),
          Math.abs(el.h / 2),
          0,
          0,
          Math.PI * 2
        );

        ctx.stroke();
      } else if (el.type === 'text') {
        ctx.fillStyle = el.color;
        const fontSize = el.fontSize || Math.max(18, (el.size || 3) * 5);
        const fontFamily = el.fontFamily || '"Comic Sans MS", cursive, sans-serif';
        ctx.font = `600 ${fontSize}px ${fontFamily}`;
        ctx.fillText(el.value, el.x, el.y);
      } else if (el.type === 'stamp') {
        drawStampShape(ctx, el.stampId, el.x, el.y, el.color, el.size);
      }

      ctx.restore();
    });

    // Draw selection controls separately so they remain crisp.
    if (
      showSelection &&
      selectedIndex !== null &&
      elements[selectedIndex]
    ) {
      const el = elements[selectedIndex];
      const bounds = getElementBounds(el);
      const center = getTransformOrigin(el);
      const scale = el.scale ?? 1;
      const rotation = el.rotation ?? 0;
      const handles = getSelectionHandles(el);

      ctx.save();
      ctx.translate(center.x, center.y);
      ctx.rotate(rotation);
      ctx.scale(scale, scale);
      ctx.translate(-center.x, -center.y);

      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 1.5 / scale;
      ctx.setLineDash([]);
      ctx.strokeRect(
        bounds.left,
        bounds.top,
        bounds.right - bounds.left,
        bounds.bottom - bounds.top
      );
      ctx.restore();

      handles.corners.forEach((p) => {
        ctx.beginPath();
        ctx.rect(p.x - 5, p.y - 5, 10, 10);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      const topLeft = handles.corners[0];
      const topRight = handles.corners[1];
      const topMiddle = {
        x: (topLeft.x + topRight.x) / 2,
        y: (topLeft.y + topRight.y) / 2,
      };

      ctx.beginPath();
      ctx.moveTo(topMiddle.x, topMiddle.y);
      ctx.lineTo(handles.rotate.x, handles.rotate.y);
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 1.2;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(handles.rotate.x, handles.rotate.y, 7, 0, Math.PI * 2);
      ctx.fillStyle = '#FFFFFF';
      ctx.fill();
      ctx.strokeStyle = '#38BDF8';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [elements, currentEl, paperColor, paperSize, selectedIndex]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    renderCanvas(ctx);
  }, [renderCanvas]);

  // ==========================================
  // POINTER COORDINATES
  // ==========================================

  const getCoords = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();

    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;

    return {
      x: ((clientX - rect.left) / rect.width) * paperSize.w,
      y: ((clientY - rect.top) / rect.height) * paperSize.h,
    };
  };
  const updateTextFontFamily = (value) => {
    setTextFontFamily(value);
    setTextEditor((prev) => prev ? { ...prev, fontFamily: value } : prev);
  };

  const updateTextFontSize = (value) => {
    const nextSize = Number(value);
    setTextFontSize(nextSize);
    setTextEditor((prev) => prev ? { ...prev, fontSize: nextSize } : prev);
  };

  const commitText = (editor = textEditor) => {
    if (!editor) return;

    const value = editor.value.trim();

    if (value) {
      setElements((prev) => [
        ...prev,
        {
          type: 'text',
          x: editor.x,
          y: editor.y,
          value,
          color: editor.color,
          size: editor.size,
          fontFamily: editor.fontFamily || textFontFamily,
          fontSize: editor.fontSize || textFontSize,
          scale: 1,
          rotation: 0,
        },
      ]);
    }

    setTextEditor(null);
  };
  // ==========================================
  // ERASER
  // ==========================================

  const eraseBetween = (from, to) => {
    const screenRadius = brushSize * 3;

    setElements((prev) =>
      prev.flatMap((el) => {
        if (el.type !== 'stroke') {
          return [el];
        }

        const center = getTransformOrigin(el);
        const scale = el.scale ?? 1;
        const rotation = el.rotation ?? 0;

        // Pointer positions arrive in canvas/world coordinates.
        // Convert them into the stroke's original local coordinates
        // before cutting its stored points.
        const localFrom = inverseTransformPoint(
          from,
          center,
          scale,
          rotation
        );

        const localTo = inverseTransformPoint(
          to,
          center,
          scale,
          rotation
        );

        return eraseStroke(
          el,
          localFrom,
          localTo,
          screenRadius / scale
        );
      })
    );

    setSelectedIndex(null);
  };

  // ==========================================
  // OBJECT SELECTION
  // ==========================================

  const pointInsideElement = (point, el) => {
    const bounds = getElementBounds(el);
    const center = getTransformOrigin(el);

    const localPoint = inverseTransformPoint(
      point,
      center,
      el.scale ?? 1,
      el.rotation ?? 0
    );

    return (
      localPoint.x >= bounds.left - 5 &&
      localPoint.x <= bounds.right + 5 &&
      localPoint.y >= bounds.top - 5 &&
      localPoint.y <= bounds.bottom + 5
    );
  };

  const startObjectInteraction = (mode, index, point) => {
    const current = elements[index];
    const center = getTransformOrigin(current);

    // Store the origin on the element before transforming it.
    const original = {
      ...current,
      transformOrigin: center,
    };

    setElements((prev) =>
      prev.map((el, i) =>
        i === index ? original : el
      )
    );

    interactionRef.current = {
      mode,
      index,
      startPoint: point,
      original,
      center,
      startDistance: Math.max(
        1,
        Math.hypot(point.x - center.x, point.y - center.y)
      ),
      startAngle: Math.atan2(
        point.y - center.y,
        point.x - center.x
      ),
    };
  };

  // ==========================================
  // POINTER DOWN
  // ==========================================

  const handlePointerDown = (e) => {
    if (e.cancelable) e.preventDefault();

    const point = getCoords(e);
    const { x, y } = point;

    // Destructive eraser
    if (activeTool === 'rubber') {
      eraserActive.current = true;
      lastEraserPoint.current = point;
      eraseBetween(point, point);
      return;
    }

    // Fill paper
    if (activeTool === 'fill') {
      setPaperColor(inkColor);
      return;
    }

    // TEXT TOOL - Direct typing on canvas
    if (activeTool === 'text') {
      setSelectedIndex(null);

      setTextEditor({
        x,
        y,
        value: '',
        color: inkColor,
        size: brushSize,
        fontFamily: textFontFamily,
        fontSize: textFontSize,
      });

      return;
    }

    // Select / move / resize / rotate
    if (activeTool === 'move') {
      if (selectedIndex !== null && elements[selectedIndex]) {
        const el = elements[selectedIndex];
        const handles = getSelectionHandles(el);

        // Rotation handle
        if (Math.hypot(x - handles.rotate.x, y - handles.rotate.y) < 14) {
          startObjectInteraction('rotate', selectedIndex, point);
          return;
        }

        // Resize corner handles
        const nearCorner = handles.corners.some(
          (p) => Math.hypot(x - p.x, y - p.y) < 13
        );

        if (nearCorner) {
          startObjectInteraction('scale', selectedIndex, point);
          return;
        }

        // Move selected object
        if (pointInsideElement(point, el)) {
          startObjectInteraction('move', selectedIndex, point);
          return;
        }
      }

      // Select another object from topmost to bottommost
      for (let i = elements.length - 1; i >= 0; i--) {
        if (pointInsideElement(point, elements[i])) {
          setSelectedIndex(i);
          startObjectInteraction('move', i, point);
          return;
        }
      }

      setSelectedIndex(null);
      return;
    }

    // Rectangle tool
    if (activeTool === 'box' || activeTool === 'circle') {
      setSelectedIndex(null);

      setCurrentEl({
        type: activeTool,
        x,
        y,
        w: 0,
        h: 0,
        color: inkColor,
        size: brushSize,
        dashed,
        scale: 1,
        rotation: 0,
      });

      return;
    }

    // Freehand / AutoDraw pen
    setSelectedIndex(null);
    setCurrentEl({
      type: 'stroke',
      points: [{ x, y }],
      color: inkColor,
      size: brushSize,
      dashed,
      scale: 1,
      rotation: 0,
    });
  };

  // ==========================================
  // POINTER MOVE
  // ==========================================

  const handlePointerMove = (e) => {
    if (e.cancelable) e.preventDefault();

    const point = getCoords(e);

    // Continue erasing
    if (eraserActive.current) {
      if (lastEraserPoint.current) {
        eraseBetween(lastEraserPoint.current, point);
      }
      lastEraserPoint.current = point;
      return;
    }

    // Transform currently selected element
    const interaction = interactionRef.current;

    if (interaction) {
      const {
        mode,
        index,
        original,
        center,
        startPoint,
        startDistance,
        startAngle,
      } = interaction;

      setElements((prev) =>
        prev.map((el, i) => {
          if (i !== index) return el;

          if (mode === 'move') {
            // Use world-space pointer delta. moveElement also moves
            // transformOrigin, so rotated/scaled objects track correctly.
            return moveElement(
              original,
              point.x - startPoint.x,
              point.y - startPoint.y
            );
          }

          if (mode === 'scale') {
            const currentDistance = Math.hypot(
              point.x - center.x,
              point.y - center.y
            );

            const factor = currentDistance / startDistance;

            return {
              ...original,
              scale: Math.max(
                0.2,
                Math.min(5, (original.scale ?? 1) * factor)
              ),
            };
          }

          if (mode === 'rotate') {
            const currentAngle = Math.atan2(
              point.y - center.y,
              point.x - center.x
            );

            return {
              ...original,
              rotation:
                (original.rotation ?? 0) +
                currentAngle -
                startAngle,
            };
          }

          return el;
        })
      );

      return;
    }

    if (!currentEl) return;

    // Rectangle preview
    if (
        currentEl.type === 'box' ||
        currentEl.type === 'circle'
      ) {
        setCurrentEl((prev) => {
          const dx = point.x - prev.x;
          const dy = point.y - prev.y;

          if (prev.type === 'circle') {
            const size = Math.max(
              Math.abs(dx),
              Math.abs(dy)
            );

            return {
              ...prev,
              w: Math.sign(dx || 1) * size,
              h: Math.sign(dy || 1) * size,
            };
          }

          return {
            ...prev,
            w: dx,
            h: dy,
          };
        });
      }
      else {
      // Freehand preview
      setCurrentEl((prev) => ({
        ...prev,
        points: [...prev.points, point],
      }));
    }
  };

  // ==========================================
  // POINTER UP
  // ==========================================

  const handlePointerUp = () => {
    if (eraserActive.current) {
      eraserActive.current = false;
      lastEraserPoint.current = null;
      return;
    }

    if (interactionRef.current) {
      interactionRef.current = null;
      return;
    }

    if (!currentEl) return;

    if (
      (currentEl.type === 'box' || currentEl.type === 'circle') &&
      Math.abs(currentEl.w) < 2 &&
      Math.abs(currentEl.h) < 2
    ) {
      setCurrentEl(null);
      return;
    }

    setElements((prev) => [...prev, currentEl]);
    setCurrentEl(null);
  };

  // ==========================================
  // AUTODRAW STAMPS
  // ==========================================

  const handleSelectStamp = (stampId) => {
    setElements((prev) => {
      const last = prev[prev.length - 1];

      // If the user just sketched something with AutoDraw, replace that
      // sketch with the chosen suggestion at the sketch's actual location.
      if (
        activeTool === 'autodraw' &&
        last &&
        last.type === 'stroke' &&
        last.points?.length > 0
      ) {
        const xs = last.points.map((p) => p.x);
        const ys = last.points.map((p) => p.y);
        const cx = (Math.min(...xs) + Math.max(...xs)) / 2;
        const cy = (Math.min(...ys) + Math.max(...ys)) / 2;

        return [
          ...prev.slice(0, -1),
          {
            type: 'stamp', stampId, x: cx, y: cy,
            color: inkColor, size: brushSize, scale: 1, rotation: 0,
          },
        ];
      }

      // When adding icons directly from the top bar, fan them out around
      // the paper center so repeated clicks don't place every icon on top
      // of the previous one.
      const stampCount = prev.filter((el) => el.type === 'stamp').length;
      const columns = 4;
      const column = stampCount % columns;
      const row = Math.floor(stampCount / columns);
      const x = paperSize.w / 2 + (column - 1.5) * 82;
      const y = paperSize.h / 2 + (row - 1) * 82;
      const margin = 45;
      const clampedX = Math.max(margin, Math.min(paperSize.w - margin, x));
      const clampedY = Math.max(margin, Math.min(paperSize.h - margin, y));

      return [
        ...prev,
        {
          type: 'stamp', stampId, x: clampedX, y: clampedY,
          color: inkColor, size: brushSize, scale: 1, rotation: 0,
        },
      ];
    });

    setSelectedIndex(null);
  };

  // ==========================================
  // DOWNLOAD PNG
  // ==========================================

  const handleDownloadPng = () => {
    const exportCanvas = document.createElement('canvas');
    exportCanvas.width = paperSize.w;
    exportCanvas.height = paperSize.h;

    const ctx = exportCanvas.getContext('2d');

    // Export the artwork without selection handles.
    renderCanvas(ctx, false);

    const link = document.createElement('a');
    link.download = `drawegg-${Date.now()}.png`;
    link.href = exportCanvas.toDataURL('image/png');
    link.click();
  };

  // ==========================================
  // INFORMATION PAGES
  // ==========================================

  if (activePage !== 'board') {
    const handleBackToBoard = () => setActivePage('board');

    return (
      <div className="legal-view">
        {activePage === 'privacy' && (
          <PrivacyPolicy
            onBack={handleBackToBoard}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'terms' && (
          <TermsOfService
            onBack={handleBackToBoard}
            onNavigate={setActivePage}
          />
        )}

        {activePage === 'about' && (
          <AboutDrawEgg
            onBack={handleBackToBoard}
            onNavigate={setActivePage}
          />
        )}
      </div>
    );
  }

  // ==========================================
  // RENDER APPLICATION
  // ==========================================

  return (
    <div className="drawegg-shell">
      <TopBar
        activeTool={activeTool}
        setMenuOpen={setMenuOpen}
        handleSelectStamp={handleSelectStamp}
        paperColor={paperColor}
        setPaperColor={setPaperColor}
        handleDownloadPng={handleDownloadPng}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        textFontFamily={textFontFamily}
        setTextFontFamily={updateTextFontFamily}
        textFontSize={textFontSize}
        setTextFontSize={updateTextFontSize}
      />

      <SideDrawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        paperColor={paperColor}
        setPaperColor={setPaperColor}
        setPaperSize={setPaperSize}
        setElements={setElements}
        setCurrentEl={setCurrentEl}
        handleDownloadPng={handleDownloadPng}
        onNavigate={setActivePage}
      />

      <main className="workspace">
        <ToolRail
          activeTool={activeTool}
          setActiveTool={setActiveTool}
          inkColor={inkColor}
          setInkColor={setInkColor}
          onPickColor={handlePickColor}
          elements={elements}
          setElements={setElements}
          setCurrentEl={setCurrentEl}
        />

        <div
          className="paper-wrapper"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center center',
          }}
        >
          <canvas
            ref={canvasRef}
            width={paperSize.w}
            height={paperSize.h}
            className="paper-canvas"
            onMouseDown={handlePointerDown}
            onMouseMove={handlePointerMove}
            onMouseUp={handlePointerUp}
            onMouseLeave={handlePointerUp}
            onTouchStart={handlePointerDown}
            onTouchMove={handlePointerMove}
            onTouchEnd={handlePointerUp}
          />

          {textEditor && (
            <input
              ref={textInputRef}
              type="text"
              className="canvas-text-input"
              value={textEditor.value}
              onChange={(e) =>
                setTextEditor((prev) => ({
                  ...prev,
                  value: e.target.value,
                }))
              }
              onBlur={(e) => {
                // Keep the editor alive while choosing font controls in the top bar.
                if (e.relatedTarget?.closest?.('.topbar-text-controls')) return;
                commitText();
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  commitText();
                }
                if (e.key === 'Escape') {
                  setTextEditor(null);
                }
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              style={{
                left: textEditor.x,
                top: textEditor.y - (textEditor.fontSize || textFontSize),
                color: textEditor.color,
                fontFamily: textEditor.fontFamily || textFontFamily,
                fontSize: `${textEditor.fontSize || textFontSize}px`,
                width: `${Math.max(
                  120,
                  (textEditor.value.length + 1) *
                    (textEditor.fontSize || textFontSize) * 0.64
                )}px`,
              }}
              placeholder="Type here..."
              aria-label="Text on canvas"
            />
          )}
        </div>

        <BottomBar
          zoom={zoom}
          setZoom={setZoom}
          dashed={dashed}
          setDashed={setDashed}
          brushSize={brushSize}
          setBrushSize={setBrushSize}
        />
      </main>
    </div>
  );
}