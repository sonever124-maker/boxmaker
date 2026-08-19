import React from 'react';

interface InputGroupProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

const InputGroup: React.FC<InputGroupProps> = ({ label, value, onChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-gray-500">{label}</label>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          min={0}
          value={value === 0 ? '' : value}
          onChange={(e) => {
            const parsed = parseFloat(e.target.value);
            onChange(Number.isNaN(parsed) ? 0 : parsed);
          }}
          placeholder="0"
          className="w-full text-2xl font-black text-gray-900 bg-gray-50 border-2 border-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 focus:bg-white transition-colors placeholder:text-gray-300"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-300 pointer-events-none">
          mm
        </span>
      </div>
    </div>
  );
};

export default InputGroup;
