'use client';

import React, { useState, useMemo, useRef } from 'react';
import { TARIFAS_ADESLAS, PROVINCIAS_LISTA, obtenerTarifa } from '@/data/tarifasAdeslas';
import { Trash2, Plus, FileDown, Star } from 'lucide-react';

const TarificadorInterno: React.FC = () => {
  const [productoSeleccionado, setProductoSeleccionado] = useState<string>(
    Object.keys(TARIFAS_ADESLAS)[0]
  );
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState<string>(
    PROVINCIAS_LISTA[0]
  );
  const [edades, setEdades] = useState<number[]>([30]);
  const [includePuntos, setIncludePuntos] = useState<boolean>(true);
  const printRef = useRef<HTMLDivElement>(null);

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

  const descuentoAplicado = edades.length >= 4;
  const productoNombre = TARIFAS_ADESLAS[productoSeleccionado]?.nombre || productoSeleccionado;
  const fechaHoy = new Date().toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

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

  const handleGenerarPDF = () => {
    window.print();
  };

  return (
    <>
      {/* ── Estilos de impresión ── */}
      <style>{`
        @media print {
          body > *:not(#print-root) { display: none !important; }
          #print-root { display: block !important; }
          @page { margin: 20mm 15mm; size: A4 portrait; }
        }
        @media screen {
          #print-root { display: none; }
        }
      `}</style>

      {/* ── Vista pantalla ── */}
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Tarificador Adeslas</h1>
            <p className="text-slate-300">Herramienta interna para comerciales</p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
              <h2 className="text-2xl font-bold text-white">Cálculo de Tarifas</h2>
            </div>

            <div className="p-8">
              {/* Producto */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Producto</label>
                <select
                  value={productoSeleccionado}
                  onChange={(e) => setProductoSeleccionado(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition"
                >
                  {Object.entries(TARIFAS_ADESLAS).map(([id, producto]) => (
                    <option key={id} value={id}>{producto.nombre}</option>
                  ))}
                </select>
              </div>

              {/* Provincia */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-700 mb-3">Provincia</label>
                <select
                  value={provinciaSeleccionada}
                  onChange={(e) => setProvinciaSeleccionada(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 transition"
                >
                  {PROVINCIAS_LISTA.map((provincia) => (
                    <option key={provincia} value={provincia}>{provincia}</option>
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
                          <span className="text-sm font-medium text-slate-600">años</span>
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

                <button
                  onClick={agregarAsegurado}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-lg font-semibold text-blue-600 transition"
                >
                  <Plus size={20} />
                  Agregar asegurado
                </button>
              </div>

              {/* Resumen */}
              <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg p-6 border border-slate-200 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-slate-700">
                    <span className="font-medium">Subtotal ({edades.length} personas):</span>
                    <span className="text-xl font-bold text-slate-900">{total.toFixed(2)}€</span>
                  </div>

                  {descuentoAplicado && (
                    <>
                      <div className="border-t border-slate-300"></div>
                      <div className="flex justify-between items-center text-red-600">
                        <span className="font-medium">Descuento 10%:</span>
                        <span className="text-xl font-bold">-{descuento.toFixed(2)}€</span>
                      </div>
                    </>
                  )}

                  <div className={`border-t-2 pt-4 flex justify-between items-center ${descuentoAplicado ? 'border-green-300' : 'border-slate-300'}`}>
                    <span className={`font-bold text-lg ${descuentoAplicado ? 'text-green-700' : 'text-slate-900'}`}>
                      Total Mensual:
                    </span>
                    <span className={`text-3xl font-bold ${descuentoAplicado ? 'text-green-600' : 'text-slate-900'}`}>
                      {totalConDescuento.toFixed(2)}€
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2">
                    Tarifa por mes. Con 4 o más asegurados se aplica descuento del 10% sobre el total.
                  </p>
                </div>
              </div>

              {/* ── Toggle Puntos ── */}
              <div className="mb-6 p-4 border-2 border-yellow-200 bg-yellow-50 rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Star size={20} className="text-yellow-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-slate-800 text-sm">Incluir promoción de Puntos Adeslas</p>
                    <p className="text-xs text-slate-500">Si está activado, el PDF incluirá la sección con información del programa de puntos</p>
                  </div>
                </div>
                <button
                  onClick={() => setIncludePuntos(!includePuntos)}
                  className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none ${includePuntos ? 'bg-yellow-400' : 'bg-slate-300'}`}
                  role="switch"
                  aria-checked={includePuntos}
                >
                  <span
                    className={`pointer-events-none inline-block h-6 w-6 rounded-full bg-white shadow transform transition duration-200 ${includePuntos ? 'translate-x-7' : 'translate-x-0'}`}
                  />
                </button>
              </div>

              {/* ── Botón Generar PDF ── */}
              <button
                onClick={handleGenerarPDF}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold text-lg rounded-xl shadow-lg transition mb-6"
              >
                <FileDown size={22} />
                Generar PDF / Imprimir
              </button>

              {/* Info comerciales */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800">
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

      {/* ── Versión impresión / PDF ── */}
      <div id="print-root" ref={printRef} style={{ fontFamily: 'Arial, sans-serif', padding: '0', color: '#1e293b', background: '#fff' }}>

        {/* Cabecera */}
        <div style={{ background: 'linear-gradient(135deg, #003087, #0077B6)', color: '#fff', padding: '24px 32px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }}>Propuesta de Seguro Médico Adeslas</div>
              <div style={{ fontSize: '13px', opacity: 0.8 }}>Marchal Aseguradores · Agente Exclusivo Adeslas</div>
            </div>
            <div style={{ textAlign: 'right', fontSize: '12px', opacity: 0.8 }}>
              <div>Fecha: {fechaHoy}</div>
              <div>Documento interno</div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 32px 32px' }}>

          {/* Producto y provincia */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '20px' }}>
            <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Producto</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#003087' }}>{productoNombre}</div>
            </div>
            <div style={{ flex: 1, background: '#f1f5f9', borderRadius: '10px', padding: '16px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Provincia</div>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#003087' }}>{provinciaSeleccionada}</div>
            </div>
          </div>

          {/* Tabla asegurados */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Desglose de asegurados
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
              <thead>
                <tr style={{ background: '#e2e8f0' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: '600', color: '#475569' }}>Asegurado</th>
                  <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: '600', color: '#475569' }}>Edad</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: '#475569' }}>Prima mensual</th>
                </tr>
              </thead>
              <tbody>
                {edades.map((edad, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0', background: i % 2 === 0 ? '#fff' : '#f8fafc' }}>
                    <td style={{ padding: '10px 14px', color: '#1e293b' }}>Persona {i + 1}</td>
                    <td style={{ padding: '10px 14px', textAlign: 'center', color: '#1e293b' }}>{edad} años</td>
                    <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: '600', color: '#003087' }}>{(tarifas[i] || 0).toFixed(2)} €</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Resumen económico */}
          <div style={{ background: '#f1f5f9', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
            <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#475569', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Resumen económico
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
              <span style={{ color: '#64748b' }}>Subtotal ({edades.length} {edades.length === 1 ? 'asegurado' : 'asegurados'}):</span>
              <span style={{ fontWeight: '600' }}>{total.toFixed(2)} €/mes</span>
            </div>
            {descuentoAplicado && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                <span style={{ color: '#16a34a' }}>Descuento familiar (10% — 4 o más asegurados):</span>
                <span style={{ fontWeight: '600', color: '#16a34a' }}>-{descuento.toFixed(2)} €/mes</span>
              </div>
            )}
            <div style={{ borderTop: '2px solid #cbd5e1', paddingTop: '12px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: descuentoAplicado ? '#16a34a' : '#1e293b' }}>Total mensual:</span>
              <span style={{ fontSize: '26px', fontWeight: '900', color: descuentoAplicado ? '#16a34a' : '#003087' }}>{totalConDescuento.toFixed(2)} €</span>
            </div>
            <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '8px' }}>
              * Tarifa neta mensual. Precios vigentes a {fechaHoy}. Sujeto a aceptación por parte de Adeslas.
            </div>
          </div>

          {/* ── Sección Puntos (condicional) ── */}
          {includePuntos && (
            <div style={{ border: '2px solid #fbbf24', borderRadius: '10px', padding: '18px 20px', marginBottom: '20px', background: '#fffbeb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '20px' }}>⭐</span>
                <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#92400e' }}>Promoción Puntos Adeslas</span>
              </div>
              <p style={{ fontSize: '13px', color: '#78350f', lineHeight: '1.6', margin: '0 0 8px 0' }}>
                Con tu seguro Adeslas acumulas <strong>puntos canjeables</strong> por servicios de salud y bienestar. Cuantas más personas asegures, más puntos obtienes.
              </p>
              <ul style={{ fontSize: '13px', color: '#78350f', paddingLeft: '18px', margin: 0, lineHeight: '1.8' }}>
                <li>Acumula puntos con cada prima mensual abonada</li>
                <li>Canjéalos por revisiones, servicios de bienestar y más</li>
                <li>Los puntos se acumulan para todos los asegurados de la póliza</li>
                <li>Sin caducidad durante la vigencia del seguro</li>
              </ul>
            </div>
          )}

          {/* Pie de página */}
          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '14px', fontSize: '11px', color: '#94a3b8', textAlign: 'center' }}>
            <div style={{ marginBottom: '4px', fontWeight: '600', color: '#64748b' }}>Marchal Aseguradores · Agente Exclusivo Adeslas</div>
            <div>Tel: 91 710 50 00 · adeslas@numero1salud.es · adeslas.numero1salud.es</div>
            <div style={{ marginTop: '4px' }}>Documento generado el {fechaHoy} · Uso interno — no distribuir</div>
          </div>

        </div>
      </div>
    </>
  );
};

export default TarificadorInterno;
