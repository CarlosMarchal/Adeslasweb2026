/**
 * generateQuotePdf.ts
 * Genera un presupuesto PDF descargable para el Tarificador Interno de Adeslas.
 * Usa jsPDF + jspdf-autotable.
 * Diseño premium con logo oficial, descripción del producto y layout corporativo.
 */

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ─── Logo Adeslas + Marchal (blanco) — base64 PNG ──────────── */
const LOGO_B64 =
  "iVBORw0KGgoAAAANSUhEUgAABAAAAAFaCAMAAAC37t+HAAAANlBMVEXB2O7e6vXI2+7w9fr2+v2/" +
  "1uvZ5vP8/f6+1ev0+Pzs8vnQ4fDT4/HN3+/s8/ni7Pa80+n+/v6eMyTvAAAAEXRSTlMBjTnO6ih1" +
  "+BXbr0liVcCjCIV26yoAACccSURBVHja7N3ReqsqEAVggYEZUIF5/5c9bdK9d9sTG5vQNOD6b3vj" +
  "F3V1xGGcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAuIr5ORyLivReZoInTr4mf" +
  "s1uzc26ZjqNKcq/KsVLvx8zZvQoTdEmyKic/HYYPpK8c/me1MGfWV2aCLs2kqjRPR+ETKQKgFVmd" +
  "KgKgY7WwvjBHqYdtZkUAtOJNVARA13zWV/kYzwB1zqoIgFZsYkUA9C2Q6mGeASRkRgC04kNmRQD0" +
  "TbKecDnA7eANqSIA2pA1k/7DeAvQJRv1LA5fAsiSWREAbchqor5HdoL+iOGjJLg1kRUB0IScfkwE" +
  "QP9s1Dech74fZHGsigBowp9ufwRA/+pCqgd4BpAlkSoCoAWZT7c/AmAEPuk/ZtQbolpDrAiAFmQt" +
  "kVURAGNYSf+Jg7YC2JBZFQHQgCyn2x8BMIgaWP+hIXcE+eBYFQFwP/Ehk6oiAIbho76XhrsjxAbH" +
  "usEdpfu5heqX5FgVATCSwPoerdNQxJrMuoXRuvadIE2RVREAQ5GiH/BQy4AyG8f6CVrXbrr7C7Gq" +
  "IgAGM5N+5IY5idWfX/whAO4kc8iRVRUBMJxqRr0nxJpMrAiA+4hd3+5+BMCIfNK/RtoR5Jdz7Y8A" +
  "uIN4G4wjUlUEwKAW0pOhWgFkNpFUFQFwu2pDKPFcQiEAhiWFL9wUPb8aO5esqooAuEuIeoIAGNoc" +
  "9YPOBwOJXYojVkUA3KkaRQAcQGB9M0A3oIS3yh8BgACAPXzWNyN0A0pUVQQAAgBuWwLsfVOwRwAg" +
  "AOAbxAx1WyAAHhwAA75AOpY56gedDwZCALRTTWQEwODeZgEOswyIAGjc/F8SMQJgXNbpli67Ab1j" +
  "RgC0U6sNifQbYo+XzXEtrFtil6s5dgkuMgKg8Rh1BMCYJLFu4U4/E1hlNokQAA15ExEAQ7JRt3X8" +
  "qXAfIiMA2pFACIARBdaLuv9MoKyFEQDtiCH9CAPWBuCdqg46K8sbRgC04xPrLm6CbqykHww1GEgM" +
  "tgM3ZBMCYDRSeORbwxZGADRTAyMABjNHPRmrFeAf6xAA7Xine6QJOvG2tDvoMuCLukYEQDuGdYeu" +
  "F46OxWc9G64V4A9xCIB2ZkIADGVh/WCowUBnBkNB2xGHABjJxj6gob4RZJ1exV3uevoNgREAA/FR" +
  "LxjrG0GSWK/hzkPucVZCAAxkIb3O9b0MOK2EAGjGOgTAOHzSF6MvA1qHAGhGCgJgHCsdYb6DGARA" +
  "MxUBMI7/pflQg4H+MYwAaMYwAmAUNus+nS8DzoQAaGYmBMAoAutfA+8I2vGugztf53wgGxEAgzjv" +
  "7jzAMqCPg69y/PUkAYC2qi6spBeM9I2g3QHQ5/zz/3uSAEAF0INadLfY9TMyAgAVAGycyX246xJA" +
  "EADteFQAgwik+7meH5IRAA0JKoAxSDnM4HwEQEOSUAEMYYmqBykBEAAtGVQAI9iYBTjYN4IQAAgA" +
  "+Hq62wFaARAADw6AzlvHDyGw6lFKAHEIAAQAvCdZv4n6retQASAA4HITwCFaARAALQUEQP8+zAIc" +
  "fkcQAgABALuG5Iz5mUAEQEszAqB/C+nJMVoBsAjY0swIgN59HpQ7+GAgVAAt+YgA6N1KetGgnwlE" +
  "BYAAgC+XAJl1B+p0GRAVQEviEACd804/cYn1Ogp9dgMiABAA8FUXIIfZ6Q6pz2VAiWNPPHoHAQA3" +
  "bASOvhrW62KfZxYVAAIAvugC5DJNlvQ67nMZEIuALdWsVxBmLD+zavjC+z1J47YCoAJoqWbMWO6a" +
  "z/oRn25rw8MOBkIF0FRiBEDPAl/c6m9Jd8g9nltUAE0FBEDPJOsncX7rDhy1FQAB0NSCAOjZHDfe" +
  "gYWo13GPnwlEAKACgD/C1nO95FE3BSMAUAHAG0mbs74CD7ojSBwagVABwMY+oPT3T3HQwUA7OgEn" +
  "QAVwBFK2/6VLGrQEEIcAQAUAlwsA59/9ccz54KgAUAHASTX8xaAv78bsBkQANLUiALrl3Zcf/jas" +
  "11F3nwpHADQ1IwC6FfjLF2ArDTkYCAHQlCcEQKek8JfN/d7xiN8IwiJgU5IRAJ2a6crNHIYcDIQK" +
  "oClJCIBOhStXfrVxxB1BqAAQAPDC52vbeyXpDtxZKwAqAAQAvJjp6qlaaMAdQQgABABcXAI00yfe" +
  "DfipcAQAAgCmaY07hnwa1h36+kwgAgABAFMNvGM1z9J488HFjRVoX0AAwBbJ154ARh0MJHG8DU4b" +
  "EACwZeFd45sND7cjSNxw3c1bEACwoZp9YzCsG24wkEQEAALg6HzcN+NbynBTARAATdWCAOiQ4Z0P" +
  "8vNwg4HwCNCWQQD0xyf9hMtmhddDCSCfPGUFUK8d5ON/p9pHAFS5bLrkuS6357TS3qu+hn3LgNMv" +
  "qd7a2ZiSPijGWuvr8wSAWGuD+XyQi7Vepgfx1tr//U7FzNbK8waAeHs+vyVdUMxq7bXjb38iV1Mu" +
  "ncmOYkAS757sY+OzDgYSb4MxORKxfsZE5IwJ3tffDgDxszHp4lG+HeSPXzveL8a4rR8qpvMxPFMA" +
  "1NPJfeHohW4iOh//4kUecL0ZU2Ik0os/YzFm9X3EgHX7/4XX8oSfCaxig8kxsn6NozOLl18LgCpL" +
  "SJH0axRzsD91AYsNxu34oWIKYRb5/QAQ8UtILkbdsHn8y8/dfVXmHSdSKcYSlucPAcMXZoFtCaQ7" +
  "FD89SpXZZMesuzDHHGb/G4uAfjaZmHcdpEtlbV/Lyhxy3P9LUX49iHrHXKk7A0DsvKTsmFm/j9kl" +
  "Y2Vqrvq1ZMe8+1fMYX3qEPBu98dw9u8IWqfH8NaUyPotRNlYeWwAiA2ZWPdjco0vXwklkn4LUyyn" +
  "mmm/mdoEgJzOLBHrHdiVxdeppWpNpu9fcMXYp339MdN3Kvi6rxuwyPTzxIZEeguOKVh52COAzCby" +
  "DQdZFt/s31YorDehU80kjwyAtwq7BYotc1SWEllvwRTNcz4NVPO9Hb2ze5LBQH7JkfV20SwyTb5h" +
  "AGwfKOltKDf5D1atiax3iM4sVh4VAGKiNhTLIo2uuER6B3YurP7ZGuVt3toA+9StAK8ng/UuTGnx" +
  "Px4Ashbiu45Rpjt541jvxOzKYuUxAZC0KY5mrtOrVifynvNpnuwVYaBvruEvfNdgoKfI4j8oRv7R" +
  "AJD57quGyir3XbiOtVU5beYOA+AUAX66Sz2dyBY4xhKeJwJ83jxHd7UCxPlHi3/SB7g/AGwhvR+l" +
  "tU63mhNpQ6bLAFDlfFcRICHqXn1tmV9IP+FSpy+l3+0GlPVP8f/sASBrZr2IP9BrmIK/9cJ1rAiA" +
  "V/cUAb5EHTMAJPHGLLBty28OBqrvHmifPAD8xsobn7vtwrKEJRhT9rzt4jTfeAiqCIAzLn66jU2s" +
  "gwaAjVtNANskN98U3P4/GtMJ83/snQuS4yoMRQ1IiD9k/5t99TLTlaoex9hIdki6tYIEw0FcXQQA" +
  "vQYAsdB6AVLFb0ow6lhDT4wwA2Kg7n8p8F9Bnw6AG1U9Nuf2WCe/gt4LAHbExmvpVc8EagW7zFeh" +
  "2vgVWdVSDBBdCgBnzaqUbp99+rtTSHYD06Wz9qtSEfWfwKRqNUAfDIAxAqCCXoFfWbwPId4vedUA" +
  "QG8CABc66h1DBiz6hNM/7bH4pG8XW93dUF480GUAQLV228dsHkPRGpAkQNwaLTLBxm+Ibg2jLYY+" +
  "FgAjBMBN8/vdLt3ad3N6VMXTOwBgZSkHt+MDvaQ3oFP9VKw88321xWGunq4BAFYaUaEwbebsdKga" +
  "kAttYPLpODltjacPBcDxNMop2PZpuac3VDxM3xbFKeo87cWRAY3sGQAV9X1zrgM8W+gCAKxV3smk" +
  "tkPi3K4b+rSf7YY2BHHdubbkPxQAN1JOav1D2HRqO7SBJgeANmNX+bEMLB1m6AA9o6VFhitO7l+0" +
  "7Mdl/Gb9NgHaTlwG2kgkujrv01TEvjkAbiYd+ZR2YxfvTzf9DKR+EiPQmglg6AbxwGSRFrQp6L2+" +
  "eDgXAGvrH/anntuas89tnwYJvHOwrvSZACCjj1RyNlDs9hWtJgbAylke7L7lCNc2BmrR9LS/A+5K" +
  "a+g8ALS0tv6P6CHZbA5qHDF4P4IUcrxvaQ4AgH/EQXGXqmPtOn0Q90Fa5wBAgtFbfC5c2hjIpd76" +
  "L5lRTRQFQPLs29EZiGkJ0oavgrU1JQPw1QAAKPfehYiIzjlE1FqpR/1S8Pnapojf8AIrzPrcXFPU" +
  "M/DO0Riopc6WDVUzBEVRAOjV8/9jHPijS31Iu0oCxdm2gl3/UgAQmWIzuvZvZ4gUDPF0wD7LHwHW" +
  "HZlrkwIAzTDYGkrcCGJsRUyLTMNCpwAAK+PUubPzIlUcrtJ4e+we4VQAgGDRPRsytz+t8/FQt3wm" +
  "0RtWmhMAlnomAH5joLbwI3fzfxwpgNBeAHDr/2AHfh1nC9NGqAjWLE0DAIKasdNyNcBeFYB5ANAH" +
  "d9opAYCVc2jP/qrGQDqcYjlMXh4AWKE33USOWCa1jrtDKCXDQJMAAELCHa49vzMF4BmplWPONbtM" +
  "ENH3vs4UjYGw9qZUYiggsgBIIFULcYGGcx5t+DP3wfk5AEAKB0oXHHW6PT9RQDz6NSvNB4C1BVBZ" +
  "Bwh+ytnfztgJ9iOwEB8A/XaJNManTMPj+hgx/m9xFiYAAJW9VyHdvmlZ3EDezkC6DvMBAAtvv9ae" +
  "U3LhW7H4iEkgCwBdBM0QznSSWObMHfxT3r0AABT0wGbLnJYJBKvbzcJ0AEjAcyi3S6wAupynMmAg" +
  "SQA4BewB6O/jfR06w/PBcgNTl14NAKgo3byD7FEIMR+9wDIbAFy59WzA8o2B5NcoJBYDJQGgQPTa" +
  "h/ZjJ59WJWn8vW+6uR4AFFBe3a2M4S8jOaedDQDac8mGhisD8oU6Uo0FQZIDgPayrRFdpaHahwbh" +
  "21mKrgcA7wLvjq/qcVziCo693uLy8lDEJtv5bwRFOFdiSCAGAKdooODEUFnJtqMnAMjsrcK0iwFA" +
  "AQfKW+yeXK5uJLVtjOdTAQANP0GMZzcGwnpykQGNGACS76SL4vQzeDRxgMg9LJJargUAFT2w1viJ" +
  "qfbS/a7TXABY2fuMZvUTk5cBXXeDNnrhRSUhAOggroG60hvYzkeRopGF3v8RB0Bv/fN3po5HVTyP" +
  "WrDM1A9kbZpUHtTkLwVHc/ptwwwcAPTPnZQZAkgYKYBEL96mNfqrAVB5r0w7w2hZ28+j8sLlqHk5" +
  "ADJ0kiJBKwBEYQVQcBzRywAg+oHpztVYIB6EcnCDcuRZAOgVMkA5xshxAFDkG13FiQDQFInM1cpo" +
  "DMTHCymBYigHAH3hObAoTQMKSCJ5ydTS1RkA8yWPDEwAYJGfdtrPA4A1CbCyoCbv1XGKYecSNDRD" +
  "HksA+ACINHCnpZJ8Lqb91QCAe5jIcLmysscIN/lEKnSKqReGJa4JgP9GED8BCPxhbAn6AGBUnlk5" +
  "iqbjGogzJ3RpxUB/Ay4BwKLjPXRjSFydANyzQEQrO5a+okgDgF8nobFtWjHeCOLaOcCK5EIMAHRZ" +
  "RZEFADh+p8WZM0xZGHP8P3J0EgDgB98LBPlyAGD8CvEx4M8ssqLndH52oT3jZCEpAkAen26gz1Uo" +
  "ve4ATT5negsALBlOBADk5b2jqc4aZftV+W7ApuiSh4dc4AMg+0G/GV+htMcyGoM/BADxTADQFO08" +
  "GIFFLq1JJ8mAyNiZZb0MkMcgyAfAEo6/1YuwrRr+EABofyYAJmnqPRwJulCTbgxk5XO44q7ZKyCP" +
  "lgDkAdDf0rGnxvwMALjKU6YtdTj6zuFC5zDJuC6+e7Xy3x2oyyQAUFt7hR2LlFNKFvrqykEAQPwZ" +
  "AFjUmQC41Ume9pNLj0KTlKr5gNH+qkdHNBcAGLZ+5WgAENFAhRWhI5zgLwBYR4B7+LeWAS1JVtRc" +
  "OeNGkCXGfU5ZqR0yg1Wnh2rHyppg2y8A2ACgMMv7/uxemPyvYgeeCeQf4eS8FIEHAKfo9sKoBwFw" +
  "A/sLADYAbhTeVwdMwHY38xsD8U8AapkDANrcXhkBD34NKvonAMBynYBdjr4rAZraO8eF3whyDEid" +
  "WYutPAAkuL0yIB69CUtB/wJgBwA+lQDaSFfU8r4zwD79+T/2zmw5blwHoOICAqQoLv//s9f2pOqm" +
  "ErfJNiAR6vjUvHripFtH2AjOrnSJVocAKGFfiT+eFUDHtLcfAXAF0KO5Zx3AIO9tOn4G+DE7zDTA" +
  "dQgAXF+KP56vyWIM9OoC2HEoAG5ch+WOBoCHQwCKyoDZTw8W8DEsAWTsS/HHdy5s8sG+uADGzR1g" +
  "ex3Tcb804LNnK8n+Y/Oz9ox99iAAn8wtFy8Fw7eM5MtBPwJgN7djvVsQQAlPqKfVPoMRzCl8lvvG" +
  "cgRApS8mfVqRGRPrQf+yAAqJlHZcuNdQ4Cf9NXQgGlbwP3py/S4CgNgXk+hRjjd+fe307wqg0qiy" +
  "PYcvt1JAwIfVOT2jAODmU18+BzL+qMP3xRR62EEZK8BY+hEAd7zDp3wbBZA752hTRclrAjMyLnYR" +
  "Pwzgj29XENHH06nEGEzAaA76EcDDjZQvFwXs/jMBEBuDkiFAmGkpqBDA4HXrLNhTAQAa9HlGxJqh" +
  "3VIAjYhgP/Jv7EDvtG2zEwIQHPDCEva2qefTBxVdcVwidsFpQDMT+KoQgI2j/HwBpj8F+hIs3UsA" +
  "BNaaWmvyfxBTfcMYU/2MAASrOxjNrj4M+OrWGGT8N0sEqXtdUlMhgN0rFMAR+5P4WA9o9xAAkQ2m" +
  "xjh85zAFQKY/CXoXrO7BgOD7UjDMpW+3EUDWKACq2J/GO2NJuwCIjpxc7BJUEvdo7xhTBr2pAKxv" +
  "WoOQAIoKAVDqCgWw5fgtO7uUQbEAyOZUPGKXodIZHu3oi9m1hgHZ98VEeKkIgIpKAXz3gBL6ZCzp" +
  "FAAcNfouSCVGKjUwqTlUVgOawb4YDG3CU/gjAPEqwHwpK5M6AdBhnO+yVPpWyXy+L6gvDLCxL8fZ" +
  "mS7gjwB4EEP1iCWAKgFALh67NJVOfWC8q+oygYD9AvgTfKbfpQawe50CYFZ7fAm2aREA5OSxy1Pp" +
  "5KI5xqorE4DUL4A/CtDMbSKAjGLTCvINXw4+GksaBEA5+dO2qQ4Bg52nAE3nhXffFRD3f0gAXy1a" +
  "0N7xjfWgpQLgP/78s6m2YGcR9ZwWnMsLNYwC3EcAw92xx7YKSNh5YKx7WymAZs0o+EfE6N4oKZXi" +
  "3oge3xATwLaXziRqOSpkXVdBodeJAIYCyNsybMHOVkCAdQKg4HDcczcHvEHvwDs2GFOd9ygjgCZQ" +
  "OPMqyoFNRwAwcalKq68jgLCtA6rAd7cctEYAdFQcNCvM8ahOQXacvYfZwFmgBOkV7A8lJQFA74aG" +
  "ArjLYaChAMy2EOtQwNfGrhAAhYiDkVti/Rp+n65DuM4GS6ZtLVZFCfCdCAICiCr2AQTsSvuAH+wF" +
  "OxtMmS4XAOX4ZehfMw1/DamFEjSTBehfIm6uWFcxuxWALwB/3EIADraVQJH57sLFArAh9sf4mWW8" +
  "VkwAWwtORKT7xkJ+aZfbQRKCybZpAr4AMN9CABG2pYDxnQ8me6kAbEHGpQbiAthaFgmlXKBtGcHP" +
  "zkKdf0eQzwICCLcQgD+2tVDwIm8vEBQAq4OJJbepXwPlBLC1uZaK4tvEqF7y5YQ0OQ3IF4BpdxBA" +
  "D9tiWpaJX+1lArAVGb+IoADkQ6m4zABHHNRBZWhz82fRsgXQC91CAKZtq9lNvC6D5QvAJmSHIvIC" +
  "2CgnvG8MQBU5j5D8HUF8ATi4hQAibMshiRQWi71EAMR4/jkCGGNNvK0BoEhm0fxFapVeQwAZ+wCv" +
  "4uooWyPfABUuEAB9VUZCtzM+VXYfmSSyqZhXGCD4q95NGdk5QDNzlUQFAgA/rlWo2BBHh8MLXl58" +
  "AeQo9JnbMxYT2eBkJ2Hlmd9b4ei8diPvsTBz/4sbLAR5I+k4CbJBKJ5dwmpnC8AWKZlCPCM3a3uN" +
  "yO+oXI2Nl02ptrkB9AJsAdSmfynofz+tg2bZ8ywOxAQwrlUx77Akd05xho7kkb0W72IM8sIp+cWj" +
  "PrOnliPcQgBKcgARBWBo8gKYTwDMdoEAxlCukbsW71ogPX4HaxwFgMhaLiYvgMERS61bgf6GgHe2" +
  "ze0yAhjnj+xvLMXz3h/ESwTQ0HYp2V/5YgrILYXAnGDNegFsh79PDvAB2cDpCRo6UQAt4Kh3LFgD" +
  "oG07SQHavhKUkDsFJL94BANbAKldJQBetlIVhQDcRKDYEwVgi2Dfl7gCGNcCImcx5oUc/tLiNBlu" +
  "QYlKnyHaewhAxyjA70CoHr/ZCjxPAJTw666PKgF8BFPO9wkufP3O56m1nZhxcEOAMOfRvFQA/68C" +
  "3mAc+E9oN99bt1ngNAFYJ6rRNBKAiEmTR+2NAHCDx2/R+vFEXAFUukgA3DsMlIwC/JkJFI+Mna6i" +
  "AhgXjxwoFMCvYgD2v1C0JyLj4FNYVAb0ljlO2COsF8DuZ+JmfSHAO5BNxKcr2JICmG8BYN1UCuBd" +
  "AaF4seX48lC9vDCVPXMaENzk22i9ACBqbPw+kQlEz1/oxhfA+OeMVgG8AX9fX6DnmPgez3p0uEW8" +
  "BMwFpphouQAo6av6PpkJJI8aBGAGslcsgI/hIIcy15LIlwCvj0CC53VDW8XJQGq5ALaA2qq+T9Ig" +
  "F88tAvAFAGnwU6oF8NETiKiwCLDHPjoIJI+NzBd49pNlwGsEwP+7Vp1VgF9QNg5Z7y6+AHZ/bwH8" +
  "6q72DxT1hgMOKjkLLyGJlnuNYbSXCYCXrvis2gBbs6bgSgE0g8ICqEMByANH8qhKAFQmjuLIszNH" +
  "ASgx4lF5AfBlh0VrHfC3YrZDxjQwUwCU+gsI4L96oCYB7PHUqjSzjO+AeZEpFrhCAONByzsdCnxE" +
  "25NnfGg8AUB5DQFs/+PuapfcRoHgAgMzgEDo/V/2bnObuM619oBbMmz6dypry6Lp+er58F9EusTS" +
  "ODFzktItdHZEojEAhekE4OuyRjCX+AZFewUBbPy3EMBnOBVXKQPY+OiNXiIGOIx0nCpcAuAEgNc8" +
  "uC5cCfgDqw8J0A8hACQJiFuxr2EXLYaB1BkCqWAa0HRPp0wnABuXtYIah2xuCgGEv4kAPh2EeYW6" +
  "kI3T/nZgrBWgxG4JMJsA2r7kECiwU/ivIAAwBMDv3vkKoAWaln+wDjsT3nU3p88mgI9CS3vC4wxw" +
  "PQG0evxdBPAhhqYTgE8MPEuYAbFevsCAw9q5BLD1Oa7oiIt3A3yhuLcTgDg1WPxRIYCyTAyQ4fhQ" +
  "Dn+Z1C2RBmQjioRAlTVOAGy6H7TOAB8/AK3Q+FHECeAnzwIoY3hzqgBSeWIF0idstkR2flMe0BLq" +
  "PSY7L8QAkm8QwEZ6WIyjBLDWNKDNf+CBFNyEcUDlXuI3FaQNY/7ghbr3rvuLCUD0R73QILiN/Aem" +
  "nd7IlWSKAkjyZgIw/BuvvmAt8EwCEDN3DqlEsBVgPzpBRjAC6Df2hj/rkYpcTQAE/9jNMDQLgBMA" +
  "nrnasf+vGUA06y6nnK8XAPEtPvWwtWfGJAAeBFjCLb0KrbMj3hLe8pHjagQwLFx3MKtocP+ctvO8" +
  "WQBJioS7HIGxNKBPwMKKAVjCp/ll52U2RFvC7y7ZVyOA4ffWMEQAzQDHVX8W0U7JANxy2uvEAMnj" +
  "kTUnfyEB8Dbiva4jGnstASh3F0QAtE0igJiB+wclgHI6AfgpJYDbd1knBqCi9DGgw3Y4AYTR7Sv6" +
  "XICcke1v+veJGSCA91mCSR2TijgBkB4C4KXmTNOqgIWmryVqhnFjoDckAj2dsd4v16MfHI3HXego" +
  "NLX6RKH9BALoqRnFcioBlAECOKoFCGBGEcCnN2YfwPMbLSIB8Mja0hnGQ22jYwCUNsGmziMfNetG" +
  "xTEDBKDQ9YXTgHjHV2CsvSucoDDztGu40AIrCTINrEnBI+vQgMUJuPoUc4yACRABsiV6mPqQiud8" +
  "ZIcWg+AEgBtZBcZWNoYTlrtkmnQKfXrnEAJq7OU8MlGgq128ZTGW4SEaHeyCfU2fF0PPLhKjPF2E" +
  "AChfQwCZgLEPmAB0YcgBIID3t+NvpFdxlkkCPNNDfufj2ijA7txXqtCxOT6GKUCGXbyLifz0CxuF" +
  "FxHurnINAfjT9ytshJWOfcQlgOE5hmC+8hKbKntjgN0r7UydiLsHvFue4U6vNxvKd8KcjkFwNXbQ" +
  "fT4RK5eYuTuzGQghlSN4mSswnuq1hBWOfIRvF0lzGsLF0BoO9T52HtwCddjcwMmOPalA3TOHtxZe" +
  "8cGRK4heuYGd2TppS/xmIul3mNH4VUchRaxdvRcAD/N8xNxNfYRNHX2d04yX4yK7qn084B1fNg0x" +
  "QA0y5IA3krcP21a2LRgX+dfxa1DZ4gb65ABRDr/YLTnuaoA2yqkBuhqSxwnA9ozO4WGej1ADefMR" +
  "dnYPDGQzIR+QH0YAR7SY5d4NHHfbLf8rHwNgZiZm5t8vRFG4tx9MNYVs26N30WaTHPOdhPW9fopU" +
  "TordKOBxH2csYRTkrPgz2aGXl4MMTwNO2Re/0SpLqsSdsG+qGRoMq/sq7NYQHwrGX6AQjxdB5Iwx" +
  "1nsvX/CfsMYYR8QDKXGjfFIdQVHN0MELmAskdUU0UnR25/9NZopot1csDRiqVuveOG4ziIsogA93" +
  "nCAB/CgDkD5yK9ZEPiDwt2N9ssUDAcV/4f5D/MTjVpL27PhCaQDrhpPXOAHIzucx/JaIuxoyty+u" +
  "3ULa7R0BgJZuzfCMJgBJ/AMJ4O5jgbk1pv1pYk3KHvnAwCmLklcEAFXEAlhAk10RAJgRTFCGx3TQ" +
  "ntuTgyelm92Zak21Vsd8n0GWCBo65ThFAGxxoT21CgH0hkXZjV/PNdhHfHJ3/LnGYxgxKF5mAFAr" +
  "1MzYKE2JgABo5niRAHwdmaV4RAGSTe07/opOag6bOvWJgXYmyI77JyqA5+ml7PgYBVMy1su99N/2" +
  "SvctucOynZ9dQX6nAwFcDvMRGqbLlZUaK9b++VCMBBpjeC/3X9wWc9P+KAOYb/+FRW2x6SQBoKtl" +
  "lH9wyMDBikV7KcfBFJMxZsvee7sFY0wl/mZjlwQ+4FojngdAeh714gun3Hf/V0a6V6Tq+R7lzHSC" +
  "ye3GFP8v8q8fd3c0Qr0aSwbE0EkCQVPNeAuQ3ne7UBlQHTNrytpKpXj3Cf7EN5P5bbR+z7U0rf6D" +
  "MgBkUibxcdZCha0M1d8yvS72bB3/cYlijMTMB/MBgmvWSyFdk9w+0JQ98RsNiMdlWoF7JEAr7jgf" +
  "7OwLzgO5qUR8LQPw9hLvcgxe/eCVlR1s+PzHLkrnzCRQzT21UE656ed/ShNwccDtAUHPB+lwZSw0" +
  "xUG7faDY0FZD0WcMcKE6HnmRYkXkDR/YzeUjQvVi6JiG+/ns8Kqdi+T6sHh7ZQpOSl1lN4XuLq83" +
  "1lzPABT8aBMvp4y3GeOy5eX+K3ZPeiR8uHtxxyeKxCAlzBsD4eC6O4baOsJTOxf7+PibCAwzASiO" +
  "gdm7CxAYoOCxsQCc8bMDPuHAu4zDbUgDJtNevh/I3RIx6rayRTDas+44BdFYKSNVhX/auxctR1Eg" +
  "AMMilyoVE/b9X3ZHO5PZ49mkDISezO7/PUCHBiyLq5dcjv/L8wlIN+q/7zDz8jh1i0Mbc5rskyLA" +
  "6N+d20YX+q2kLdOJ5EkHQ/9hgD2NXGbzWNOqWoa7cjhneCSH0VnzxYi+cwQQn9VYVbAzu9Xci5BG" +
  "1eGXoktykxivj05i2irukyLAWJGxizHBpvldSYDMuRjL0Nbkj22pClh247WnXuK9y2texnHJOTvv" +
  "5fmyx3CGpklOZzFq9JsW4mJ5KZhMLlZNZ0x+Tjlv1bjmnK9+stLHXopxssXYztBBWWapDd3PVPxZ" +
  "Y07LyC+a8jdNb08CpvymsZdI+CIi1uLY2T74Sooem3d92ffCpOlknWrtUTY5VKMx49SHxlRxHZ2W" +
  "oRsdXW0c34ao+nQYYDRq/VyeOqnpsUbACh0GAIYsb14cM5WXW1zmFLXqljZ7m4YaW7KMl44RAOqP" +
  "jnWyuEkqCuRdyj3KVPYrM5oOxHkXn57kkeblv/jiKpT4XIYqulyDdD4DdJTDt3bcslS1uEyXlGPL" +
  "XI+9RFfsCCAuWt/Wec8bpxtXvUfOa5ftf/KGQdzzucC2JPFxn1YXxJgFe13MvrVG7A9UtFdQ/e7B" +
  "xUt1F0yv7Uc6c8T/pS1ZEq7x9KbopqjUj/urVqcA8Fe7uTx/qzrp8Pw/yBmNuUlbOSywW9pvxtc9" +
  "K2w3pbHlIxQ2SQ+nkELbyq4dAeyt/ePpWrRnjwkArQHg2EGMtqldy8sX6bB9I2ajQ7ecl2i/8cR+" +
  "OfYPAO0LPmG/uPWorFepnXMuY2puN/FbjPnQABA/NgCc6OF1ee60qnVV2NRj+UbXirmApoMko7sE" +
  "aUlbl9bb92yS3jWQkfDwYY4uiJ0wPLk9IrRMoRq/0SEAyEO/LQOQ5x5kAHaeexh8tp/k22gK0mP5" +
  "Vpd0aXgry6HstrLlHSJ1/fa6aN0d4mI5BAAjxsvZyx/y+PRLalK9MB+NdjOupdHhuwJAmDbeX9OX" +
  "vNysOX2ZvZ924VsCQJh23nuXdjnl5VCqjbt4P30RMwAcM7RXmiacm4wpeQ5dzm8XXWv7UpjmHKuC" +
  "jpvC6/02xzKctmytd2jrTV6Xm5xz+sl576e7bH8H5dyV7dEcgjUszFW1W5jc1mT9Lc65rbrH+IOq" +
  "Dg+V+1WzaeO6nAzWtJXnVqCNqv3S1fhlTRvnluEkjad7eDj/COnqpdPxDR3TNQR5sSe5JepQR+Pi" +
  "riG88KESN+qLv3Cjm8FS9Id4o+0peLiN/e0hWDAW5qyO5kM4PyBxKQ6frQz/DTrm63wRMVJE+/E/" +
  "DkB7bd/Ucb3OlyByZpvZZb6uo76jiqzhgIhM85zGT+sXGtP8aDZjK/LZuQrd80U5nAQ/rQwlLmme" +
  "g1WNt4886IBvozrmNHsfHuzYvqQ16stvah/ExV4Fjste4oeJZfDezzmvquVdv7jmdHlcR35OedHP" +
  "7LYlZue9l2MdbQ17vshlH4L5YOzLtavx6r2fHhyx8C7nqJ8WRP8XisZlHz9Md9e0iZXpc1w7Z3Gq" +
  "ccxbiZ2f7rz7msCJqqXfL87TT3NKLqUxfuizf6ca95L7X9W0VjTs/lfmrI1FieNei366uezj3iUq" +
  "z/7vpzef3qX/oehdGUr5zkr604aC92pq8LantPx5XQ0AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA" +
  "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgE7+BgCJ" +
  "Bdfi6bVbAAAAAElFTkSuQmCC";

