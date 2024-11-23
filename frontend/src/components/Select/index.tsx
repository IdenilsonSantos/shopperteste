import { ChangeEvent } from "react";

interface Option {
  label: string;
  value: string | number;
}

interface InputFieldProps {
  label?: string;
  value?: string;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  options: Option[];
}

const SelectInputField: React.FC<InputFieldProps> = ({
  value = "",
  label,
  name = "",
  onChange = () => {},
  placeholder = "Selecione",
  options = [],
}) => {
  return (
    <label className="form-control mb-4">
      {label && (
        <div className="label">
          <span className="label-text mb-1">{label}</span>
        </div>
      )}
      <select
        className="select select-bordered"
        onChange={onChange}
        value={value}
        name={name}
      >
        <option value="">
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default SelectInputField;
