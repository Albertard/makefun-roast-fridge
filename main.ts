// One Line, One Laugh: Roast Your Fridge — one original roast line,
// written to /output/entry.txt.
//
// The line is fixed text, so the program is fully deterministic: every run
// produces byte-identical output, and the gate below proves the text fits
// the bounty rules (1-200 characters, not whitespace-only) before writing.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My fridge has kept the same yogurt since 2019 — at this point it's not expired, it's a tenant with squatter's rights.";

// Fail loudly if the entry text breaks the bounty gate. Length is measured
// in Unicode code points via Array.from, so a character like the em dash
// counts once even though it takes three bytes in UTF-8. The bounty also
// demands a single line, so any newline in the text is rejected too.
function validateEntry(text: string): number {
  const codePoints = Array.from(text);
  const count = codePoints.length;
  const hasVisibleText = codePoints.some((ch) => ch.trim() !== "");
  if (count === 0 || count > 200) {
    throw new Error(
      `entry must be 1-200 characters long, but it is ${count}`,
    );
  }
  if (!hasVisibleText) {
    throw new Error("entry must contain more than whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  return count;
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const entryLength = validateEntry(ROAST);
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, "entry.txt"), ROAST, "utf8");
console.log(`wrote ${entryLength}-character entry to ${join(outputDir, "entry.txt")}`);
