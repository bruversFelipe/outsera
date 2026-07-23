import fs from "node:fs";
import path from "node:path";
import { app } from "./server";
import { loadMoviesFromCsv } from "./loaders/csvLoader";

const DEFAULT_CSV_PATH = path.resolve(__dirname, "../data/Movielist.csv");
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

export async function resolveCsvSource(): Promise<string> {
  const cliFlagIndex = process.argv.indexOf("--csv");
  if (cliFlagIndex !== -1 && process.argv[cliFlagIndex + 1]) {
    const csvPath = path.resolve(process.argv[cliFlagIndex + 1]);
    return fs.readFileSync(csvPath, "utf-8");
  }

  if (!process.stdin.isTTY) {
    const stdinContent = await readStdin();
    if (stdinContent.trim().length > 0) {
      return stdinContent;
    }
  }

  return fs.readFileSync(DEFAULT_CSV_PATH, "utf-8");
}

function readStdin(): Promise<string> {
  return new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf-8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => resolve(data));
    process.stdin.on("error", reject);
  });
}

async function main(): Promise<void> {
  const csvContent = await resolveCsvSource();
  loadMoviesFromCsv(csvContent);

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${PORT}`);
  });
}

main().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", error);
  process.exit(1);
});
