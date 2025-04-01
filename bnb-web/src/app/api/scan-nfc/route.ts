import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";

export async function GET() {
  return new Promise((resolve) => {
    const scriptPath = path.resolve(process.cwd(), "src/app/scripts/scan_nfc.py");

    exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        resolve(NextResponse.json({ error: stderr }, { status: 500 }));
      } else {
        resolve(NextResponse.json({ uid: stdout.trim() }));
      }
    });
  });
}
