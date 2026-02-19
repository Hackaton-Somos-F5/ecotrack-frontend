export default function NextPickupCard() {
  return (
    <div className="bg-gray-900 text-white rounded-xl p-4 mt-4 flex justify-between items-center">
      <div>
        <p className="text-xs text-green-400 font-semibold">
          PRÓXIMA RECOGIDA PROGRAMADA
        </p>
        <p className="font-bold mt-1">
          Mañana, 08:50 AM
        </p>
        <p className="text-xs text-gray-300">
          Ruta: Sector Escolar
        </p>
      </div>

      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-xl">
        +
      </div>
    </div>
  );
}