/* ─── Colores corporativos ──────────────────────────────────── */
const C_AZUL_OSC : [number,number,number] = [0,  48, 135];   // #003087
const C_AZUL_CLA : [number,number,number] = [0, 157, 217];   // #009DD9
const C_MAGENTA  : [number,number,number] = [228,  9, 125];  // #E4097D
const C_GRIS_TX  : [number,number,number] = [40,  40,  40];
const C_GRIS_BG  : [number,number,number] = [245, 247, 251];
const C_GRIS_BD  : [number,number,number] = [210, 218, 230];
const C_VERDE    : [number,number,number] = [22, 163,  74];
const C_AMBAR    : [number,number,number] = [180, 100,   0];
const C_AMBAR_BG : [number,number,number] = [255, 251, 230];
const C_VERDE_BG : [number,number,number] = [240, 253, 244];
const C_WHITE    : [number,number,number] = [255, 255, 255];

/* ─── Fichas de producto ─────────────────────────────────────
   Clave: nombre exacto del producto (product.name en pricing.ts)
─────────────────────────────────────────────────────────────── */
interface ProductInfo {
  badge:   string;
  desc:    string;
  bullets: string[];
}

const PRODUCT_INFO: Record<string, ProductInfo> = {
  "Adeslas GO": {
    badge:   "Seguro ambulatorio · Copago máx. 260 €/año",
    desc:    "Accede a más de 51.000 médicos y especialistas sin listas de espera. Medicina general, diagnóstico y urgencias 24 h. Tu copago nunca supera 260 € al año.",
    bullets: ["Copago máximo garantizado 260 €/año", "Chequeo médico anual incluido", "Urgencias y telemedicina 24 h"],
  },
  "Adeslas Plena Vital": {
    badge:   "Cobertura completa · Copago máx. 300 €/año",
    desc:    "Hospitalización, cirugía y todas las especialidades con acceso a +51.000 médicos. Nunca pagarás más de 300 € al año en copagos, aunque uses mucho el seguro.",
    bullets: ["Hospitalización ilimitada incluida", "Copago máximo garantizado 300 €/año", "Diagnóstico por imagen de alta tecnología"],
  },
  "Adeslas Plena Vital Total": {
    badge:   "3 años sin subidas de prima · Dental incluido",
    desc:    "El único seguro Adeslas con hospitalización completa, copago reducido y precio garantizado durante 3 años. Más de 51.000 médicos y 1.400 centros sin listas de espera.",
    bullets: ["Precio garantizado 3 años sin subidas", "Dental incluido (46 actos)", "Copago máximo 500 €/año"],
  },
  "Adeslas Plena Plus": {
    badge:   "Sin copagos · Hospitalización incluida",
    desc:    "Seguro sin copagos con cobertura médica completa: hospitalización ilimitada, todas las especialidades y cirugía. Acceso a la red Adeslas con +51.000 médicos.",
    bullets: ["Sin copagos en ningún servicio", "Hospitalización y cirugía ilimitadas", "+51.000 médicos sin listas de espera"],
  },
  "Adeslas Plena Total": {
    badge:   "3 años sin subidas · Sin copagos · Dental incluido",
    desc:    "La cobertura más amplia de Adeslas: sin copagos, hospitalización ilimitada, dental incluido, asistencia en viajes hasta 100.000 € y protección por accidente.",
    bullets: ["Sin copagos · Dental incluido (46 actos)", "Asistencia en viaje hasta 100.000 €", "Protección por accidente incluida"],
  },
  "Adeslas Plena Extra": {
    badge:   "Libre elección · Reembolso 80 % · Máx. 150.000 €/año",
    desc:    "Sin copagos. Elige entre la red Adeslas (+51.000 médicos) o cualquier médico en España y el extranjero. Reembolsamos el 80 % de los costes hasta 150.000 €/año.",
    bullets: ["Reembolso del 80 % hasta 150.000 €/año", "Libre elección de médico en todo el mundo", "Sin copagos en la red Adeslas"],
  },
  "Adeslas Plena": {
    badge:   "Sin copagos · Cobertura completa",
    desc:    "Cobertura médica completa sin copagos con acceso a toda la red Adeslas. Hospitalización, especialidades, cirugía y urgencias 24 h incluidos.",
    bullets: ["Sin copagos", "Hospitalización y cirugía incluidas", "Urgencias 24 h"],
  },
  "Adeslas Negocios NIF": {
    badge:   "Para empleados autónomos y empresas",
    desc:    "Seguro médico sin copagos para autónomos y empresas con chequeo anual incluido. Deducible en IRPF y acceso a toda la red Adeslas.",
    bullets: ["Sin copagos", "Chequeo médico anual incluido", "Deducible en IRPF"],
  },
  "Adeslas Pymes Total": {
    badge:   "Empresas hasta 15 empleados · 3 años sin subidas",
    desc:    "Ofrece a tus empleados el seguro médico sin copagos, con chequeo anual incluido y precio garantizado 3 años. 100 % deducible y sin listas de espera.",
    bullets: ["Precio garantizado 3 años", "Chequeo anual + dental incluidos", "100 % deducible fiscalmente"],
  },
  "Adeslas Seniors": {
    badge:   "Para personas de 55 a 84 años",
    desc:    "Seguro médico específico para personas de 55 a 84 años con asesor de salud personal, especialidades completas y copago con tope anual garantizado.",
    bullets: ["Asesor de salud personal 24 h", "Copago con tope anual garantizado", "Válido de 55 a 84 años"],
  },
  "Adeslas Seniors Total": {
    badge:   "3 años sin subidas · Dental · Asistencia viaje",
    desc:    "La cobertura más completa para personas mayores: garantía de precio 3 años, asistencia en viajes hasta 100.000 €, dental incluido y topes de copago muy competitivos.",
    bullets: ["Precio garantizado 3 años sin subidas", "Dental incluido + asistencia viaje 100.000 €", "Asesor de salud personal 24 h"],
  },
};

