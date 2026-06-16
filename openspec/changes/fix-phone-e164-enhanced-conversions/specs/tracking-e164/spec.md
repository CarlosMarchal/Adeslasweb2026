## MODIFIED Requirements

### REQ-TRACKING-E164-01 · Normalización a E.164 antes del hash

**El número de teléfono MUST estar en formato E.164 (`+34XXXXXXXXX`) antes de calcular el
SHA-256** que se publica en el campo `user_data.sha256_phone_number` del evento `generate_lead`.

La normalización SHALL seguir este orden:
1. Eliminar separadores visuales: espacios, guiones (`-`), paréntesis (`()`), puntos (`.`).
2. Si el resultado empieza por `0034`: sustituir por `+34`.
3. Si el resultado no empieza por `+`: anteponer `+34`.

La normalización MUST ser idempotente: aplicarla dos veces sobre la misma entrada produce el
mismo resultado que aplicarla una sola vez.

#### Scenario: entrada sin prefijo de país

```
Dado que el usuario escribe "666 123 456"
Cuando se llama a trackGenerateLead("666 123 456", "test", 301)
Entonces user_data.phone_number es "+34666123456"
Y user_data.sha256_phone_number es sha256("+34666123456")
```

#### Scenario: entrada con prefijo +34

```
Dado que el usuario escribe "+34 666 123 456"
Cuando se llama a trackGenerateLead("+34 666 123 456", "test", 301)
Entonces user_data.phone_number es "+34666123456"
Y user_data.sha256_phone_number es sha256("+34666123456")
```

#### Scenario: entrada con prefijo 0034

```
Dado que el usuario escribe "0034666123456"
Cuando se llama a trackGenerateLead("0034666123456", "test", 301)
Entonces user_data.phone_number es "+34666123456"
Y user_data.sha256_phone_number es sha256("+34666123456")
```

---

### REQ-TRACKING-E164-02 · Coherencia entre phone_number y sha256_phone_number

`user_data.phone_number` y `user_data.sha256_phone_number` MUST derivar siempre de la **misma
cadena normalizada E.164**. Está PROHIBIDO calcular el hash de una cadena distinta a la que se
publica en `phone_number`.

La implementación SHALL usar una única función `normalizeE164` invocada desde ambos campos.

#### Scenario: coherencia en el mismo evento

```
Dado un evento generate_lead con cualquier entrada de teléfono válida
Entonces sha256(user_data.phone_number) === user_data.sha256_phone_number
```

---

### REQ-TRACKING-E164-03 · Sincronía preservada (hereda de analytics-contract)

La normalización E.164 y el cálculo SHA-256 MUST ejecutarse síncronamente en el mismo tick que
la llamada a `trackGenerateLead` o `trackTarificadorSubmit`. PROHIBIDO cualquier `await`,
`Promise`, `crypto.subtle` o diferimiento en la cadena de normalización → hash → push.

#### Scenario: sin asincronía

```
Dado que se llama a trackGenerateLead(phone, source)
Entonces el valor de retorno no es una Promise
Y window.dataLayer contiene el evento antes de que el call stack sea liberado
```

---

### REQ-TRACKING-E164-04 · Guardarraíl actualizado

`tests/tracking-contract.spec.ts` MUST verificar:
- Que `user_data.phone_number` sea `"+34XXXXXXXXX"` (E.164).
- Que `user_data.sha256_phone_number` sea `sha256("+34XXXXXXXXX")`.
- Que los tres formatos de entrada del REQ-TRACKING-E164-01 produzcan el mismo E.164.

#### Scenario: test en verde tras el cambio

```
Dado que se ejecuta `npm run test:contract`
Entonces todos los tests pasan (exit 0)
Y el test "normaliza a E.164 independientemente del formato de entrada" existe y es verde
```
