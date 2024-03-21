import chokidar from "chokidar";
import { writeFileSync } from "fs";
import { bundle, transform } from "lightningcss";
import { env } from "process";
import * as sass from "sass";

// Dawn CSS
try {
  const { code: bundled } = bundle({
    filename: "./src/styles/dawn.css",
    minify: false
  });

  const { code: transformed } = transform({
    code: bundled,
    minify: true
  });

  writeFileSync("./assets/dawn.css", transformed);

  console.log("Compiled all Dawn CSS");
} catch (err) {
  console.error(err);
}

// LRT SCSS
chokidar.watch("./src/styles/**/*.scss").on("change", async path => {
  console.log(`File ${path} has been changed, recompiling...`);

  try {
    const start = performance.now();

    const { css: compiled } = sass.compile("./src/styles/main.scss", {
      loadPaths: ["./src/styles/", "./node_modules"]
    });

    if (env === "production") {
      const { code: transformed } = transform({
        code: compiled,
        minify: true
      });
      writeFileSync("./assets/main.css", transformed);
    } else {
      writeFileSync("./assets/main.css", compiled);
    }

    const end = performance.now();
    console.log(`Compiled all SCSS in ${Math.round(end - start)}ms.`);
  } catch (err) {
    console.error(err);
  }
});