const DEFAULT_INFO: ProductInfo = {
  badge:   "Seguro Adeslas 2026",
  desc:    "Cobertura médica completa con acceso a toda la red Adeslas. Más de 51.000 médicos y 1.400 centros en toda España.",
  bullets: ["+51.000 médicos sin listas de espera", "Atención 24 h", "Red de 1.400 centros en España"],
};

/* ─── Tipos públicos ─────────────────────────────────────────── */
export interface ClienteInfo {
  nombre?: string;
  telefono?: string;
  email?: string;
}

export interface PersonaPrecio {
  edad: number;
  precio: number | null;
  banda: string;
}

export interface QuoteData {
  producto:              string;
  provincia:             string;
  zona:                  number;
  preciosPorPersona:     PersonaPrecio[];
  subtotal:              number;
  descAuto:              number;
  ratioAuto:             number;
  labelDescAuto:         string;
  descComercial:         number;
  pctComercialEfectivo:  number;
  total:                 number;
  isSeniors:             boolean;
  totalPuntos:           number;
  puntosXAseg:           number;
  totalAbono:            number;
  abonoXAseg:            number;
  hayNulos:              boolean;
}

/* ─── Helpers ───────────────────────────────────────────────── */
function fmt(n: number): string {
  return n.toFixed(2).replace(".", ",") + " €";
}

