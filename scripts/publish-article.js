#!/usr/bin/env node
/**
 * publish-article.js
 * ──────────────────
 * Lee el primer artículo de blogPostsQueue.json, lo inyecta en blogPosts.ts,
 * elimina ese artículo de la cola y hace git commit + push para activar
 * el autodeploy de Vercel.
 *
 * Uso manual:  node scripts/publish-article.js
 * Uso cron:    ejecutado automáticamente cada 72 horas por el scheduler
 */

const fs   = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ── Rutas ──────────────────────────────────────────────────────────────────
const ROOT      = path.resolve(__dirname, "..");
const QUEUE     = path.join(ROOT, "src/data/blogPostsQueue.json");
const BLOG_TS   = path.join(ROOT, "src/data/blogPosts.ts");

// ── 1. Leer la cola ────────────────────────────────────────────────────────
if (!fs.existsSync(QUEUE)) {
  console.log("⚠️  No existe blogPostsQueue.json. Nada que publicar.");
  process.exit(0);
}

const queue = JSON.parse(fs.readFileSync(QUEUE, "utf8"));

if (!Array.isArray(queue) || queue.length === 0) {
  console.log("✅ La cola está vacía. No hay artículos pendientes.");
  process.exit(0);
}

// ── 2. Tomar el primero ────────────────────────────────────────────────────
const article = queue[0];
const remaining = queue.slice(1);

console.log(`📰 Publicando: "${article.title}"`);
console.log(`   Slug: ${article.slug}`);
console.log(`   Categoría: ${article.category}`);
console.log(`   Artículos restantes en cola: ${remaining.length}`);

// ── 3. Leer el fichero blogPosts.ts ───────────────────────────────────────
let blogTs = fs.readFileSync(BLOG_TS, "utf8");

// ── 4. Construir el bloque TypeScript del artículo ────────────────────────
function jsonToTs(obj, indent = 2) {
  return JSON.stringify(obj, null, indent)
    .replace(/"([^"]+)":/g, "$1:");   // quita comillas en claves
}

const articleBlock = `
  /* ── ${article.category}: ${article.slug} ── */
  {
    slug: ${JSON.stringify(article.slug)},
    category: ${JSON.stringify(article.category)},
    title: ${JSON.stringify(article.title)},
    excerpt: ${JSON.stringify(article.excerpt)},
    date: ${JSON.stringify(article.date)},
    readTime: ${JSON.stringify(article.readTime)},
    image: ${JSON.stringify(article.image)},
    seoTitle: ${JSON.stringify(article.seoTitle)},
    seoDescription: ${JSON.stringify(article.seoDescription)},
    body: ${JSON.stringify(article.body, null, 4).replace(/^/gm, "    ").trimStart()},
    relatedSlugs: ${JSON.stringify(article.relatedSlugs)},
  },

`;

// ── 5. Inyectar antes del cierre del array ────────────────────────────────
const MARKER = "];\n\nexport const getPostBySlug";
if (!blogTs.includes(MARKER)) {
  console.error("❌ No se encontró el marcador de inserción en blogPosts.ts");
  console.error("   Busca la línea: ];\n\nexport const getPostBySlug");
  process.exit(1);
}

blogTs = blogTs.replace(MARKER, articleBlock + MARKER);
fs.writeFileSync(BLOG_TS, blogTs, "utf8");
console.log("✅ Artículo añadido a blogPosts.ts");

// ── 6. Actualizar la cola ─────────────────────────────────────────────────
fs.writeFileSync(QUEUE, JSON.stringify(remaining, null, 2), "utf8");
console.log(`✅ Cola actualizada (${remaining.length} artículos restantes)`);

// ── 7. Git commit + push ──────────────────────────────────────────────────
try {
  const gitDir = ROOT;
  const run = (cmd) => execSync(cmd, { cwd: gitDir, stdio: "inherit" });

  run("git add src/data/blogPosts.ts src/data/blogPostsQueue.json");
  run(`git commit -m "blog: publicar artículo '${article.slug}' [auto]"`);
  run("git push");

  console.log(`🚀 Push completado. Vercel desplegará en breve.`);
  console.log(`   URL prevista: https://adeslas.numero1salud.es/blog/${article.slug}`);
} catch (err) {
  console.error("⚠️  Error en git push:", err.message);
  console.error("   El artículo ya está en blogPosts.ts.");
  console.error("   Haz git push manualmente para activar el deploy.");
  process.exit(1);
}
