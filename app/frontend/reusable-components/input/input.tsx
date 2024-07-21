import React, { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react';

interface Props {
  name: string,
  label: string;
  type?: HTMLInputTypeAttribute
  required?: boolean,
  onChange?: (value: string) => void;
}

export function Input({ onChange, label, name, type, required=false }: Props) {
  const [value, setValue] = useState('');
  const id = label.replace(/ /gm, '_');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event.target.value);
  }

  return (
    <div className='my-4'>
      <label className=" text-neutral-500 block text-sm mb-1">{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        className="block w-full p-1 border-b focus:outline-none focus:ring-2 rounded-md"
        value={value}
        required={required}
        onChange={handleChange}
      />
    </div>
  );
}
