import React from "react";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = ({
  loading,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={loading}
      className="flex w-full items-center justify-center rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "Please wait..." : children}
    </button>
  );
};

export default Button;