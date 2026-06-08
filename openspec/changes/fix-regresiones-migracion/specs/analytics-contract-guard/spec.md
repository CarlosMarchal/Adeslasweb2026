## ADDED Requirements

### Requirement: Persistencia del gclid para atribución Google Ads
El sitio MUST capturar el identificador de clic de Google Ads (`gclid`/`gbraid`/`wbraid`) al cargar cada
página y persistirlo en `sessionStorage`, de modo que sobreviva a la navegación full-page (que descarta el
query string) y esté disponible cuando el usuario envíe un formulario en una página posterior. El campo
`hs_google_click_id` enviado a HubSpot MUST poder rellenarse con ese valor persistido cuando el formulario
no se envía en la misma URL de aterrizaje.

#### Scenario: gclid sobrevive a la navegación multipágina
- **WHEN** un usuario aterriza con `?gclid=XYZ`, navega a otra página (recarga completa, sin el query) y
  envía un formulario allí
- **THEN** el lead enviado a HubSpot incluye `hs_google_click_id = XYZ` (recuperado de `sessionStorage`),
  no vacío

#### Scenario: el contrato de generate_lead no se altera
- **WHEN** se ejecuta `test:contract`
- **THEN** sigue en verde: la forma de `generate_lead`, la sincronía y el orden de handlers no cambian por
  añadir la captura del gclid
