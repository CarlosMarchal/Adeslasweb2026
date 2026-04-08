import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { TARIFAS_ADESLAS, PROVINCIAS_LISTA, obtenerTarifa } from '@/data/tarifasAdeslas';
import { Trash2, Plus } from 'lucide-react';

const TarificadorInterno: React.FC = () => {
  const [productoSeleccionado, setProductoSeleccionado] = useState<string>(
    Object.keys(TARIFAS_ADESLAS)[0]
  );
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string>(
    PROVINCIAS_LISTA[0]
  );
  const [edades, setEdades] = useState<number[]>([30]);

  // Calcular tarifas totales
  const { tarifas, total, descuento, totalConDescuento } = useMemo(() => {
    const tarifasIndividuales = edades.map((edad) =>
      obtenerTarifa(productoSeleccionado, provinciaSeleccionada, edad) || 0
    );

    const subtotal = tarifasIndividuales.reduce((a, b) => a + b, 0);
    const tieneDescuento = edades.length >= 4;
    const descuentoAplicado = tieneDescuento ? subtotal * 0.1 : 0;
    const totalFinal = subtotal - descuentoAplicado;

    return {
      tarifas: tarifasIndividuales,
      total: subtotal,
      descuento: descuentoAplicado,
      totalConDescuento: totalFinal,
    };
  }, [productoSeleccionado, provinciaSeleccionada, edades]);

  const agregarAsegurado = () => {
    setEdades([...edades, 30]);
  };

  const eliminarAsegurado = (index: number) => {
    if (edades.length > 1) {
      setEdades(edades.filter((_, i) => i !== index));
    }
  };

  const cambiarEdad = (index: number, newValue: string) => {
    const newEdades = [...edades];
    const edad = parseInt(newValue, 10);
    if (!isNaN(edad) && edad >= 0 && edad <= 120) {
      newEdades[index] = edad;
      setEdades(newEdades);
    }
  };

  const descuentoAplicado = edades.length >= 4;

  return (
    <>
    <Helmet>
      <title>Tarificador Interno Adeslas — Marchal Aseguradores</title>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Tarificador Adeslas
          </h1>
          <p className="text-slate-300">Herramienta interna para comerciales</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
            <h2 className="text-2xl font-bold text-white">
              Cálculo de Tarifas
            </h2>
          </div>

          <div className="p-8">
            {/* Selección de Producto */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Producto
              </label>
              <select
                value={productoSeleccionado}
                onChange={(e) => setProductoSeleccionado(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition"
              >
                {Object.entries(TARIFAS_ADESLAS).map(([id, producto]) => (
                  <option key={id} value={id}>
                    {producto.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Selección de Provincia */}
            <div className="mb-8">
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Provincia
              </label>
              <select
                value={provinciaSeleccionada}
                onChange={(e) => setProvinciaSeleccionada(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition"
              >
                {PROVINCIAS_LISTA.map((provincia) => (
                  <option key={provincia} value={provincia}>
                    {provincia}
                  </option>
                ))}
              </select>
            </div>

            {/* Asegurados */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-semibold text-slate-700">
                  Asegurados ({edades.length})
                </label>
                {descuentoAplicado && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-800">
                    ✓ Descuento 10% aplicado
                  </span>
                )}
              </div>

              {/* Lista de edades */}
              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {edades.map((edad, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 bg-slate-50 rounded-lg p-3 border border-slate-200">
                        <span className="text-sm font-medium text-slate-500 min-w-max">
                          Persona {index + 1}:
                        </span>
                        <input
                          type="number"
                          value={edad}
                          onChange={(e) => cambiarEdad(index, e.target.value)}
                          min="0"
                          max="120"
                          className="flex-1 px-3 py-2 border border-slate-300 rounded font-semibold text-slate-700 focus:border-blue-500 focus:outline-none bg-white"
                        />
                        <span className="text-sm font-medium text-slate-600">
                          años
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600 min-w-[80px]">
                        {tarifas[index]?.toFixed(2) || '0.00'}€
                      </div>
                    </div>
                    {edades.length > 1 && (
                      <button
                        onClick={() => eliminarAsegurado(index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                        title="Eliminar asegurado"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Botón agregar */}
              <button
                onClick={agregarAsegurado}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg font-semibold text-blue-600 transition"
              >
                <Plus size={20} />
                Agregar asegurado
              </button>
            </div>

            {/* Resumen */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-slate-700">
                  <span className="font-medium">Subtotal ({edades.length} personas):</span>
                  <span className="text-xl font-bold text-slate-900">
                    {total.toFixed(2)}€
                  </span>
                </div>

                {descuentoAplicado && (
                  <>
                    <div className="border-t border-slate-300"></div>
                    <div className="flex justify-between items-center text-red-600">
                      <span className="font-medium">Descuento 10%:</span>
                      <span className="text-xl font-bold">
                        -{descuento.toFixed(2)}€
                      </span>
                    </div>
                  </>
                )}

                <div
                  className={`border-t-2 pt-4 flex justify-between items-center ${
                    descuentoAplicado ? 'border-green-300' : 'border-slate-300'
                  }`}
                >
                  <span
                    className={`font-bold text-lg ${
                      descuentoAplicado ? 'text-green-700' : 'text-slate-900'
                    }`}
                  >
                    Total Mensual:
                  </span>
                  <span
                    className={`text-3xl font-bold ${
                      descuentoAplicado ? 'text-green-600' : 'text-slate-900'
                    }`}
                  >
                    {totalConDescuento.toFixed(2)}€
                  </span>
                </div>

                <p className="text-xs text-slate-600 mt-2">
                  Tarifa por mes. Con 4 o más asegurados se aplica descuento del
                  10% sobre el total.
                </p>
              </div>
            </div>

            {/* Info de acceso */}
            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
              <p className="font-semibold mb-1">📋 Información para comerciales:</p>
              <ul className="list-disc list-inside space-y-1 text-blue-700">
                <li>Esta herramienta es solo para uso interno</li>
                <li>Las tarifas son por persona y mes</li>
                <li>El descuento del 10% se aplica automáticamente con 4+ asegurados</li>
                <li>Todas las provincias están mapeadas a sus zonas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default TarificadorInterno;
