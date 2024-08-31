import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type: "success" | "error" | "info";
  duration?: number;
  withRedirect?: boolean;
  redirectTo?: string;
};

const Toast = ({
  message,
  type,
  duration = 3000,
  withRedirect,
  redirectTo = "/",
}: ToastProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <aside
        className={`fixed bottom-4 end-4 z-50 flex flex-col gap-4 
            ${type === "info" && "bg-gray-200 text-gray-700"} 
            ${type === "success" && "bg-green-200 text-green-700"} 
            ${type === "error" && "bg-red-200 text-red-700"}
            ${isVisible ? "scale-100" : "scale-0"} 
            ${isVisible ? "opacity-100" : "opacity-0"} 
            rounded-lg px-5 py-3 transition-all duration-500 ease-in-out text-left`}
      >
        <p rel="noreferrer" className="text-sm font-medium">
          {message}
        </p>
        {withRedirect && (
          <p className="text-sm font-medium">Redirecting to {redirectTo}...</p>
        )}
      </aside>
    </>
  );
};

export default Toast;
