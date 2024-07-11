import { useState } from "react";
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import { HiCheck, HiChevronUpDown } from "react-icons/hi2";

import country from "@/data/country-abbr.json";

export default function SearchDropdown() {
  const [selected, setSelected] = useState({
    id: 1,
    name: "",
  });
  const [query, setQuery] = useState("");

  const filteredCountry =
    query === ""
      ? country
      : country.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="w-full cursor-pointer">
      <Combobox value={selected} onChange={() => setSelected}>
        <div className="relative">
          <div className="relative w-full overflow-hidden rounded text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300">
            <ComboboxInput
              className="px-3 py-2 border w-full focus:border-slate-300 flex-1 md:text-base bg-slate-100 focus:bg-slate-200 rounded focus:outline-none placeholder:text-slate-400"
              placeholder="Select a location"
              displayValue={(person: any) => person.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiChevronUpDown
                className="size-5 text-gray-400"
                aria-hidden="true"
              />
            </ComboboxButton>
          </div>
          <ComboboxOptions className="absolute max-h-60 w-full overflow-auto rounded bg-white py-1 ring-1 ring-black/5 focus:outline-none">
            {filteredCountry.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredCountry.map((person) => (
                <ComboboxOption
                  key={person.id}
                  className={({ focus }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      focus ? "bg-teal-600 text-white" : "text-gray-900"
                    }`
                  }
                  value={person}
                >
                  {({ selected, focus }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            focus ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <HiCheck className="size-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
