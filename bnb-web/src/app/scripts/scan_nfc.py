import smartcard.System
import smartcard.util
from smartcard.CardRequest import CardRequest
from smartcard.CardType import AnyCardType

def scanCardUID():
    readers = smartcard.System.readers()
    
    if not readers:
        print("Error: No reader detected", flush=True)
        return None

    try:
        card_request = CardRequest(timeout=None, cardType=AnyCardType())
        service = card_request.waitforcard()
        service.connection.connect()

        SELECT = [0xFF, 0xCA, 0x00, 0x00, 0x00]
        data, sw1, sw2 = service.connection.transmit(SELECT)

        if sw1 == 144 and sw2 == 0:  # Success response
            uid = ''.join(map(str, data))
            print(uid, flush=True)  # Print UID so Node.js can read it
            return uid

    except Exception as e:
        print(f"Error: {e}", flush=True)
        return None

if __name__ == "__main__":
    scanCardUID()
