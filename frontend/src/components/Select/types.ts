type Option = {
  value: string;
  label: string;
};

export interface SelectProps {
  options: Option[];
  placeholder?: string;
  value?: string;
  onChange: (value: string) => void;
}
