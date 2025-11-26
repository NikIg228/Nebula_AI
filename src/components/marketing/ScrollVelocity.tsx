"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import {
  CSSProperties,
  RefObject,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./ScrollVelocity.css";

type VelocityTextProps = {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: RefObject<HTMLElement | null>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: {
    input: [number, number];
    output: [number, number];
  };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: CSSProperties;
  scrollerStyle?: CSSProperties;
  lockDirection?: boolean;
  disableScrollSync?: boolean;
};

type ScrollVelocityProps = {
  scrollContainerRef?: RefObject<HTMLElement | null>;
  texts: string[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: {
    input: [number, number];
    output: [number, number];
  };
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: CSSProperties;
  scrollerStyle?: CSSProperties;
  lockDirection?: boolean;
  disableScrollSync?: boolean;
  direction?: "ltr" | "rtl";
  alternateDirections?: boolean;
};

function useElementWidth(ref: RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }

    updateWidth();
    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, [ref]);

  return width;
}

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  const mod = (((value - min) % range) + range) % range;
  return mod + min;
}

function VelocityText({
  children,
  baseVelocity,
  scrollContainerRef,
  className = "",
  damping,
  stiffness,
  numCopies = 6,
  velocityMapping,
  parallaxClassName = "parallax",
  scrollerClassName = "scroller",
  parallaxStyle,
  scrollerStyle,
  lockDirection = false,
  disableScrollSync = false,
}: VelocityTextProps) {
  const baseX = useMotionValue(0);
  const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};

  const { scrollY } = useScroll(scrollOptions);
  const scrollVelocity = useVelocity(scrollY);

  const smoothVelocity = useSpring(scrollVelocity, {
    damping: damping ?? 50,
    stiffness: stiffness ?? 400,
  });

  const inputRange = velocityMapping?.input ?? [0, 1000];
  const outputRange = disableScrollSync
    ? [0, 0]
    : velocityMapping?.output ?? [0, 5];

  const velocityFactor = useTransform(
    smoothVelocity,
    inputRange,
    outputRange,
    { clamp: false }
  );

  const copyRef = useRef<HTMLSpanElement | null>(null);
  const copyWidth = useElementWidth(copyRef);

  const initialDirection = useMemo(() => {
    const sign = Math.sign(baseVelocity);
    return sign === 0 ? 1 : sign;
  }, [baseVelocity]);

  const directionFactor = useRef(initialDirection);

  useLayoutEffect(() => {
    directionFactor.current = initialDirection;
  }, [initialDirection]);

  useLayoutEffect(() => {
    if (copyWidth === 0) return;
    if (baseVelocity < 0) {
      baseX.set(copyWidth);
    } else if (baseVelocity > 0) {
      baseX.set(-copyWidth);
    }
  }, [baseVelocity, copyWidth, baseX]);

  useAnimationFrame((_, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    const factor = velocityFactor.get() as number;

    if (!lockDirection) {
      if (factor < 0) {
        directionFactor.current = -1;
      } else if (factor > 0) {
        directionFactor.current = 1;
      }
    }

    moveBy += directionFactor.current * moveBy * factor;

    baseX.set(baseX.get() + moveBy);
  });

  const [wrapStart, wrapEnd] = useMemo(() => {
    if (baseVelocity < 0) {
      return [0, copyWidth || 0];
    }
    return [-copyWidth || 0, 0];
  }, [baseVelocity, copyWidth]);

  const x = useTransform(baseX, (value) => {
    if (copyWidth === 0) return "0px";
    return `${wrap(wrapStart, wrapEnd, value)}px`;
  });

  const spans = useMemo(() => {
    return new Array(numCopies).fill(null).map((_, index) => (
      <span
        className={className}
        key={index}
        ref={index === 0 ? copyRef : null}
      >
        {children}
      </span>
    ));
  }, [children, className, numCopies]);

  return (
    <div className={parallaxClassName} style={parallaxStyle}>
      <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
        {spans}
      </motion.div>
    </div>
  );
}

export default function ScrollVelocity({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = "",
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = "parallax",
  scrollerClassName = "scroller",
  parallaxStyle,
  scrollerStyle,
  lockDirection = false,
  disableScrollSync = false,
  direction = "ltr",
  alternateDirections = true,
}: ScrollVelocityProps) {
  const baseDirectionMultiplier = direction === "rtl" ? -1 : 1;
  const normalizedVelocity = Math.abs(velocity);

  return (
    <div className="w-full">
      {texts.map((text, index) => (
        <VelocityText
          key={`${text}-${index}`}
          baseVelocity={
            alternateDirections
              ? (index % 2 !== 0 ? -normalizedVelocity : normalizedVelocity) *
                baseDirectionMultiplier
              : normalizedVelocity * baseDirectionMultiplier
          }
          scrollContainerRef={scrollContainerRef}
          className={className}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
          lockDirection={lockDirection}
          disableScrollSync={disableScrollSync}
        >
          {text}&nbsp;
        </VelocityText>
      ))}
    </div>
  );
}

