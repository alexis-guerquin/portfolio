"use client";

import { useEffect, useRef, type ForwardRefExoticComponent, type RefAttributes } from "react";

type AnimateIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

type AnimateIconProps = {
  className?: string;
  color?: string;
  duration?: number;
  isAnimated?: boolean;
  size?: number;
};

type AnimateIconComponent = ForwardRefExoticComponent<AnimateIconProps & RefAttributes<AnimateIconHandle>>;

export default function LoopingAnimateIcon({ icon: Icon, duration = 1, ...props }: AnimateIconProps & { icon: AnimateIconComponent }) {
  const icon = useRef<AnimateIconHandle>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) return;

    const animate = () => icon.current?.startAnimation();
    animate();
    const interval = window.setInterval(animate, duration * 1000 + 600);

    return () => {
      window.clearInterval(interval);
      icon.current?.stopAnimation();
    };
  }, [duration]);

  return <Icon ref={icon} duration={duration} {...props} />;
}
