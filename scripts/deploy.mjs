// Publica la web en GitHub Pages (rama gh-pages).
// Uso: npm run deploy
// 1) Compila con el basePath del repositorio  2) sube la carpeta out/ a la rama gh-pages.
import { execSync } from "node:child_process";
import { writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const run = (cmd, opts = {}) => execSync(cmd, { stdio: "inherit", ...opts });
const read = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();

const remote = read("git remote get-url origin");
const repo = remote.replace(/\.git$/, "").split("/").pop();
const basePath = `/${repo}`;

console.log(`\n▶ Compilando para GitHub Pages con basePath ${basePath}\n`);
run("npx next build", { env: { ...process.env, BASE_PATH: basePath } });

const out = join(process.cwd(), "out");
writeFileSync(join(out, ".nojekyll"), ""); // permite servir la carpeta _next
rmSync(join(out, ".git"), { recursive: true, force: true });

console.log("\n▶ Subiendo out/ a la rama gh-pages\n");
run("git init -q -b gh-pages", { cwd: out });
run("git add -A", { cwd: out });
run('git -c user.name="durducco-source" -c user.email="durduc.co@gmail.com" commit -q -m "Publicación en GitHub Pages"', { cwd: out });
run(`git push -f -q ${remote} gh-pages`, { cwd: out });
rmSync(join(out, ".git"), { recursive: true, force: true });

console.log(`\n✔ Publicado. Web: https://durducco-source.github.io${basePath}/\n`);
