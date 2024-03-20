import { transform, bundle } from "lightningcss";
import { writeFileSync } from "fs";
import { env } from "process";

try {
  const start = performance.now();

  // const { css: compiled } = sass.compile("_src/_assets/styles/main.scss", {
  //   loadPaths: ["./_src/_assets/styles", "./node_modules"]
  // });

  const { code: bundled } = bundle({
    filename: "./src/styles/all.css",
    minify: false
  });

  if (env === "production" || true) {
    const { code: transformed } = transform({
      code: bundled,
      minify: true
    });
    writeFileSync("./assets/main.css", transformed);
  } else {
    // writeFileSync("./assets/main.css", bundled);
  }

  const end = performance.now();
  console.log(`Compiled all CSS in ${Math.round(end - start)}ms.`);
} catch (err) {
  console.error(err);
}
