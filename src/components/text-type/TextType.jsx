import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import "./TextType.css";

// Tạo hiệu ứng gõ, xóa và chuyển câu bằng GSAP cho các tiêu đề cần chuyển động.
export default function TextType({
  text,
  texts,
  as: Component = "span",
  typingSpeed = 65,
  initialDelay = 0,
  pauseDuration = 1700,
  deletingSpeed = 35,
  loop = true,
  className = "",
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorClassName = "",
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed = false,
  variableSpeedMin = 55,
  variableSpeedMax = 105,
  startOnVisible = false,
  reverseMode = false,
  onSentenceComplete,
  ...props
}) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);

  const textArray = useMemo(() => {
    const value = text ?? texts ?? "";
    return Array.isArray(value) ? value : [value];
  }, [text, texts]);

  // Chờ component đi vào viewport trước khi bắt đầu hiệu ứng nếu được yêu cầu.
  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  // Dùng GSAP cho cursor nhấp nháy và hủy tween khi component bị unmount.
  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;

    gsap.set(cursorRef.current, { opacity: 1 });
    const tween = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    return () => tween.kill();
  }, [showCursor, cursorBlinkDuration]);

  // Điều khiển từng bước gõ/xóa và giữ khoảng nghỉ để câu mới không đổi quá nhanh.
  useEffect(() => {
    if (!isVisible || textArray.length === 0) return;

    let timeoutId;
    const currentText = String(textArray[currentTextIndex] ?? "");
    const processedText = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    if (isDeleting) {
      if (displayedText.length === 0) {
        if (!loop && currentTextIndex === textArray.length - 1) return;

        timeoutId = window.setTimeout(() => {
          onSentenceComplete?.(currentText, currentTextIndex);
          setCurrentTextIndex((index) => (index + 1) % textArray.length);
          setCurrentCharIndex(0);
          setIsDeleting(false);
        }, pauseDuration);
      } else {
        timeoutId = window.setTimeout(() => {
          setDisplayedText((value) => value.slice(0, -1));
        }, deletingSpeed);
      }
    } else if (currentCharIndex < processedText.length) {
      const speed = variableSpeed
        ? Math.random() * (variableSpeedMax - variableSpeedMin) + variableSpeedMin
        : typingSpeed;

      timeoutId = window.setTimeout(() => {
        setDisplayedText((value) => value + processedText[currentCharIndex]);
        setCurrentCharIndex((index) => index + 1);
      }, currentCharIndex === 0 ? speed + initialDelay : speed);
    } else if (textArray.length > 1 || loop) {
      timeoutId = window.setTimeout(() => setIsDeleting(true), pauseDuration);
    }

    return () => window.clearTimeout(timeoutId);
  }, [
    currentCharIndex,
    currentTextIndex,
    deletingSpeed,
    displayedText,
    initialDelay,
    isDeleting,
    isVisible,
    loop,
    onSentenceComplete,
    pauseDuration,
    reverseMode,
    textArray,
    typingSpeed,
    variableSpeed,
    variableSpeedMax,
    variableSpeedMin,
  ]);

  const currentColor = textColors.length
    ? textColors[currentTextIndex % textColors.length]
    : "inherit";
  const currentText = String(textArray[currentTextIndex] ?? "");
  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < currentText.length || isDeleting);

  return (
    <Component
      ref={containerRef}
      className={`text-type ${className}`}
      {...props}
    >
      <span className="text-type__content" style={{ color: currentColor }}>
        {displayedText}
      </span>
      {showCursor && (
        <span
          ref={cursorRef}
          className={`text-type__cursor ${cursorClassName} ${shouldHideCursor ? "text-type__cursor--hidden" : ""}`}
        >
          {cursorCharacter}
        </span>
      )}
    </Component>
  );
}
