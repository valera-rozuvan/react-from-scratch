import React from 'react';

interface IInputProps {
  placeholder: string;
  value: string;
  detailType: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, detailType: string) => void;
  disabled: boolean;
}

function Input({ placeholder, value, detailType, onChange, disabled }: IInputProps): React.ReactElement {
  const classes = `
    block
    w-full
    max-w-xs

    mt-2

    pr-4
    pl-4
    py-2

    text-sm
    font-normal
    shadow-xs
    text-gray-900

    bg-transparent
    border
    border-gray-300
    rounded-full
    placeholder-gray-400
    focus:outline-none
    leading-relaxed

    disabled:border-gray-200
    disabled:bg-gray-50
    disabled:text-gray-500
    disabled:shadow-none
    dark:disabled:border-gray-700
    dark:disabled:bg-gray-800/20
  `;

  return (
    <input
      type="text"
      className={classes}
      placeholder={placeholder}
      value={value}
      onChange={(event) => { onChange(event, detailType); }}
      disabled={disabled}
    />
  );
}

export default Input;
