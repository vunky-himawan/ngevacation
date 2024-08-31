type ButtonProps = {
  children?: React.ReactNode;
  type?: "primary" | "secondary";
  action?: "button" | "submit";
  onClick?: () => void;
};

const Button = ({
  children,
  type = "primary",
  action = "button",
  onClick,
}: ButtonProps) => {
  return (
    <button type={action} onClick={onClick}>
      <div
        className={`${
          type === "primary" ? "bg-yellow-600" : "bg-gray-300"
        } text-white rounded-md px-6 py-2 font-medium hover:bg-yellow-400`}
      >
        {children}
      </div>
    </button>
  );
};

export default Button;
