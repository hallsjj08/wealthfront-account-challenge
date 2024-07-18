import React, { ChangeEvent, useState } from 'react';

interface Props {
  name: string,
  label: string;
  onChange?: (value: string) => void;
}

export function Input({ onChange, label, name }: Props) {
  const [value, setValue] = useState('');
  const id = label.replace(/ /gm, '_');

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event.target.value);
  }
  return (
    <div>
      <label className="block text-sm">{label}</label>
      <input
        id={id}
        name={name}
        className="block w-full p-2 border-4 border-solid border-slate-300"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
