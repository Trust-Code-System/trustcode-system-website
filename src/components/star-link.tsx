"use client";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import StarBorder from "./react-bits/StarBorder/StarBorder";
import { useExperienceMotion } from "./experience/motion-preferences";
type Props = Omit<ComponentProps<typeof Link>, "children" | "as"> & {
  children?: ReactNode;
  variant?: "solid" | "quiet";
};
export function StarLink({
  children,
  className = "",
  variant = "solid",
  ...props
}: Props) {
  const { enabled } = useExperienceMotion();
  const classes = `trustcode-star-link star-${variant} ${className}`;
  if (!enabled)
    return (
      <Link {...props} className={`${classes} star-fallback`}>
        {children}
      </Link>
    );
  return (
    <StarBorder
      as={Link}
      {...props}
      className={classes}
      color="#e2f0ff"
      trailColor="#6e9de6"
      duration={6}
      radius={9}
      thickness={1.1}
      trailLength={0.2}
      stars={1}
      glow={0.6}
      sparkle={false}
      hover="brighten"
      backgroundColor={variant === "quiet" ? "#0b1626" : "#10203a"}
      textColor="#e3edff"
      borderColor="#3b557b"
    >
      {children}
    </StarBorder>
  );
}
export function CardNavAnchor(props: Omit<ComponentProps<typeof Link>, "as">) {
  return props.className?.includes("card-nav__cta") ? (
    <StarLink {...props} />
  ) : (
    <Link {...props} />
  );
}
