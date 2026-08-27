import Galaxy from "./Galaxy";

// Đặt Galaxy phủ toàn bộ portfolio, giữ canvas ở lớp nền để không chặn thao tác với nội dung.
export default function GalaxyBackground() {
  return (
    <div className="galaxy-background" aria-hidden="true">
      <Galaxy
        starSpeed={0.5}
        density={1}
        hueShift={140}
        speed={0.8}
        glowIntensity={0.42}
        saturation={0}
        mouseInteraction
        mouseRepulsion
        repulsionStrength={2}
        twinkleIntensity={0.42}
        rotationSpeed={0.06}
        transparent={false}
      />
    </div>
  );
}
