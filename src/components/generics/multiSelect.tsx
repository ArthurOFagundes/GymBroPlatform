import React, { useState } from "react";
import Label from "./label/index.tsx";

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  label: string;
  name: string;
  options: Option[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({ label, name, options, selected, onChange }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (value: string) => {
    onChange([...selected, value]);
  };

  const handleRemove = (value: string) => {
    onChange(selected.filter((v) => v !== value));
  };

  // Opções que ainda não foram selecionadas
  const availableOptions = options.filter(opt => !selected.includes(opt.value));

  return (
    <div className="flex flex-col gap-2 mt-4 w-full relative">
      <Label htmlFor={name} text={label} />
      {/* Tags selecionadas */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selected.map((value) => {
          const opt = options.find(o => o.value === value);
          return (
            <span key={value} className="bg-blue-100 text-blue-700 px-2 py-1 rounded flex items-center gap-1">
              {opt?.label}
              <button
                type="button"
                className="ml-1 text-xs text-blue-700 hover:text-red-500"
                onClick={() => handleRemove(value)}
              >
                ×
              </button>
            </span>
          );
        })}
      </div>
      {/* Dropdown */}
      <div>
        <button
          type="button"
          className="border border-gray-300 rounded px-3 py-2 bg-white w-full text-left"
          onClick={() => setOpen(!open)}
        >
          {availableOptions.length > 0 ? "Selecionar..." : "Todas selecionadas"}
        </button>
        {open && availableOptions.length > 0 && (
          <div className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full shadow-lg">
            {availableOptions.map((opt) => (
              <div
                key={opt.value}
                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                onClick={() => {
                  handleSelect(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiSelect;