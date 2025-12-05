import { SerialPort } from 'serialport';
import { Buffer } from 'buffer';

const portPath: string = process.env.NEXT_PUBLIC_NFC_SERIAL_PORT || '/dev/ttyS0'; // COM port for the connected device
const baudRate: number = 9600;
const PAYLOAD_SIZE: number = 7;
const TIMEOUT_MS: number = 5000; // 5-second timeout for read operation

const ACK_PAYLOAD: Buffer = Buffer.alloc(PAYLOAD_SIZE);
ACK_PAYLOAD[0] = 0xFF;

/**
 * Reads a single PAYLOAD_SIZE-byte NFC counter packet from the serial port.
 * Includes resource cleanup and a timeout mechanism.
 * @returns {Promise<number>} The decoded counter value (used as UID).
 */
export default function readNFC(): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    let port: SerialPort | undefined;
    let timeoutId: NodeJS.Timeout | undefined;

    console.log("begin nfc")

    try {
      port = new SerialPort({ 
        path: portPath, 
        baudRate: baudRate,
        autoOpen: false 
      });
    } catch (e: unknown) {
        const error = e instanceof Error ? e.message : 'Unknown error during SerialPort instantiation.';
        return reject(new Error(`Failed to instantiate SerialPort: ${error}`));
    }

    console.log('serial started')

    let receiveBuffer: Buffer = Buffer.alloc(0);

    // Handles cleanup (clearing timeout, closing port) and rejection
    const cleanupAndReject = (error: Error): void => {
        if (timeoutId) clearTimeout(timeoutId);
        if (port && port.isOpen) {
            port.close((err?: Error | null) => {
                if (err) console.error('Error closing port after rejection:', err.message);
                reject(error);
            });
        } else {
            reject(error);
        }
    };

    // Handles cleanup and successful resolution
    const cleanupAndResolve = (value: number): void => {
        if (timeoutId) clearTimeout(timeoutId);
        if (port && port.isOpen) {
            port.close((err?: Error | null) => {
                if (err) console.error('Error closing port after resolution:', err.message);
                resolve(value); 
            });
        } else {
            resolve(value);
        }
    };

    // Set a reading timeout
    timeoutId = setTimeout(() => {
        cleanupAndReject(new Error(`Read timeout: No data received within ${TIMEOUT_MS}ms.`));
    }, TIMEOUT_MS);

    // --- Serial Port Handlers ---

    port.on('open', () => {
      console.log('Serial Port Opened Successfully.');

      // Send the initial ACK payload
      port!.write(ACK_PAYLOAD, (err?: Error | null) => {
        if (err) {
          return cleanupAndReject(new Error('Error on write: ' + err.message));
        }
        console.log('Pi: Initial 7-byte message sent.');
      });
    });

    port.on('data', (data: Buffer) => {
      // Clear the read timeout when data is received
      if (timeoutId) clearTimeout(timeoutId);

      receiveBuffer = Buffer.concat([receiveBuffer, data]);

      // Process all available full packets
      while (receiveBuffer.length >= PAYLOAD_SIZE) {
        const packet: Buffer = receiveBuffer.subarray(0, PAYLOAD_SIZE);
        receiveBuffer = receiveBuffer.subarray(PAYLOAD_SIZE);

        // Read the 4-byte counter (Big Endian)
        const counter: number = packet.readUInt32BE(0);
        console.log(`Decoded Counter: ${counter}`);

        // Resolve the promise and close the port after reading the first packet
        cleanupAndResolve(counter);
        return; 
      }
    });

    port.on('error', (err: Error) => {
      cleanupAndReject(new Error('Serial Port Error: ' + err.message));
    });

    port.on('close', () => {
        console.log('Serial Port manually closed.');
    });

    // Attempt to open the port
    port.open((err?: Error | null) => {
        if (err) {
            return cleanupAndReject(new Error('Error opening port: ' + err.message));
        }
    });
  });
}