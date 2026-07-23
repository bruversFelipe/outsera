import type { InputProps } from "./types";

import InputWrapper from "./style";

const Input = ({ value, onChange, placeholder, style, type }: InputProps) => {
  return (
    <InputWrapper
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      style={style}
    />
  );
};

export default Input;
