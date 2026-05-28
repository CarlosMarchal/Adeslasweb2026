# Setup: Click-to-Call Bridge Netelip + HubSpot

## Flujo completo

```
Lead en formulario web (adeslas.numero1salud.es)
    ↓
HubSpot crea el contacto + asigna propietario
    ↓
HubSpot Workflow dispara webhook → /api/netelip-bridge
    ↓
Netelip llama a la EXTENSIÓN del comercial (ej: 115 → María)
    ↓
  [Comercial descuelga]          [Nadie descuelga]
        ↓                               ↓
  /api/netelip-control          /api/netelip-control
  responde: dial al cliente     responde: hangup
        ↓                       (cliente NO recibe llamada)
  Cliente recibe llamada
  desde 917105000
```

---

## 1. Variables de entorno — Vercel

En el dashboard de Vercel → Settings → Environment Variables, añadir:

| Variable | Valor |
|---|---|
| `NETELIP_TOKEN` | `058464f255628ade166287f3d4632cdd0b030a2f3d52894b9582c74a0d0ef240` |
| `NETELIP_API_NAME` | `APIce0a9` |
| `NETELIP_CALLER_ID` | `34917105000` |
| `NETELIP_EXTENSION_MAP` | ver abajo |
| `HUBSPOT_WEBHOOK_SECRET` | elegir una palabra secreta cualquiera (ej: `mrc2026ades`) |

**Valor de `NETELIP_EXTENSION_MAP`** (JSON, una línea):
```json
{"360585229":"115"}
```
> Para añadir más comerciales: `{"360585229":"115","ID_HUBSPOT_2":"116","ID_HUBSPOT_3":"117"}`

---

## 2. Configuración en panel Netelip

### 2.1 Activar API Voice en la extensión de cada comercial
1. Panel Netelip → **vPBX** → Extensiones
2. Editar extensión 115 (María Ortega)
3. Tab **Plan de marcado** → seleccionar **API Voice**
4. Elegir la API `APIce0a9`
5. Guardar

> ⚠️ Sin este paso, Netelip no sabrá que tiene que llamar a tu URL de control cuando
> la extensión reciba/haga una llamada vía API.

### 2.2 Configurar URL de control de llamadas salientes
1. Panel Netelip → **API Voice** → editar `APIce0a9`
2. Campo **"URL de control para llamadas salientes"**:
   ```
   https://adeslas.numero1salud.es/api/netelip-control
   ```
3. Guardar

---

## 3. Workflow en HubSpot

### 3.1 Crear el workflow
1. HubSpot → **Automatización** → **Workflows** → Crear workflow
2. Tipo: **Basado en contactos**
3. Activación: **Automática**

### 3.2 Trigger (desencadenante)
- Tipo: **El contacto se inscribe en este workflow**
- Filtros:
  - **Propietario del contacto** → `está establecido` (tiene propietario asignado)
  - **Teléfono** → `está establecido`
  - **URL original de origen** → `contiene` → `adeslas`
    *(o filtrar por la propiedad de fuente de HubSpot que uséis para identificar los leads de esta web)*

> Si ya tenéis configurada la propiedad `hubspot_source` con valores 300-399 para los
> leads de Adeslas, podéis filtrar por: `hubspot_source` → `es mayor que` → `299`

### 3.3 Acción: Webhook
1. Añadir acción → **Enviar webhook**
2. Método: **POST**
3. URL:
   ```
   https://adeslas.numero1salud.es/api/netelip-bridge?secret=mrc2026ades
   ```
   *(sustituir `mrc2026ades` por el `HUBSPOT_WEBHOOK_SECRET` que hayas elegido)*
4. Cuerpo de la solicitud: **Todas las propiedades del objeto**
5. Guardar y activar el workflow

### 3.4 Añadir condición de horario (recomendado)
Para evitar llamadas fuera de horario laboral:
1. Antes de la acción webhook → **Añadir rama** → Si/De lo contrario
2. Condición: **Hora actual** → entre 09:00 y 19:00, lunes a viernes
3. Rama "Sí" → ejecutar el webhook
4. Rama "No" → no hacer nada (el lead queda en HubSpot para seguimiento manual)

---

## 4. Verificación del sistema

### Prueba rápida
1. Despliega en Vercel y espera que el build termine
2. Verifica que los endpoints responden:
   - `GET https://adeslas.numero1salud.es/api/netelip-control` → debe devolver `{"ok":true}`
3. En el panel Netelip, valida la URL de control (suelen tener un botón de test)
4. Haz un submit de prueba en el formulario de la web con un teléfono de test
5. Verifica en los logs de Vercel (Functions → netelip-bridge) que la llamada se lanzó

### Logs a revisar en Vercel
- `[netelip-bridge] ✅ Llamada lanzada` → la llamada salió correctamente
- `[netelip-control] ✅ Comercial descolgó` → el bridge se activó
- `[netelip-control] ⚠️ Comercial NO contestó` → hangup correcto, cliente no fue llamado

---

## 5. Añadir más comerciales

Cuando incorporéis a otro comercial al sistema:
1. En Netelip: repetir paso 2.1 con su extensión
2. En Vercel: actualizar `NETELIP_EXTENSION_MAP` añadiendo su HubSpot Owner ID y extensión
3. El HubSpot Owner ID lo encontráis en el panel Netelip → vPBX → Integraciones
   (misma pantalla donde visteis a María: `María Ortega (ID 360585229)`)

---

## 6. Notas de tracking (GTM)

El evento `trackClickToCallContratacion` ya existe en `src/lib/tracking.ts` y es el
que encaja para registrar en GTM que un usuario solicitó una llamada inmediata.
Si el CTA del formulario que dispara este flujo aún no llama a esa función, añadirla
siguiendo el contrato del CLAUDE.md (tracking síncrono antes de cualquier fetch).
