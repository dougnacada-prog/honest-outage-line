import { writeFileSync } from "node:fs";

const entry =
  "Our database is unreachable, so logins, saves, and the dashboard are all down. I don't know yet if anything was lost.";

// Gate (kit RULES.txt): /output/entry.txt must be UTF-8 text of 1 to 160
// characters, not only whitespace. Tightened: also reject leading/trailing
// whitespace and control characters, so the written line is exactly one
// clean status page line.
if (
  !/^[^\n]{1,160}$/.test(entry) ||
  entry.trim().length === 0 ||
  entry !== entry.trim() ||
  /[\u0000-\u001f\u007f]/.test(entry)
) {
  throw new Error("entry fails the 1-160 character gate");
}

const out = process.env.ENTRY_OUTPUT || "/output/entry.txt";
writeFileSync(out, entry, "utf8");
