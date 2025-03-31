import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function GET() {
  return new Promise((resolve) => {
    const pythonProcess = spawn('python3', ['scripts/scan_nfc.py']);

    let nfcData = '';

    pythonProcess.stdout.on('data', (data) => {
      nfcData += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve(NextResponse.json({ uid: nfcData.trim() }));
      } else {
        resolve(NextResponse.json({ error: 'Failed to scan NFC' }, { status: 500 }));
      }
    });
  });
}
