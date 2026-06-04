## ADDED Requirements

### Requirement: Forma congelada del evento generate_lead
Las utilidades de tracking MUST emitir a `window.dataLayer` un evento `generate_lead` con la forma exacta
del contrato GTM: `lead_source` (string), `hubspot_source` (number 300-399, opcional) y
`user_data: { phone_number, sha256_phone_number }`.

#### Scenario: trackGenerateLead produce la forma esperada
- **WHEN** se invoca `trackGenerateLead("666123456", "test", 301)`
- **THEN** `window.dataLayer` recibe `{ event:"generate_lead", lead_source:"test", hubspot_source:301, user_data:{ phone_number:"666123456", sha256_phone_number } }`
- **AND** `sha256_phone_number` casa la expresión `^[0-9a-f]{64}$`

#### Scenario: click_to_call usa los teléfonos correctos
- **WHEN** se invocan `trackClickToCallContratacion` y `trackClickToCallAsistencia`
- **THEN** emiten `phone_number` `917105000` y `919191898` respectivamente

### Requirement: Sincronía de las utilidades de tracking
Las funciones de tracking y el hash MUST ser síncronos: no devuelven `Promise` y no dependen de
`crypto.subtle`.

#### Scenario: trackGenerateLead no devuelve Promise
- **WHEN** el test inspecciona el valor de retorno de `trackGenerateLead(...)` y de `sha256(...)`
- **THEN** ninguno es una instancia de `Promise`

### Requirement: Lint bloqueante anti-patrones de tracking
El lint y los tests MUST bloquear el uso de `crypto.subtle` en `src/lib/**` y la presencia de un `await`
antes del primer `track*` dentro de un handler de envío de `<form>`.

#### Scenario: crypto.subtle bloquea
- **WHEN** aparece `crypto.subtle.digest` en `src/lib/**`
- **THEN** el lint falla y el commit queda bloqueado

#### Scenario: await antes de track* bloquea
- **WHEN** un handler de submit de formulario ejecuta `await` antes de la primera llamada `track*`
- **THEN** el test de orden de handlers falla
