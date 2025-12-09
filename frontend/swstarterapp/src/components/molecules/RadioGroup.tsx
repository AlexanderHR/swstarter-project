import React from "react";
import { RadioButton } from "../atoms/RadioButton";

interface RadioGroupProps {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  legend?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  options,
  value,
  onChange,
  legend,
}) => {
  return (
    <fieldset className="flex items-center gap-8">
      <legend
        className={
          legend ? "text-sm font-semibold font-montserrat mb-5" : "sr-only"
        }
      >
        {legend || "Choose an option"}
      </legend>

      {options.map((option) => (
        <RadioButton
          key={option.value}
          name={name}
          label={option.label}
          value={option.value}
          checked={value === option.value}
          onChange={() => onChange(option.value)}
        />
      ))}
    </fieldset>
  );
};
