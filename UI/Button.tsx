interface ButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

export const Button = ({ text, className, onClick }: ButtonProps) => {
    return (
        <button className={`py-2 bg-[#ff6608] cursor-pointer ${className}`} onClick={onClick}>{text}</button>
    );
};