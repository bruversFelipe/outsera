import type { ReactNode } from "react";

export interface ButtonProps {
  type?: "primary" | "default";
  htmlType?: "button" | "submit" | "reset";
  onClick?: () => void;
  children?: ReactNode;
  style?: React.CSSProperties;
  disabled?: boolean;
  className?: string;
}
