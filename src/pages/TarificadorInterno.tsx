import { useState, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { products, provinces, getPrice, getZoneFromProvince } from "@/data/pricing";

const FAMILY_DISCOUNT_THRESHOLD = 4;
const FAMILY_DISCOUNT_RATE = 0.1;

function getBandLabel(age: number): string {
  if (age <= 24) return "0-24";
  if (age <= 44) return "25-44";
  if (age <= 54) return "45-54";
  if (age <= 59) return "55-59";
  if (age <= 62) return "60-62";
  if (age <= 64) return "60-64";
  if (age <= 69) return "65-69";
  return "≥70";
}

export default function TarificadorInterno() {
  const [provincia, setProvincia] = useState<string>("Madrid");
  const [asegurados, setAsegurados] = useState<number[]>([35]);
  const [expandido, setExpandido] = useState<string | null>(null);

  const zona = getZoneFromProvince(provincia);
  const conDescuento = asegurados.length >= FAMILY_DISCOUNT_THRESHOLD;

  const resultados = useMemo(() => {
    return products.map((product) => {
      const subtotal = asegurados.reduce((sum, edad) => {
        const precio = getPrice(product, edad, zona);
        return sum + (precio ?? 0);
      }, 0);
      const descuento = conDescuento ? subtotal * FAMILY_DISCOUNT_RATE : 0;
      const total = subtotal - descuento;
      const preciosPorPersona = asegurados.map((edad) => ({
        edad,
        precio: getPrice(product, edad, zona) ?? 0,
        banda: getBandLabel(edad),
      }));
      return { product, subtotal, descuento, total, preciosPorPersona };
    });
  }, [asegurados, zona, conDescuento]);

  const addAsegurado = () => setAsegurados((prev) => [...prev, 30]);
  const removeAsegurado = (i: number) =>
    setAsegurados((prev) => prev.filter((_, idx) => idx !== i));
  const setEdad = (i: number, val: string) => {
    const n = parseInt(val, 10);
    if (!isNaN(n) && n >= 0 && n <= 99) {
      setAsegurados((prev) => prev.map((v, idx) => (idx === i ? n : v)));
    }
  };

  return (
    <>
      <Helmet>
        <title>Tarificador Interno · Adeslas 2026 — Marchal Aseguradores</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-[#f4f7fb]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#009DD9] to-[#0077aa] py-8 px-4 shadow-md">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                Tarificador Interno · Adeslas 2026
              </h1>
              <p className="text-blue-100 mt-1 text-sm">
                Herramienta para comerciales · No indexada en Google
              </p>
            </div>
            <div className="hidden md:block text-right text-white text-sm opacity-80">
              <p>Marchal Aseguradores</p>
              <p className="font-semibold">91 710 50 00</p>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">

          {/* Controles */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="grid md:grid-cols-2 gap-6">

              {/* Provincia */}
              <div>
                <label className="block text-sm font-semibold text-slate-600 mb-2">
                  Provincia
                </label>
                <select
                  value={provincia}
                  onChange={(e) => setProvincia(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#009DD9] text-slate-800 font-medium"
                >
                  {provinces.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-400 mt-1">Zona {zona} · {provincia}</p>
              </div>

              {/* Asegurados */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-slate-600">
                    Asegurados ({asegurados.length})
                  </label>
                  {conDescuento && (
                    <span className="text-xs font-bold px-2 py-1 bg-green-100 text-green-700 rounded-full">
                      ✓ Descuento 10%
                    </span>
                  )}
                </div>
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {asegurados.map((edad, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 w-16 shrink-0">
                        Persona {i + 1}
                      </span>
                      <input
                        type="number"
                        value={edad}
                        onChange={(e) => setEdad(i, e.target.value)}
                        min={0}
                        max={99}
                        className="w-20 px-3 py-2 border border-slate-200 rounded-lg text-center font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#009DD9]"
                      />
                      <span className="text-xs text-slate-400">años</span>
                      {asegurados.length > 1 && (
                        <button
                          onClick={() => removeAsegurado(i)}
                          className="ml-auto text-red-400 hover:text-red-600 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={addAsegurado}
                  className="mt-3 flex items-center gap-1 text-sm font-semibold text-[#009DD9] hover:text-[#0077aa] transition"
                >
                  <Plus size={16} /> Agregar asegurado
                </button>
              </div>
            </div>

            {!conDescuento && asegurados.length < FAMILY_DISCOUNT_THRESHOLD && (
              <p className="mt-4 text-xs text-slate-400 border-t pt-3">
                💡 Con {FAMILY_DISCOUNT_THRESHOLD - asegurados.length} asegurado{FAMILY_DISCOUNT_THRESHOLD - asegurados.length > 1 ? "s" : ""} más se aplica el 10% de descuento familiar
              </p>
            )}
          </div>

          {/* Tabla comparativa */}
          <div className="space-y-3">
            <h2 className="text-lg font-bold text-slate-700 px-1">
              Comparativa de productos
            </h2>

            {resultados
              .sort((a, b) => a.total - b.total)
              .map(({ product, subtotal, descuento, total, preciosPorPersona }) => (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden"
                >
                  {/* Fila principal */}
                  <div
                    className="flex items-center justify-between px-6 py-4 cursor-pointer hover:bg-slate-50 transition"
                    onClick={() =>
                      setExpandido(expandido === product.id ? null : product.id)
                    }
                  >
                    <div className="flex-1">
                      <p className="font-bold text-slate-800">{product.name}</p>
                      {conDescuento && (
                        <p className="text-xs text-slate-400 mt-0.5">
                          Subtotal {subtotal.toFixed(2)}€ · Descuento {descuento.toFixed(2)}€
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        {conDescuento && (
                          <p className="text-xs line-through text-slate-400">
                            {subtotal.toFixed(2)}€
                          </p>
                        )}
                        <p className={`text-2xl font-bold ${conDescuento ? "text-green-600" : "text-[#009DD9]"}`}>
                          {total.toFixed(2)}€
                        </p>
                        <p className="text-xs text-slate-400">/ mes</p>
                      </div>
                      {expandido === product.id
                        ? <ChevronUp size={18} className="text-slate-400" />
                        : <ChevronDown size={18} className="text-slate-400" />
                      }
                    </div>
                  </div>

                  {/* Desglose expandido */}
                  {expandido === product.id && (
                    <div className="border-t border-slate-100 px-6 py-4 bg-slate-50">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-slate-400 text-xs uppercase">
                            <th className="text-left font-semibold pb-2">Persona</th>
                            <th className="text-left font-semibold pb-2">Edad</th>
                            <th className="text-left font-semibold pb-2">Tramo</th>
                            <th className="text-right font-semibold pb-2">Prima</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {preciosPorPersona.map((p, i) => (
                            <tr key={i}>
                              <td className="py-2 text-slate-500">Persona {i + 1}</td>
                              <td className="py-2 font-semibold text-slate-700">{p.edad} años</td>
                              <td className="py-2 text-slate-500">{p.banda}</td>
                              <td className="py-2 text-right font-bold text-slate-800">
                                {p.precio.toFixed(2)}€
                              </td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t border-slate-200">
                            <td colSpan={3} className="pt-3 text-sm font-semibold text-slate-600">
                              Subtotal
                            </td>
                            <td className="pt-3 text-right font-bold text-slate-800">
                              {subtotal.toFixed(2)}€
                            </td>
                          </tr>
                          {conDescuento && (
                            <tr>
                              <td colSpan={3} className="py-1 text-sm text-green-600 font-semibold">
                                Descuento 10% (grupo familiar)
                              </td>
                              <td className="py-1 text-right text-green-600 font-bold">
                                -{descuento.toFixed(2)}€
                              </td>
                            </tr>
                          )}
                          <tr className="border-t-2 border-slate-300">
                            <td colSpan={3} className="pt-2 text-base font-bold text-slate-800">
                              Total mensual
                            </td>
                            <td className={`pt-2 text-right text-xl font-bold ${conDescuento ? "text-green-600" : "text-[#009DD9]"}`}>
                              {total.toFixed(2)}€
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>
                  )}
                </div>
              ))}
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-400 pb-4">
            Tarifas 2026 · Solo para uso interno · No compartir públicamente
          </p>
        </div>
      </div>
    </>
  );
}
