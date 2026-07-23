import type { SelectProps } from "./types";

import { SelectWrapper } from "./style";

const SelectCustom = ({ options, placeholder, value, onChange }: SelectProps) => {
  return (
    <SelectWrapper value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{placeholder || "Selecione uma opção"}</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </SelectWrapper>
  );
};

export default SelectCustom;
