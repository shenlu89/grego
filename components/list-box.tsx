import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { HiCheck, HiChevronDown } from "react-icons/hi2";
import { useState } from "react";
import { Controller } from "react-hook-form";

const jobTypes = [
  { name: "full-time" },
  { name: "part-time" },
  { name: "contractor" },
  { name: "temporary" },
  { name: "internship" },
];

export default function ListBox({ control, name }: any) {
  const [selected, setSelected] = useState(jobTypes[0]);

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={selected.name}
      render={({ field: { onChange, value } }) => (
        <Listbox
          value={jobTypes.find((job) => job.name === value)}
          onChange={(val) => {
            setSelected(val);
            onChange(val.name);
          }}
        >
          <ListboxButton
            className={
              "relative block w-full capitalize rounded border bg-slate-100 px-3 py-2 text-left focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-white/25"
            }
          >
            {selected.name}
            <HiChevronDown
              className="absolute text-slate-400 top-1/2 transform translate-y-[-50%] right-3 size-5 "
              aria-hidden="true"
            />
          </ListboxButton>
          <ListboxOptions
            anchor="bottom"
            className="w-[var(--button-width)] capitalize rounded border bg-white focus:outline-none mt-1"
          >
            {jobTypes.map((type) => (
              <ListboxOption
                key={type.name}
                value={type}
                className="flex group px-3 py-2 justify-between cursor-pointer hover:bg-slate-100 space-x-2"
              >
                <span>{type.name}</span>
                <HiCheck className="invisible size-5 text-green-500 group-data-[selected]:visible" />
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Listbox>
      )}
    />
  );
}
