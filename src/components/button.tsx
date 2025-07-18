import React from 'react';

interface IButtonProps {
  text: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
}

function Button({ text, onClick, disabled }: IButtonProps): React.ReactElement {
  const classes = `
    self-start

    text-white
    font-medium
    text-sm

    rounded-lg

    px-5
    py-2.5

    bg-blue-700
    hover:bg-blue-800

    dark:bg-blue-600
    dark:hover:bg-blue-700

    focus:ring-4
    focus:ring-blue-300
    focus:outline-none

    dark:focus:ring-blue-800

    disabled:border-gray-200
    disabled:bg-gray-50
    disabled:text-gray-500
    disabled:shadow-none
    dark:disabled:border-gray-700
    dark:disabled:bg-gray-800/20
  `;
  return (
    <button
      type="button"
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >{text}</button>
  );
}

export default Button;
