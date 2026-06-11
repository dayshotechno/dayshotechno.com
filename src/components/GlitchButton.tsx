import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { label: string };

export default function GlitchButton({ label, ...rest }: Props) {
  return (
    <button
      {...rest}
      className="switch-btn switch-btn--primary glitch-hover cursor-pointer"
    >
      &gt; {label}
    </button>
  );
}
