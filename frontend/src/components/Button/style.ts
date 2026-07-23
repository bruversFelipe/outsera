import styled, { css } from "styled-components";

import type { ButtonProps } from "./types";

const variants = {
  default: css`
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    color: #000;
  `,
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: #fff;
  `,
};

interface StyledButtonProps {
  $type?: ButtonProps["type"];
}

const ButtonWrapper = styled.button<StyledButtonProps>`
  padding: 8px 10px;
  border-radius: 4px;
  cursor: pointer;

  ${({ $type = "default" }) => variants[$type]}
`;

export default ButtonWrapper;
