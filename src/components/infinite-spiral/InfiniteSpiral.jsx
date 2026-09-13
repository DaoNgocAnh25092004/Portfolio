import { useEffect, useMemo, useRef } from "react";
import "./InfiniteSpiral.css";

// Giới hạn một giá trị trong khoảng cho trước để giữ chuyển động trong biên an toàn.
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// Chuẩn hóa phần dư về số dương để các thẻ lặp vô hạn không bị khựng ở điểm đầu.
const modulo = (value, divisor) => ((value % divisor) + divisor) % divisor;

// Tạo đường cong easing mượt giúp opacity và độ mờ giảm tự nhiên ở rìa vòng xoắn.
const smoothstep = (min, max, value) => {
  const x = clamp((value - min) / (max - min || 1), 0, 1);
  return x * x * (3 - 2 * x);
};

// Dựng dải ảnh 3D xoắn vô hạn, hỗ trợ tự chạy, kéo chuột và dừng khi hover.
export default function InfiniteSpiral({
  items = [],
  speed = 0.55,
  direction = "up",
  animationMode = "auto",
  radius = 170,
  cardWidth = 100,
  cardHeight = 100,
  verticalSpacing = 60,
  perspective = 1000,
  cardsPerTurn = 7,
  rotation = 0,
  cardTilt = 0,
  cardRadius = 10,
  centerScale = 1.2,
  edgeFade = 0.3,
  edgeBlur = 6,
  pauseOnHover = true,
  imageFit = "cover",
  grayscale = 0,
  className = "",
}) {
  const rootRef = useRef(null);
  const cardRefs = useRef([]);
  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const autoSpeedRef = useRef(0);
  const hoveredRef = useRef(false);
  const visibleRef = useRef(true);
  const draggingRef = useRef(false);
  const lastPointerYRef = useRef(0);
  const dragMovedRef = useRef(false);

  // Chấp nhận cả chuỗi đường dẫn lẫn object để giữ API gọn khi thay bộ ảnh sau này.
  const normalizedItems = useMemo(
    () =>
      items.map((item, index) =>
        typeof item === "string"
          ? { src: item, alt: `Spiral image ${index + 1}` }
          : { alt: `Spiral image ${index + 1}`, ...item },
      ),
    [items],
  );

  // Đồng bộ vị trí các ảnh theo thời gian, viewport và tương tác chuột; dọn toàn bộ listener khi unmount.
  useEffect(() => {
    const root = rootRef.current;
    if (!root || normalizedItems.length === 0) return undefined;

    let frameId;
    let previousTime = performance.now();
    let bounds = root.getBoundingClientRect();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scrollEnabled = animationMode === "scroll" || animationMode === "all";
    const scrollSpeedMultiplier = Math.max(speed, 0) / 0.55;
    let lastScrollY = window.scrollY;

    const resizeObserver = new ResizeObserver(() => {
      bounds = root.getBoundingClientRect();
    });
    resizeObserver.observe(root);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting;
    });
    intersectionObserver.observe(root);

    // Lấy vận tốc cuộn làm mục tiêu chuyển động riêng khi animationMode cho phép.
    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      const scrollDelta = nextScrollY - lastScrollY;
      lastScrollY = nextScrollY;
      if (!scrollEnabled || !visibleRef.current || scrollDelta === 0) return;

      targetProgressRef.current += clamp(
        (scrollDelta * scrollSpeedMultiplier) / Math.max(verticalSpacing * 2, 1),
        -1.5,
        1.5,
      );
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Tính vị trí xoắn và độ sâu từng thẻ trên mỗi frame bằng giá trị easing.
    const render = (time) => {
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      const autoEnabled = animationMode === "auto" || animationMode === "all";
      const motionPaused = draggingRef.current || (pauseOnHover && hoveredRef.current);
      const directionMultiplier = direction === "down" ? -1 : 1;
      const desiredAutoSpeed =
        autoEnabled && visibleRef.current && !reducedMotion.matches && !motionPaused
          ? speed * directionMultiplier
          : 0;
      const speedBlend = 1 - Math.exp(-delta * 7);
      autoSpeedRef.current += (desiredAutoSpeed - autoSpeedRef.current) * speedBlend;
      targetProgressRef.current += autoSpeedRef.current * delta;

      const followBlend = 1 - Math.exp(-delta * (draggingRef.current ? 22 : 11));
      progressRef.current +=
        (targetProgressRef.current - progressRef.current) * followBlend;

      const count = normalizedItems.length;
      const half = count / 2;
      const width = Math.max(bounds.width, 1);
      const height = Math.max(bounds.height, 1);
      const fit = Math.min(1, width / (cardWidth * 2.8), height / (cardHeight * 2.35));
      const responsiveRadius = Math.min(radius, Math.max(72, width * 0.36)) * fit;
      const fadeStart = clamp(1 - edgeFade, 0, 0.98);
      const turnSize = Math.max(cardsPerTurn, 1);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const offset = modulo(index - progressRef.current + half, count) - half;
        const edge = Math.min(Math.abs(offset) / Math.max(half, 1), 1);
        const opacity = 1 - smoothstep(fadeStart, 1, edge);
        const focus = 1 - Math.min(Math.abs(offset) / Math.max(turnSize * 0.65, 1), 1);
        const scale = (1 + (centerScale - 1) * focus) * fit;
        const angle = offset * (360 / turnSize) + rotation;
        const angleRadians = (angle * Math.PI) / 180;
        const x = Math.sin(angleRadians) * responsiveRadius;
        const z = Math.cos(angleRadians) * responsiveRadius;
        const depthScale = clamp(perspective / Math.max(perspective - z, 1), 0.72, 1.45);
        const visualScale = scale * depthScale;
        const depth = (z / Math.max(responsiveRadius, 1) + 1) / 2;
        const blur = edgeBlur * smoothstep(0.35, 1, edge);

        card.style.transform = `translate(-50%, -50%) translate3d(${x}px, ${offset * verticalSpacing * fit}px, ${z}px) rotateZ(${cardTilt}deg) scale(${visualScale})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.filter = blur > 0.01 ? `blur(${blur.toFixed(2)}px)` : "none";
        card.style.zIndex = String(Math.round(depth * 100000) + index);
        card.style.pointerEvents = opacity > 0.25 ? "auto" : "none";
      });

      frameId = requestAnimationFrame(render);
    };

    frameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [
    normalizedItems,
    speed,
    direction,
    animationMode,
    radius,
    perspective,
    cardWidth,
    cardHeight,
    verticalSpacing,
    cardsPerTurn,
    rotation,
    cardTilt,
    centerScale,
    edgeFade,
    edgeBlur,
    pauseOnHover,
  ]);

  const dragEnabled = animationMode === "drag" || animationMode === "all";

  // Dừng kéo và nhả pointer capture để thẻ không mắc ở trạng thái grabbing.
  const stopDragging = (event) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.currentTarget.style.cursor = dragEnabled ? "grab" : "default";
  };

  // Bắt đầu kéo chỉ bằng nút chuột chính khi chế độ drag đang bật.
  const handlePointerDown = (event) => {
    if (!dragEnabled || event.button !== 0) return;
    draggingRef.current = true;
    dragMovedRef.current = false;
    lastPointerYRef.current = event.clientY;
    targetProgressRef.current = progressRef.current;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.style.cursor = "grabbing";
  };

  // Cập nhật tiến trình theo quãng kéo dọc mà không phụ thuộc tốc độ sự kiện pointer.
  const handlePointerMove = (event) => {
    if (!draggingRef.current) return;
    const pointerDelta = event.clientY - lastPointerYRef.current;
    lastPointerYRef.current = event.clientY;
    if (Math.abs(pointerDelta) > 0.5) dragMovedRef.current = true;
    targetProgressRef.current -= pointerDelta / Math.max(verticalSpacing, 1);
  };

  // Chặn mở ảnh/link ngoài ý muốn nếu thao tác click thực ra là một lần kéo.
  const handleClickCapture = (event) => {
    if (!dragMovedRef.current) return;
    event.preventDefault();
    event.stopPropagation();
    dragMovedRef.current = false;
  };

  // Gắn từng node ảnh vào ref để vòng animation cập nhật trực tiếp, tránh render React mỗi frame.
  const setCardRef = (node, index) => {
    cardRefs.current[index] = node;
  };

  // Tạo các thẻ ảnh và giữ object-position riêng để bạn thay từng ảnh sau này dễ hơn.
  const renderedCards = normalizedItems.map((item, index) => {
    const Card = item.href ? "a" : "div";

    return (
      <Card
        key={item.id ?? `${item.src}-${index}`}
        ref={(node) => setCardRef(node, index)}
        className="infinite-spiral__card"
        style={{ width: cardWidth, height: cardHeight, borderRadius: cardRadius }}
        href={item.href}
        target={item.target}
        rel={item.target === "_blank" ? "noreferrer" : undefined}
        role="listitem"
        aria-label={item.label ?? item.alt}
      >
        <img
          className="infinite-spiral__image"
          src={item.src}
          alt={item.alt}
          loading={index < 6 ? "eager" : "lazy"}
          draggable={false}
          style={{
            width: cardWidth,
            height: cardHeight,
            objectFit: imageFit,
            objectPosition: item.objectPosition ?? "center",
            filter: `grayscale(${clamp(grayscale, 0, 1)})`,
          }}
        />
      </Card>
    );
  });

  // Theo dõi hover riêng để tạm dừng chuyển động mà không chặn thao tác cuộn trang.
  const handleMouseEnter = () => {
    hoveredRef.current = true;
  };

  // Khôi phục chuyển động tự động ngay khi con trỏ rời khỏi vùng gallery.
  const handleMouseLeave = () => {
    hoveredRef.current = false;
  };

  return (
    <div
      ref={rootRef}
      className={`infinite-spiral ${className}`.trim()}
      style={{
        perspective: `${perspective}px`,
        "--spiral-width": `${cardWidth}px`,
        "--spiral-height": `${cardHeight}px`,
        "--spiral-radius": `${cardRadius}px`,
        cursor: dragEnabled ? "grab" : "default",
        touchAction: dragEnabled ? "pan-x" : "auto",
        userSelect: dragEnabled ? "none" : "auto",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={stopDragging}
      onPointerCancel={stopDragging}
      onLostPointerCapture={stopDragging}
      onClickCapture={handleClickCapture}
    >
      <div className="infinite-spiral__track" role="list" aria-label="Skill image spiral">
        {renderedCards}
      </div>
    </div>
  );
}
