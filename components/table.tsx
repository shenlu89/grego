import React from "react";

const GRETableRow = ({ number, type, prompt, isEven }: any) => {
  return (
    <tr className={`border-b border-slate-400 ${isEven ? "bg-slate-100" : ""}`}>
      <td className="py-3 px-6 font-medium">{type}</td>
      <td className="py-3 px-6">{number}</td>
      <td className="py-3 px-6">{(number * 100 / 158).toFixed(1)}%</td>
      <td className="py-3 px-6">{prompt}</td>
    </tr>
  );
};

const GRETable = ({ data }: any) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-slate-400 rounded-lg">
        <thead>
          <tr className="text-slate-800 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Type</th>
            <th className="py-3 px-6 text-left">Number</th>
            <th className="py-3 px-6 text-left">Percent</th>
            <th className="py-3 px-6 text-left">Instructions</th>
          </tr>
        </thead>
        <tbody className="text-slate-800 text-sm">
          {data.map((item: { number: any; }, index: number) => (
            <GRETableRow key={item.number} {...item} isEven={index % 2 === 1} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GRETable;