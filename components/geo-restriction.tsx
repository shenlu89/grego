import getUnicodeFlagIcon from "country-flag-icons/unicode";
import { BsXCircleFill } from "react-icons/bs";

import country from "@/data/country-abbr.json";
import { FormEvent, useCallback, useRef, useState } from "react";
import { HiMiniMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";
import { Controller } from "react-hook-form";

export default function GeoRestriction({ control, name }: any) {
  const searchInput = useRef<HTMLInputElement>(null);

  const [location, setLocation] = useState<string>("");
  const [countries, setCountries] = useState<any>([
    { name: "Worldwide", id: "WW" },
  ]);
  const [focused, setFocused] = useState(false);
  const filteredCountry = country.filter(
    (item: any) =>
      item.name.toLowerCase().includes(location.toLowerCase()) &&
      countries.filter((i: any) => i.name === item.name).length === 0
  );

  const clearSearch = (event: FormEvent) => {
    event.preventDefault();
    setLocation("");
    searchInput.current?.focus();
  };

  const addCountry = (item: any) => {
    if (countries.filter((i: any) => i.name === item.name).length === 0)
      setCountries([...countries, item]);
  };

  const deleteCountry = (item: any) => {
    setCountries((countries: any[]) =>
      countries.filter((i) => i.name !== item.name)
    );
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={countries}
      render={({ field: { onChange, value } }) => (
        <div className="relative">
          <div className="relative">
            <div
              className={`flex flex-wrap items-center w-full py-1 border border-slate-200 flex-1 bg-slate-100 ${
                focused && "ring-0 bg-slate-200"
              } rounded focus:outline-none placeholder:text-slate-400`}
            >
              {value.map((item: any) => (
                <button
                  key={item.id}
                  onClick={() => {
                    deleteCountry(item);
                    onChange(value.filter((i: any) => i.name !== item.name));
                  }}
                  className="px-2 py-1 text-sm bg-slate-50 hover:bg-slate-200 flex items-center space-x-1 ml-1 rounded-full border border-slate-400"
                >
                  <span>
                    {item.id === "WW" ? "🌐" : getUnicodeFlagIcon(item.id)}
                  </span>
                  <span>{item.name}</span>
                  <HiOutlineXMark className="size-4 text-slate-600" />
                </button>
              ))}
              <input
                ref={searchInput}
                value={location}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => setLocation(e.target.value)}
                className="px-3 py-1 w-full border-0 focus:ring-0 flex-1 bg-slate-100 focus:bg-slate-200 rounded focus:outline-none placeholder:text-slate-400"
                placeholder="Select a location..."
              />
              <BsXCircleFill
                onClick={clearSearch}
                className={`${
                  location || "hidden"
                } absolute top-1/2 transform translate-y-[-50%] right-3 md:size-5 size-5 text-slate-500 cursor-pointer hover:text-slate-900`}
              />
            </div>
            {focused && (
              <div
                onClick={() => {
                  setFocused(false);
                }}
                className={`absolute left-1/2 z-10 w-full -translate-x-1/2 overflow-hidden rounded border border-slate-200 mt-1`}
              >
                <ul className="bg-white max-h-40 overflow-y-auto">
                  {filteredCountry.length > 0 ? (
                    filteredCountry.map((item) => {
                      return (
                        <li
                          key={item.name}
                          onMouseDown={() => {
                            setLocation("");
                            addCountry(item);
                            onChange([...value, item]);
                          }}
                          className="px-3 py-2 cursor-pointer hover:bg-slate-100 space-x-2"
                        >
                          <span>
                            {item.id === "WW"
                              ? "🌐"
                              : getUnicodeFlagIcon(item.id)}
                          </span>
                          <span>{item.name}</span>
                        </li>
                      );
                    })
                  ) : (
                    <div className="flex px-3 py-2 justify-center space-x-2 items-center">
                      <HiMiniMagnifyingGlass className="w-8 h-8 p-2 bg-slate-100 rounded-full" />
                      <div className="space-x-1">
                        <span>No locations found for</span>
                        <span>
                          "<span className="font-bold">{location}</span>"
                        </span>
                      </div>
                    </div>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    />
  );
}
