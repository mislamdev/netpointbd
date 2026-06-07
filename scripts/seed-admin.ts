import { createInterface } from "readline/promises";
import { stdin, stdout } from "process";
import { createUser } from "../lib/auth";
import { readJSON, writeJSON } from "../lib/db";
import type { User } from "../lib/types";

async function prompt(rl: ReturnType<typeof createInterface>, question: string, silent = false): Promise<string> {
  if (!silent) {
    process.stdout.write(question);
  }
  return new Promise((resolve) => {
    if (silent) {
      let input = "";
      const onData = (chunk: Buffer) => {
        const c = chunk.toString("utf-8");
        switch (c) {
          case "\n":
          case "\r":
          case "\u0004":
            stdin.removeListener("data", onData);
            process.stdout.write("\n");
            resolve(input);
            break;
          case "\u0003":
            process.exit(1);
            break;
          default:
            input += c;
            process.stdout.write("*");
            break;
        }
      };
      stdin.on("data", onData);
      return;
    }
    rl.question(question).then(resolve);
  });
}

async function main() {
  const existing = await readJSON<User[]>("users");
  const rl = createInterface({ input: stdin, output: stdout });

  console.log("");
  console.log("Net Point BD — Create admin user");
  console.log("=================================");
  if (existing.length > 0) {
    console.log(`Existing users: ${existing.map((u) => u.username).join(", ")}`);
  }
  console.log("");

  const username = (await prompt(rl, "Username: ")).trim();
  if (!username) {
    console.error("Username is required.");
    process.exit(1);
  }
  if (existing.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    console.error(`A user with username "${username}" already exists.`);
    process.exit(1);
  }

  process.stdout.write("Password (min 6 chars): ");
  const password = await prompt(rl, "", true);
  if (password.length < 6) {
    console.error("Password must be at least 6 characters.");
    process.exit(1);
  }
  process.stdout.write("Confirm password: ");
  const confirm = await prompt(rl, "", true);
  if (password !== confirm) {
    console.error("Passwords do not match.");
    process.exit(1);
  }

  process.stdout.write("Role (admin/editor) [admin]: ");
  const roleInput = (await prompt(rl, "")).trim().toLowerCase();
  const role = roleInput === "editor" ? "editor" : "admin";

  rl.close();

  const user = await createUser(username, password, role);
  await writeJSON("users", [...existing, user]);
  console.log("");
  console.log(`✓ User "${user.username}" (${user.role}) created.`);
  console.log("  You can now sign in at /admin/login.");
  console.log("");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
