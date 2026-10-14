"use client";

import {
  ReactNode,
  MouseEventHandler,
  useState,
  useSyncExternalStore,
} from "react";
import Link from "next/link";
import styles from "./Button.module.css";
import platformStyles from "./PlatformButton.module.css";
import { motion, useAnimate, AnimationOptions } from "motion/react";
import CornerArrow from "../icons/CornerArrow/CornerArrow";
import Plus from "../icons/Plus/Plus";
import DownloadIcon from "../DownloadIcon/DownloadIcon";
import Close from "../icons/Close/Close";
import Check from "../icons/Check/Check";
import Email from "../icons/Email/Email";
import RefundIcon from "../icons/RefundIcon/RefundIcon";
import FileIcon from "../icons/FileIcon/FileIcon";

interface Props {
  href?: string;
  text?: string;
  btnType: string;
  target?: "_blank" | "_self" | "_parent" | "_top";
  disabled?: boolean;
  children?: ReactNode;
  arrow?: boolean;
  refundIcon?: boolean;
  plus?: boolean;
  email?: boolean;
  downloadIcon?: boolean;
  closeIcon?: boolean;
  checkIcon?: boolean;
  fileIcon?: boolean;
  type?: "button" | "submit" | "reset";
  as?: "auto" | "button" | "span";
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

const transition: AnimationOptions = {
  type: "tween",
  duration: 0.35,
  ease: "easeOut",
};

// Text container with flip animation
const FlipText = ({ label }: { label: string }) => {
  return (
    <span className={styles.textContainer}>
      <span className={styles.srOnly}>{label}</span>
      <motion.span
        className={`text-primary ${styles.textPrimary}`}
        style={{ y: 0 }}
        aria-hidden='true'
      >
        {label}
      </motion.span>
      <motion.span
        className={`text-secondary ${styles.textSecondary}`}
        style={{ y: "-100%" }}
        aria-hidden='true'
      >
        {label}
      </motion.span>
    </span>
  );
};

// Generic icon slide component that works with any icon
const IconSlide = ({
  icon: Icon,
  className: iconClassName,
  containerClassName,
}: {
  icon: React.ComponentType<{ className?: string }>;
  className?: string;
  containerClassName?: string;
}) => {
  return (
    <span
      className={containerClassName || styles.arrowContainer}
      aria-hidden='true'
    >
      <span className={styles.arrowWrapper}>
        <motion.span
          className={`icon-primary ${styles.arrowPrimary}`}
          style={{ x: 0 }}
        >
          <Icon className={iconClassName} />
        </motion.span>
        <motion.span
          className={`icon-secondary ${styles.arrowSecondary}`}
          style={{ x: "-100%" }}
        >
          <Icon className={iconClassName} />
        </motion.span>
      </span>
    </span>
  );
};

// Detect hover capability without a hydration mismatch
function useSupportsHover() {
  const subscribe = (callback: () => void) => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    mediaQuery.addEventListener("change", callback);
    return () => mediaQuery.removeEventListener("change", callback);
  };

  const getSnapshot = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  // Default to true on the server (corrected on hydration)
  const getServerSnapshot = () => true;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function Button({
  href,
  text,
  btnType,
  target,
  disabled,
  children,
  arrow,
  refundIcon,
  closeIcon,
  fileIcon,
  plus,
  email,
  checkIcon,
  downloadIcon,
  type = "button",
  as = "auto",
  onClick,
}: Props) {
  const [scope, animate] = useAnimate();
  const [blocked, setBlocked] = useState(false);
  const supportsHover = useSupportsHover();

  const content = text || (typeof children === "string" ? children : null);
  const nonTextChildren = typeof children !== "string" ? children : null;

  // New marketing variants first; fall back to the platform variants.
  const variantClass = styles[btnType] ?? platformStyles[btnType] ?? "";
  const className = `${styles.btn} ${variantClass}`;

  const hoverStart = () => {
    if (!supportsHover) return;
    if (blocked) return;
    setBlocked(true);

    // Text: primary slides down and out, secondary comes in from the top
    animate(".text-primary", { y: "100%" }, transition).then(() => {
      animate(".text-primary", { y: 0 }, { duration: 0 }).then(() => {
        setBlocked(false);
      });
    });
    animate(".text-secondary", { y: "0%" }, transition).then(() => {
      animate(".text-secondary", { y: "-100%" }, { duration: 0 });
    });

    // Icons: primary slides right and out, secondary comes in from the left
    animate(".icon-primary", { x: "100%" }, transition).then(() => {
      animate(".icon-primary", { x: 0 }, { duration: 0 });
    });
    animate(".icon-secondary", { x: "0%" }, transition).then(() => {
      animate(".icon-secondary", { x: "-100%" }, { duration: 0 });
    });
  };

  const Inner = (
    <>
      {content && <FlipText label={content} />}
      {nonTextChildren}
      {arrow && (
        <IconSlide
          icon={CornerArrow}
          className={styles.arrow}
          containerClassName={styles.arrowContainer}
        />
      )}
      {plus && (
        <IconSlide
          icon={Plus}
          className={styles.optionalIcon}
          containerClassName={styles.plusContainer}
        />
      )}
      {downloadIcon && (
        <IconSlide
          icon={DownloadIcon}
          className={styles.optionalIcon}
          containerClassName={styles.plusContainer}
        />
      )}
      {closeIcon && (
        <IconSlide
          icon={Close}
          className={styles.optionalIcon}
          containerClassName={styles.plusContainer}
        />
      )}
      {checkIcon && (
        <IconSlide
          icon={Check}
          className={styles.optionalIcon}
          containerClassName={styles.plusContainer}
        />
      )}
      {email && (
        <IconSlide
          icon={Email}
          className={styles.optionalIcon}
          containerClassName={styles.plusContainer}
        />
      )}
      {refundIcon && (
        <IconSlide
          icon={RefundIcon}
          className={styles.optionalIcon}
          containerClassName={styles.plusContainer}
        />
      )}
      {fileIcon && (
        <IconSlide icon={FileIcon} className={styles.optionalIcon} />
      )}
    </>
  );

  if (as === "span") {
    return (
      <span ref={scope} className={className} onMouseEnter={hoverStart}>
        {Inner}
      </span>
    );
  }

  if (as === "button" || !href) {
    return (
      <button
        ref={scope}
        type={type}
        className={className}
        disabled={disabled}
        onClick={onClick}
        onMouseEnter={hoverStart}
      >
        {Inner}
      </button>
    );
  }

  return (
    <Link
      ref={scope}
      href={href}
      target={target}
      rel={target === "_blank" ? "noopener noreferrer" : undefined}
      className={className}
      onMouseEnter={hoverStart}
      onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
    >
      {Inner}
    </Link>
  );
}
