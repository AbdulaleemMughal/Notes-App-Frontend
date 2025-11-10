import { Loader2 } from "lucide-react";

interface ButtonProps {
  text: string;
  type: "submit" | "reset" | "button";
  onClick: () => void;
  className?: string;
  loading?: boolean;
  loadingIconSize?: number;
}

export const Button = ({
  text,
  type,
  className,
  onClick,
  loading,
  loadingIconSize,
}: ButtonProps) => {
  return (
    <button
      type={type}
      disabled={loading}
      className={`py-2 px-2 bg-[#ff6608] flex justify-center ${className} ${
        loading ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      {loading ? (
        <Loader2 className="animate-spin" size={loadingIconSize || 33} />
      ) : (
        text
      )}
    </button>
  );
};