function rect(
  doc: jsPDF,
  x: number, y: number, w: number, h: number,
  fill: [number,number,number],
  radius = 0
) {
  doc.setFillColor(...fill);
  if (radius > 0) doc.roundedRect(x, y, w, h, radius, radius, "F");
  else doc.rect(x, y, w, h, "F");
}

function strokeRect(
  doc: jsPDF,
  x: number, y: number, w: number, h: number,
  stroke: [number,number,number],
  radius = 0
) {
  doc.setDrawColor(...stroke);
  if (radius > 0) doc.roundedRect(x, y, w, h, radius, radius, "S");
  else doc.rect(x, y, w, h, "S");
}

/* ─── Función principal ─────────────────────────────────────── */
export function generateQuotePdf(quote: QuoteData, cliente: ClienteInfo): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const PW  = 210;
  const PH  = 297;
  const ML  = 14;
  const MR  = 14;
  const CW  = PW - ML - MR;

  const info = PRODUCT_INFO[quote.producto] ?? DEFAULT_INFO;
  const hoy  = new Date().toLocaleDateString("es-ES", {
    day: "2-digit", month: "long", year: "numeric",
  });

  /* ══════════════════════════════════════════════════════════════
     1 · CABECERA CORPORATIVA
  ══════════════════════════════════════════════════════════════ */
  const HDR_H = 42;

  // Fondo principal azul oscuro
  rect(doc, 0, 0, PW, HDR_H, C_AZUL_OSC);

  // Franja diagonal derecha azul claro (decorativa)
  rect(doc, PW * 0.58, 0, PW * 0.42, HDR_H, C_AZUL_CLA);

  // Línea magenta inferior
  rect(doc, 0, HDR_H - 3, PW, 3, C_MAGENTA);

  // Logo blanco (arriba a la derecha)
  // Dimensiones: ~52 mm de ancho x 18 mm de alto, con margen de 8 mm
  try {
    doc.addImage(
      "data:image/png;base64," + LOGO_B64,
      "PNG",
      PW - MR - 54, 8, 52, 18,
    );
  } catch {
    // Si falla el logo, ponemos texto de fallback
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(255, 255, 255);
    doc.text("ADESLAS · MARCHAL", PW - MR, 14, { align: "right" });
  }

  // Título izquierda
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.setTextColor(...C_WHITE);
  doc.text("PRESUPUESTO", ML, 14);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(190, 220, 255);
  doc.text("Marchal Aseguradores · Agente exclusivo Adeslas", ML, 21);
  doc.text("91 710 50 00  ·  cmarchal@marchalconsultores.com", ML, 26.5);

  // Fecha y número de documento
  doc.setFont("helvetica", "italic");
  doc.setFontSize(7.5);
  doc.setTextColor(200, 225, 255);
  doc.text(hoy, ML, 33);
  doc.text("Adeslas 2026", ML, 37.5);

  let y = HDR_H + 5;

  /* ══════════════════════════════════════════════════════════════
     2 · IDENTIDAD DEL PRODUCTO
  ══════════════════════════════════════════════════════════════ */
  const PROD_H = 32;
  rect(doc, ML, y, CW, PROD_H, C_GRIS_BG, 4);
  strokeRect(doc, ML, y, CW, PROD_H, C_GRIS_BD, 4);

  // Barra lateral de color izquierda
  rect(doc, ML, y, 4, PROD_H, C_AZUL_CLA, 4);
  rect(doc, ML, y + 4, 4, PROD_H - 4, C_AZUL_CLA); // cuadrar parte inferior

  // Nombre del producto
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...C_AZUL_OSC);
  doc.text(quote.producto, ML + 9, y + 9);

  // Badge / tagline
  const badgeX = ML + 9;
  const badgeW = doc.getTextWidth(info.badge) + 6;
  rect(doc, badgeX, y + 11.5, badgeW, 6, C_AZUL_CLA, 2);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...C_WHITE);
  doc.text(info.badge, badgeX + 3, y + 15.8);

  // Descripción del producto
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(80, 90, 110);
  const descLines = doc.splitTextToSize(info.desc, CW - 16) as string[];
  doc.text(descLines.slice(0, 2), ML + 9, y + 21.5);

  // Provincia + Zona (esquina derecha, dentro del bloque)
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(...C_AZUL_CLA);
  doc.text(`📍 ${quote.provincia} · Zona ${quote.zona}`, ML + CW - 4, y + 9, { align: "right" });

  y += PROD_H + 6;

  /* ══════════════════════════════════════════════════════════════
     3 · PUNTOS CLAVE DEL PRODUCTO
  ══════════════════════════════════════════════════════════════ */
  const bulletCols = info.bullets.length;
  const bW = (CW - (bulletCols - 1) * 3) / bulletCols;
  info.bullets.forEach((b, i) => {
    const bx = ML + i * (bW + 3);
    rect(doc, bx, y, bW, 10, [232, 244, 253], 3);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.2);
    doc.setTextColor(...C_AZUL_OSC);
    doc.text("✓  " + b, bx + 3, y + 6.5);
  });

  y += 15;

  /* ══════════════════════════════════════════════════════════════
     4 · DATOS DEL CLIENTE (si los hay)
  ══════════════════════════════════════════════════════════════ */
  const tieneCliente = cliente.nombre || cliente.telefono || cliente.email;
  if (tieneCliente) {
    rect(doc, ML, y, CW, 22, C_GRIS_BG, 3);
    strokeRect(doc, ML, y, CW, 22, C_GRIS_BD, 3);

    // Etiqueta sección
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.setTextColor(...C_AZUL_CLA);
    doc.text("DATOS DEL CLIENTE", ML + 4, y + 6);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...C_GRIS_TX);

    const nCols = [cliente.nombre, cliente.telefono, cliente.email].filter(Boolean).length;
    const colW  = CW / Math.max(nCols, 1);
    let cx = ML + 4;

    if (cliente.nombre) {
      doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(130, 140, 160);
      doc.text("NOMBRE", cx, y + 11.5);
      doc.setFont("helvetica", "bold"); doc.setFontSize(9.5); doc.setTextColor(...C_AZUL_OSC);
      doc.text(cliente.nombre, cx, y + 17.5);
      cx += colW;
    }
    if (cliente.telefono) {
      doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(130, 140, 160);
      doc.text("TELÉFONO", cx, y + 11.5);
      doc.setFont("helvetica", "normal"); doc.setFontSize(9.5); doc.setTextColor(...C_GRIS_TX);
      doc.text(cliente.telefono, cx, y + 17.5);
      cx += colW;
    }
    if (cliente.email) {
      doc.setFont("helvetica", "bold"); doc.setFontSize(7); doc.setTextColor(130, 140, 160);
      doc.text("EMAIL", cx, y + 11.5);
      doc.setFont("helvetica", "normal"); doc.setFontSize(9.5); doc.setTextColor(...C_GRIS_TX);
      doc.text(cliente.email, cx, y + 17.5);
    }

    y += 27;
  }

  /* ══════════════════════════════════════════════════════════════
     5 · TABLA DE ASEGURADOS
  ══════════════════════════════════════════════════════════════ */
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(...C_AZUL_OSC);
  doc.text("DESGLOSE POR ASEGURADO", ML, y + 1);
  y += 4;

  autoTable(doc, {
    startY: y,
    margin: { left: ML, right: MR },
    head: [["#", "Edad", "Tramo", "Prima mensual"]],
    body: quote.preciosPorPersona.map((p, i) => [
      `${i + 1}`,
      `${p.edad} años`,
      p.banda,
      p.precio !== null ? fmt(p.precio) : "N/D",
    ]),
    headStyles: {
      fillColor: C_AZUL_OSC,
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: "bold",
      halign: "left",
      cellPadding: { top: 3, bottom: 3, left: 4, right: 4 },
    },
    bodyStyles: {
      fontSize: 9,
      textColor: C_GRIS_TX,
      cellPadding: { top: 3.5, bottom: 3.5, left: 4, right: 4 },
    },
    columnStyles: {
      0: { cellWidth: 14, halign: "center" },
      1: { cellWidth: 28, halign: "center" },
      2: { cellWidth: 35, halign: "center" },
      3: { cellWidth: 45, halign: "right", fontStyle: "bold" },
    },
    alternateRowStyles: { fillColor: [248, 251, 255] },
    tableWidth: CW,
    theme: "grid",
  });

  y = (doc as unknown as { lastAutoTable: { finalY: number } }).lastAutoTable.finalY + 7;

  /* ══════════════════════════════════════════════════════════════
     6 · RESUMEN DE PRECIOS
  ══════════════════════════════════════════════════════════════ */
  const hayDescuentos = quote.ratioAuto > 0 || quote.pctComercialEfectivo > 0;
  const pricingH = 10 +
    (hayDescuentos ? 8 : 0) +
    (quote.ratioAuto > 0 ? 8 : 0) +
    (quote.pctComercialEfectivo > 0 ? 8 : 0) +
    16;

  rect(doc, ML, y, CW, pricingH, C_GRIS_BG, 4);
  strokeRect(doc, ML, y, CW, pricingH, C_GRIS_BD, 4);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(...C_AZUL_CLA);
  doc.text("RESUMEN DE PRECIOS", ML + 4, y + 6);

  let lineY = y + 12;
  const LX  = ML + 6;
  const RX  = ML + CW - 6;

  // Subtotal
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 115, 135);
  doc.text("Subtotal bruto", LX, lineY);
  doc.text(fmt(quote.subtotal), RX, lineY, { align: "right" });

  // Descuento automático
  if (quote.ratioAuto > 0) {
    lineY += 8;
    doc.setTextColor(...C_VERDE);
    doc.setFont("helvetica", "bold");
    doc.text(`↓  ${quote.labelDescAuto}`, LX, lineY);
    doc.text(`- ${fmt(quote.descAuto)}`, RX, lineY, { align: "right" });
  }

  // Descuento comercial
  if (quote.pctComercialEfectivo > 0) {
    lineY += 8;
    doc.setTextColor(...C_AZUL_CLA);
    doc.setFont("helvetica", "bold");
    doc.text(`↓  Descuento comercial ${quote.pctComercialEfectivo} %`, LX, lineY);
    doc.text(`- ${fmt(quote.descComercial)}`, RX, lineY, { align: "right" });
  }

  // Separador
  lineY += 5;
  doc.setDrawColor(...C_GRIS_BD);
  doc.setLineWidth(0.4);
  doc.line(LX, lineY, RX, lineY);
  lineY += 7;

  // Caja TOTAL (derecha)
  const totalBoxW = 72;
  const totalBoxH = 14;
  rect(doc, RX - totalBoxW, lineY - 10, totalBoxW, totalBoxH, C_AZUL_OSC, 3);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...C_WHITE);
  doc.text(fmt(quote.total), RX - 4, lineY - 1, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(180, 210, 255);
  doc.text("/ mes", RX - 4, lineY + 2, { align: "right" });

  // Label TOTAL (izquierda)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(...C_AZUL_OSC);
  doc.text("TOTAL MENSUAL", LX, lineY - 1);
  if (hayDescuentos) {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(...C_VERDE);
    const saving = quote.subtotal - quote.total;
    doc.text(`Ahorro: ${fmt(saving)} /mes`, LX, lineY + 3.5);
  }

  y = y + pricingH + 7;

  /* ══════════════════════════════════════════════════════════════
     7 · CAMPAÑA SEGURÍSIMOS
  ══════════════════════════════════════════════════════════════ */
  if (!quote.isSeniors && quote.totalPuntos > 0) {
    const tarjeta = Math.floor(quote.totalPuntos / 500) * 50;
    const camH    = tarjeta > 0 ? 36 : 26;

    rect(doc, ML, y, CW, camH, C_AMBAR_BG, 4);
    strokeRect(doc, ML, y, CW, camH, [240, 180, 40], 4);

    // Barra izquierda ámbar
    rect(doc, ML, y, 4, camH, [217, 119, 6], 4);
    rect(doc, ML, y + 4, 4, camH - 4, [217, 119, 6]);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(140, 80, 0);
    doc.text("⭐  CAMPAÑA SEGURÍSIMOS · PUNTOS", ML + 9, y + 7.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 65, 0);
    doc.text(
      `${quote.puntosXAseg.toLocaleString("es-ES")} pts × ${quote.preciosPorPersona.length} asegurado${quote.preciosPorPersona.length > 1 ? "s" : ""} = `,
      ML + 9, y + 15,
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(140, 80, 0);
    const ptsLabel = `${quote.totalPuntos.toLocaleString("es-ES")} puntos`;
    const ptsLabelX = ML + 9 + doc.getTextWidth(
      `${quote.puntosXAseg.toLocaleString("es-ES")} pts × ${quote.preciosPorPersona.length} asegurado${quote.preciosPorPersona.length > 1 ? "s" : ""} = `,
    );
    doc.text(ptsLabel, ptsLabelX, y + 15);

    if (tarjeta > 0) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(30, 30, 30);
      const tarjetaTxt = `🎴  Tarjeta prepago disponible: ${tarjeta} €  (o canjea por otros premios)`;
      rect(doc, ML + 9, y + 18, doc.getTextWidth(tarjetaTxt) + 6, 8.5, [255, 245, 200], 2);
      doc.text(tarjetaTxt, ML + 12, y + 23.5);
    }

    y += camH + 6;
  }

  if (quote.isSeniors && quote.totalAbono > 0) {
    const camH = 30;
    rect(doc, ML, y, CW, camH, C_VERDE_BG, 4);
    strokeRect(doc, ML, y, CW, camH, [134, 200, 134], 4);

    rect(doc, ML, y, 4, camH, C_VERDE, 4);
    rect(doc, ML, y + 4, 4, camH - 4, C_VERDE);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 100, 50);
    doc.text("💶  CAMPAÑA SEGURÍSIMOS · ABONO EN CUENTA", ML + 9, y + 7.5);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(30, 80, 50);
    doc.text(
      `${quote.abonoXAseg} € × ${quote.preciosPorPersona.length} asegurado${quote.preciosPorPersona.length > 1 ? "s" : ""} = `,
      ML + 9, y + 15,
    );
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(15, 100, 50);
    const abonoLabelX = ML + 9 + doc.getTextWidth(
      `${quote.abonoXAseg} € × ${quote.preciosPorPersona.length} asegurado${quote.preciosPorPersona.length > 1 ? "s" : ""} = `,
    );
    doc.text(`${quote.totalAbono} € abono en cuenta`, abonoLabelX, y + 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.5);
    doc.setTextColor(60, 110, 70);
    doc.text("Abono directo en cuenta bancaria tras la contratación del seguro.", ML + 9, y + 23);

    y += camH + 6;
  }

  /* ══════════════════════════════════════════════════════════════
     8 · NOTA / AVISO LEGAL
  ══════════════════════════════════════════════════════════════ */
  const avisoY = Math.max(y + 4, PH - 28);

  doc.setDrawColor(...C_GRIS_BD);
  doc.setLineWidth(0.3);
  doc.line(ML, avisoY, PW - MR, avisoY);

  doc.setFont("helvetica", "italic");
  doc.setFontSize(6.2);
  doc.setTextColor(160, 170, 185);
  const aviso = [
    "Presupuesto orientativo sujeto a aceptación por Adeslas Seguros Médicos, S.A. Precios correspondientes a tarifa 2026. Pueden variar según",
    "cuestionario de salud. Documento emitido por Marchal Aseguradores S.L.U. — Agente exclusivo Adeslas. Avda. de Filipinas 28, 28003 Madrid.",
  ];
  aviso.forEach((l, i) => doc.text(l, ML, avisoY + 5 + i * 4));

  /* ══════════════════════════════════════════════════════════════
     9 · PIE DE PÁGINA
  ══════════════════════════════════════════════════════════════ */
  rect(doc, 0, PH - 9, PW, 9, C_AZUL_OSC);
  rect(doc, 0, PH - 9, 4, 9, C_MAGENTA);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(7);
  doc.setTextColor(180, 210, 255);
  doc.text("Marchal Aseguradores · Agente exclusivo Adeslas", PW / 2, PH - 4.5, { align: "center" });
  doc.setFont("helvetica", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(130, 165, 215);
  doc.text("91 710 50 00  ·  cmarchal@marchalconsultores.com  ·  adeslas.numero1salud.es", PW / 2, PH - 1.5, { align: "center" });

  /* ══════════════════════════════════════════════════════════════
     10 · DESCARGA
  ══════════════════════════════════════════════════════════════ */
  const clienteSlug = cliente.nombre
    ? `_${cliente.nombre.replace(/\s+/g, "-").toLowerCase()}`
    : "";
  const productoSlug = quote.producto.replace(/\s+/g, "-").toLowerCase();
  const fecha = new Date().toISOString().slice(0, 10);
  doc.save(`presupuesto-adeslas_${productoSlug}${clienteSlug}_${fecha}.pdf`);
}
