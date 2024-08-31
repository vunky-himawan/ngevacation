import useResizeTextArea from "@/hooks/useResizeTextArea";
import { useRef } from "react";

type TextAreaProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  label?: string;
  style?: string;
  styleLabel?: string;
  name: string;
};

const defaultStyles = {
  label: "block text-sm font-medium text-gray-700",
  textarea:
    "block w-full sm:text-sm" +
    " p-2.5 h-28 overflow-auto resize-none focus:outline-none",
};

export function Textarea({
  placeholder = "",
  name,
  value = "",
  onChange,
  label,
  style,
  styleLabel,
}: TextAreaProps) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useResizeTextArea(textAreaRef.current, value);

  return (
    <>
      {label && (
        <label
          className={styleLabel || defaultStyles.label}
          htmlFor="textarea-id"
        >
          {label}
        </label>
      )}
      <textarea
        ref={textAreaRef}
        id="textarea-id"
        className={style || defaultStyles.textarea}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        name={name}
        required
      />
    </>
  );
}
