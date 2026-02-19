import { CATEGORIES } from "../../data/categories";

export default function WasteCard({ code, percentage }) {
  const category = CATEGORIES[code];
  const isCritical = percentage >= category.alert;

  return (
    <div className="bg-white rounded-xl shadow p-3 flex flex-col justify-between h-full m-6">
      <div>
        <div className="flex justify-between items-start mb-1">
          <h2 className="font-bold text-gray-800 text-sm leading-tight uppercase tracking-tight mt-4 mx-4 px-4">
            {category.label}
          </h2>
          <span className="font-bold text-sm text-gray-700">
            {percentage}%
          </span>
        </div>

        <p className={`text-[10px] font-medium mb-3 ${category.text}`}>
          {isCritical ? "Crítico" : "Disponible"}
        </p>
      </div>

      <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden shadow-inner">
          <div className={`${category.color} h-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}>
          </div>
      </div>

      <button
        className={`w-lg py-2 rounded-lg text-black text-[11px] font-bold uppercase transition-colors
        ${isCritical ? "bg-red-500 active:bg-red-700" : "bg-green-500 active:bg-green-700"}`}
      >
        {isCritical ? "Urgente" : "Solicitar"}
      </button>
    </div>
  );
}
