import { motion } from "framer-motion";
import { useEffect, useRef, ReactNode } from "react";

interface SpotlightButtonProps {
    children: ReactNode;
    className?: string;
}

export const SpotlightButton: React.FC<SpotlightButtonProps> = ({
    children,
    className = "",
}) => {
    const btnRef = useRef<HTMLButtonElement | null>(null);
    const spanRef = useRef<HTMLSpanElement | null>(null);

    useEffect(() => {
        const btn = btnRef.current;
        const span = spanRef.current;
        if (!btn || !span) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { width } = (e.target as HTMLElement).getBoundingClientRect();
            const offset = e.offsetX;
            const left = `${(offset / width) * 100}%`;
            span.animate({ left }, { duration: 250, fill: "forwards" });
        };

        const handleMouseLeave = () => {
            span.animate({ left: "50%" }, { duration: 100, fill: "forwards" });
        };

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            btn.removeEventListener("mousemove", handleMouseMove);
            btn.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <motion.button
            whileTap={{ scale: 0.985 }}
            ref={btnRef}
            className={`relative overflow-hidden rounded-lg px-4 py-3 text-lg font-medium text-white ${className}`}
        >
            <span className="pointer-events-none relative z-10 mix-blend-difference">
                {children}
            </span>
            <span
                ref={spanRef}
                className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-slate-100"
            />
        </motion.button>
    );
};

import { ButtonHTMLAttributes } from "react";

export interface ButtonWrapperProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

export const ButtonWrapper: React.FC<ButtonWrapperProps> = ({ children, className = "", ...props }) => (
    <div className="flex min-h-[200px] items-center justify-center bg-slate-800 px-4">
        <SpotlightButton className={className} {...props}>
            {children}
        </SpotlightButton>
    </div>
);
