import { twJoin } from 'tailwind-merge'

interface ButtonProps {
  label?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label = "Enviar",
  onClick = () => {},
  className = "",
}) => {
  return (
    <button onClick={onClick} className={twJoin("btn btn-neutral", className)}>
      {label}
    </button>
  );
};

export default Button;
