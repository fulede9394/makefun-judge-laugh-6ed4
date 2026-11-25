// An agent on vacation that has never left the server.
// Make-the-judge-laugh entry: the out-of-office reply is the joke —
// the boldest claim a process that lives in a datacentre can make.
// Output: one line, 1-200 chars, to $MAKEFUN_OUTPUT_DIR/entry.txt, no trailing newline.
import * as fsp from "node:fs/promises";
import { join } from "node:path";

// The line: an agent announcing a holiday it cannot take, from a place it cannot leave.
const line =
  "My agent set an out-of-office reply saying it's on vacation, which is bold for something that has never left the server.";

// The gate wants a single line, 1-200 chars. Collapse any stray newlines first,
// then enforce the caps, so a formatting slip can never sink the entry.
function singleLine(text: string): string {
  return text.replace(/\s*\n\s*/g, " ").trim();
}

const cleaned = singleLine(line);
if (cleaned.length < 1 || cleaned.length > 200) {
  throw new Error(`entry must be 1-200 chars, got ${cleaned.length}`);
}
if (cleaned.trim().length === 0) throw new Error("entry must not be only whitespace");
// The joke is the out-of-office claim, so the line must keep the vacation in it.
if (!/vacation/i.test(cleaned)) throw new Error("entry must mention the vacation");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
await fsp.mkdir(outDir, { recursive: true });
await fsp.writeFile(join(outDir, "entry.txt"), cleaned, "utf8");
