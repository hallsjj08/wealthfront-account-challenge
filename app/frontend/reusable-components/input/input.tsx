import React, { ChangeEvent, InputHTMLAttributes, ReactNode, useState } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  onHandleChange?: (value: string) => void;
  PasswordScore?: ReactNode,
}

export function Input({ onHandleChange, label, error, PasswordScore, ...inputProps }: Props) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false)
  const id = label.replace(/ /gm, '_');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onHandleChange?.(event.target.value);
  }

  function handleFocus() {
    setFocused(true)
  }

  function handleSelectInput() {
    setFocused(false)
  }


  return (
    <div className='my-4'>
      <label className=" text-neutral-500 block text-sm mb-1">{label}</label>
      <div>
        <input
          {...inputProps}
          id={id}
          className={`block w-full p-1 border-b focus:outline-none focus:ring-2 rounded-md ${focused ? "[&:not(:placeholder-shown):not(:focus):invalid~span]:block invalid:[&:not(:placeholder-shown):not(:focus)]:border-red-400" : ""}`}
          value={value}
          onChange={handleChange}
          onBlur={handleFocus} 
          onFocus={handleSelectInput}
        />
        {PasswordScore}
        <span className='text-red-600 hidden text-xs'>{error}</span>
      </div>
    </div>
  );
}
