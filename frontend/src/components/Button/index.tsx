import React from "react";

interface ButtonProps {
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label = "Enviar",
  onClick = () => {},
  className = "btn btn-neutral",
}) => {
  return (
    <button onClick={onClick} className={className}>
      {label}
    </button>
  );
};

export default Button;
