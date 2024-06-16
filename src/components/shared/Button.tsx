import { ButtonHTMLAttributes, FC, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children: ReactNode;
}

const Button: FC<ButtonProps> = ({
                                     type = 'submit',
                                     className = '',
                                     onClick,
                                     loading = false,
                                     children,
                                     ...props
                                 }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            className={className}
            disabled={loading}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
