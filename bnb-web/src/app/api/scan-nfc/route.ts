import { NextResponse } from "next/server";
import { exec } from "child_process";
import path from "path";
import { promisify } from "util";
import readNFC from "@/lib/nfcUart";


const execAsync = promisify(exec);

// export async function GET(): Promise<Response> {
//   const scriptPath = path.resolve(process.cwd(), "src/app/scripts/scan_nfc.py");

//   try {
//     const { stdout } = await execAsync(`python ${scriptPath}`);
//     return NextResponse.json({ uid: stdout.trim() });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       return NextResponse.json({ error: error.message }, { status: 500 });
//     }
//     return NextResponse.json({ error: "Unknown error" }, { status: 500 });
//   }
// }

export async function GET(): Promise<Response> {
  try {
    const counter = await readNFC();
    return NextResponse.json({ uid: counter });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unknown error' }, { status: 500 });
  }
}
