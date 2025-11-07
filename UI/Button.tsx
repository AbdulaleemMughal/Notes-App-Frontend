import { Loader2 } from "lucide-react";

interface ButtonProps {
  text: string;
  onClick: () => void;
  className?: string;
  loading?: boolean;
}

export const Button = ({ text, className, onClick, loading }: ButtonProps) => {
  return (
    <button
      disabled={loading}
      className={`py-2 bg-[#ff6608] flex justify-center ${className} ${
        loading ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      {loading ? <Loader2 className="animate-spin" size={33} /> : text}
    </button>
  );
};
