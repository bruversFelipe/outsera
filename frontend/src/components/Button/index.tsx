import type { ButtonProps } from "./types";

import ButtonWrapper from "./style";

const Button = ({
  type = "primary",
  htmlType = "button",
  style,
  onClick,
  children,
  disabled,
  className,
}: ButtonProps) => (
  <ButtonWrapper
    type={htmlType}
    $type={type}
    onClick={onClick}
    style={style}
    disabled={disabled}
    className={className}
  >
    {children}
  </ButtonWrapper>
);

export default Button;
