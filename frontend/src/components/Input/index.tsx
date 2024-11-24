import { ChangeEvent } from "react";

interface InputFieldProps {
  label?: string;
  value?: string;
  name?: string;
  type?: string;
  min?: string;
  errorMessage?: string | undefined;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  type = "text",
  min,
  errorMessage,
  label,
  onChange = () => {},
  name = "",
  placeholder = "Digite aqui",
}) => {
  return (
    <label className="form-control mb-4">
      {label && (
        <div className="label">
          <span className="label-text mb-1">{label}</span>
        </div>
      )}
      <input
        type={type}
        name={name}
        min={min}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className="input input-bordered"
      />
      {errorMessage && (
        <div className="label">
          <span className="label-text text-xs text-red-500">{errorMessage}</span>
        </div>
      )}
    </label>
  );
};

export default InputField;
