export default function ServiceSection() {
  return (
    <>
      <h3 className="font-semibold text-gray-700 mt-6">
        Gestión con la Empresa
      </h3>

      <div className="grid grid-cols-2 gap-3 mt-3">
        <div className="bg-green-100 p-4 rounded-xl text-center shadow-sm">
          <p className="text-sm font-medium">
            Contactar Proveedor
          </p>
        </div>
        <div className="bg-gray-100 p-4 rounded-xl text-center shadow-sm">
          <p className="text-sm font-medium">
            Historial de Servicios
          </p>
        </div>
      </div>
       </>
  );
}