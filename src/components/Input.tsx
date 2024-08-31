type InputProps = {
  label?: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ label, type, placeholder, value, onChange }: InputProps) => {
  return (
    <div className="flex flex-col space-y-2">
      {label && (
        <label className="text-white" htmlFor={label}>
          {label}
        </label>
      )}
      <input
        type={type ?? "text"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="border rounded-md p-3 bg-transparent placeholder:text-white focus:outline-none focus:border-yellow-500 text-white text-sm"
      />
    </div>
  );
};

export default Input;
