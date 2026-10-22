import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const distDir = process.env.NEXT_DIST_DIR || ".next";
const scriptPattern = /<script\b([^>]*?)\bsrc="([^"]+)"([^>]*)>\s*<\/script>/gi;
const preloadPattern = /<link\b(?=[^>]*\brel="preload")(?=[^>]*\bas="script")[^>]*>/gi;
const loaderPattern = /<script data-defer-scripts>[\s\S]*?<\/script>/;

function readAttribute(source, name) {
  const match = new RegExp(`\\b${name}="([^"]*)"`, "i").exec(source);
  return match?.[1] ?? "";
}

function buildLoader(scripts) {
  return `<script data-defer-scripts>(function(){var items=${JSON.stringify(scripts)};var started=false;function append(item){var script=document.createElement("script");script.src=item.src;script.async=true;if(item.id)script.id=item.id;if(item.noModule)script.noModule=true;if(item.integrity)script.integrity=item.integrity;if(item.crossOrigin)script.crossOrigin=item.crossOrigin;document.body.appendChild(script);return script;}function preloadAll(list,done){var pending=list.length;if(!pending){done();return;}for(var i=0;i<list.length;i++){var link=document.createElement("link");link.rel="preload";link.as="script";link.href=list[i].src;link.onload=link.onerror=function(){pending-=1;if(pending===0)done();};document.head.appendChild(link);}}function load(){var runtime=null;var rest=[];for(var i=0;i<items.length;i++){var item=items[i];if(item.noModule){append(item);continue;}if(item.id&&!runtime)runtime=item;else rest.push(item);}function execute(){function loadRest(){for(var j=0;j<rest.length;j++)append(rest[j]);}if(!runtime){loadRest();return;}var script=append(runtime);script.onload=script.onerror=loadRest;}var classics=[];if(runtime)classics.push(runtime);for(var k=0;k<rest.length;k++)classics.push(rest[k]);preloadAll(classics,execute);}function start(){if(started)return;started=true;requestAnimationFrame(function(){requestAnimationFrame(load);});}function painted(entry){return entry.name==="first-paint"||entry.name==="first-contentful-paint";}function whenPainted(callback){var paints=performance.getEntriesByType("paint");for(var i=0;i<paints.length;i++){if(painted(paints[i])){callback();return;}}try{var observer=new PerformanceObserver(function(list){var entries=list.getEntries();for(var j=0;j<entries.length;j++){if(painted(entries[j])){observer.disconnect();callback();return;}}});observer.observe({type:"paint",buffered:true});}catch(error){callback();}}whenPainted(start);setTimeout(start,2000);})();</script>`;
}

function stripPreloads(html) {
  return html.replace(preloadPattern, "");
}

export function deferDocumentScripts(html) {
  const existingLoader = html.match(
    /<script data-defer-scripts>[\s\S]*?var items=(\[[\s\S]*?\]);/,
  );
  if (existingLoader) {
    const scripts = JSON.parse(existingLoader[1]);
    return stripPreloads(html.replace(loaderPattern, buildLoader(scripts)));
  }

  const scripts = [];
  const withoutScripts = html.replace(scriptPattern, (tag, before, src, after) => {
    if (!src.includes("/_next/static/") || !src.endsWith(".js")) return tag;

    const attrs = `${before} ${after}`;
    scripts.push({
      src,
      id: readAttribute(attrs, "id"),
      noModule: /\bnoModule\b/i.test(attrs),
      integrity: readAttribute(attrs, "integrity"),
      crossOrigin: readAttribute(attrs, "crossorigin"),
    });
    return "";
  });

  if (scripts.length === 0) return html;

  const loader = buildLoader(scripts);
  const withLoader = withoutScripts.includes("</body>")
    ? withoutScripts.replace("</body>", `${loader}</body>`)
    : `${withoutScripts}${loader}`;

  return stripPreloads(withLoader);
}

async function collectHtml(directory, files = []) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        await collectHtml(fullPath, files);
        return;
      }
      if (entry.name.endsWith(".html")) files.push(fullPath);
    }),
  );

  return files;
}

async function main() {
  const serverDir = path.join(process.cwd(), distDir, "server");
  const files = await collectHtml(serverDir);
  let changed = 0;

  for (const file of files) {
    const html = await readFile(file, "utf8");
    const next = deferDocumentScripts(html);
    if (next === html) continue;
    await writeFile(file, next);
    changed += 1;
  }

  console.log(`deferred scripts in ${changed} html files`);
}

const isDirectRun = process.argv[1] && import.meta.url.endsWith(path.basename(process.argv[1]));

if (isDirectRun) {
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
}
