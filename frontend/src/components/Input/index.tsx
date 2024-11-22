import { ChangeEvent } from "react";

interface InputFieldProps {
  label?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  label,
  onChange = () => {},
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
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        className="input input-bordered"
      />
    </label>
  );
};

export default InputField;