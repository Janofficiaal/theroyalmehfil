"use client";

import * as THREE from "three";

/**
 * Generates an ornate magenta-pink, metallic gold, and silver-crystal
 * Mughal floral/paisley filigree texture for a single door leaf.
 */
export function createOrnateDoorTexture(): THREE.CanvasTexture {
  const w = 512;
  const h = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;

  // Rich magenta-pink base gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, "#B8194E");
  grad.addColorStop(0.5, "#C9215A");
  grad.addColorStop(1, "#9E1240");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Subtle damask/velvet sheen
  for (let y = 0; y < h; y += 32) {
    ctx.fillStyle = "rgba(255, 220, 232, 0.03)";
    ctx.fillRect(0, y, w, 1);
  }

  // Outer gold double-border frame
  ctx.strokeStyle = "#E8D6A3";
  ctx.lineWidth = 10;
  ctx.strokeRect(22, 22, w - 44, h - 44);
  ctx.strokeStyle = "#D4AF5F";
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, w - 72, h - 72);

  // Helper to draw a lotus/crystal floral motif
  const drawFloralMedallion = (cx: number, cy: number, scale: number) => {
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(scale, scale);

    // Gold filigree ring
    ctx.strokeStyle = "#D4AF5F";
    ctx.lineWidth = 3;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      ctx.save();
      ctx.rotate(a);
      ctx.beginPath();
      ctx.moveTo(0, -18);
      ctx.quadraticCurveTo(18, -55, 0, -82);
      ctx.quadraticCurveTo(-18, -55, 0, -18);
      ctx.fillStyle = i % 2 === 0 ? "rgba(255, 248, 240, 0.85)" : "rgba(232, 214, 163, 0.78)";
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }

    // Center crystal rosette
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fillStyle = "#FFF8F0";
    ctx.fill();
    ctx.strokeStyle = "#D4AF5F";
    ctx.lineWidth = 4;
    ctx.stroke();

    ctx.restore();
  };

  // Helper to draw scrolling gold vine tendrils & crystal buds
  const drawScrollVine = (cx: number, startY: number, endY: number) => {
    const steps = 10;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const y = startY + (endY - startY) * t;
      const side = i % 2 === 0 ? 1 : -1;
      const xOff = Math.sin(t * Math.PI * 3) * 85 * side;

      ctx.strokeStyle = "#E8D6A3";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(cx, y - 24);
      ctx.quadraticCurveTo(cx + xOff, y, cx + xOff * 0.7, y + 26);
      ctx.stroke();

      // Crystal blossom
      ctx.beginPath();
      ctx.arc(cx + xOff * 0.75, y + 18, 9, 0, Math.PI * 2);
      ctx.fillStyle = "#FFF9F2";
      ctx.fill();
      ctx.strokeStyle = "#D4AF5F";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  };

  // Upper Arch Lotus Section
  drawScrollVine(w / 2, 110, 430);
  drawFloralMedallion(w / 2, 265, 1.15);

  // Corner gold filigree flourishes
  [
    [72, 85],
    [w - 72, 85],
    [72, h - 85],
    [w - 72, h - 85],
  ].forEach(([cx, cy]) => {
    drawFloralMedallion(cx, cy, 0.36);
  });

  // Lower Teardrop Paisley Cartouche
  ctx.save();
  ctx.translate(w / 2, 710);
  ctx.beginPath();
  ctx.moveTo(0, -180);
  ctx.bezierCurveTo(135, -70, 130, 120, 0, 185);
  ctx.bezierCurveTo(-130, 120, -135, -70, 0, -180);
  ctx.fillStyle = "rgba(130, 14, 52, 0.55)";
  ctx.fill();
  ctx.strokeStyle = "#E8D6A3";
  ctx.lineWidth = 7;
  ctx.stroke();
  ctx.restore();

  drawFloralMedallion(w / 2, 715, 0.95);
  drawScrollVine(w / 2, 540, 880);

  // Scattered silver-crystal sparkles
  for (let i = 0; i < 65; i++) {
    const px = 55 + ((Math.sin(i * 19.3) * 0.5 + 0.5) * (w - 110));
    const py = 60 + ((Math.cos(i * 31.7) * 0.5 + 0.5) * (h - 120));
    ctx.beginPath();
    ctx.arc(px, py, 2.5 + (i % 3), 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 250, 245, 0.85)";
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generates an ornate pink-and-gold Mughal Mandala carpet texture.
 */
export function createMandalaCarpetTexture(): THREE.CanvasTexture {
  const size = 1024;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const cx = size / 2;
  const cy = size / 2;

  ctx.clearRect(0, 0, size, size);

  // Outer scalloped pink-gold mandala silhouette
  const outerPetals = 16;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.beginPath();
  for (let i = 0; i < outerPetals; i++) {
    const a1 = (i / outerPetals) * Math.PI * 2;
    const aMid = ((i + 0.5) / outerPetals) * Math.PI * 2;
    const a2 = ((i + 1) / outerPetals) * Math.PI * 2;
    const rIn = 400;
    const rOut = 485;
    if (i === 0) ctx.moveTo(Math.cos(a1) * rIn, Math.sin(a1) * rIn);
    ctx.quadraticCurveTo(
      Math.cos(aMid) * rOut,
      Math.sin(aMid) * rOut,
      Math.cos(a2) * rIn,
      Math.sin(a2) * rIn
    );
  }
  ctx.closePath();
  const rad = ctx.createRadialGradient(0, 0, 30, 0, 0, 480);
  rad.addColorStop(0, "#E34B7D");
  rad.addColorStop(0.55, "#C21E56");
  rad.addColorStop(1, "#8A1038");
  ctx.fillStyle = rad;
  ctx.fill();
  ctx.strokeStyle = "#E8D6A3";
  ctx.lineWidth = 14;
  ctx.stroke();

  // Concentric gold & cream mandala rings
  [360, 290, 210, 130, 60].forEach((r, idx) => {
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.strokeStyle = idx % 2 === 0 ? "#E8D6A3" : "#D4AF5F";
    ctx.lineWidth = idx === 0 ? 10 : 5;
    ctx.stroke();
  });

  // Radial lotus petals
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    ctx.save();
    ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(0, -135);
    ctx.quadraticCurveTo(28, -220, 0, -285);
    ctx.quadraticCurveTo(-28, -220, 0, -135);
    ctx.fillStyle = i % 2 === 0 ? "rgba(255, 240, 220, 0.35)" : "rgba(212, 175, 95, 0.35)";
    ctx.fill();
    ctx.strokeStyle = "#E8D6A3";
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}
