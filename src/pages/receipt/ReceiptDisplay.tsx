import { useParams, Navigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import { useEffect, useState } from 'react';
import bnbreceipt from '@/assets/bnbreceipt.png'

interface Transaction {
    created_at: string,
    purchases: Purchase[]
}

interface Purchase {
    item: string,
    quantity: string,
    price: string
}

interface ReceiptData {
    user: {name: string, img: string},
    transactions: Transaction[]
} 

export default function ReceiptPage() {
    const { UID } = useParams();
    const [data, setData] = useState<ReceiptData | null>(null);
    const [loading, setLoading] = useState(true);
    const [invalid, setInvalid] = useState(false);
    const [total, setTotal] = useState<number>(0);

    const dummyData: ReceiptData = JSON.parse(`{
    "user": {
        "name": "opensaucebaby!",
        "img": "http://placehold.jp/150x150.png"
    },
    "transactions": [
        {
        "created_at": "07/15/2026 21:15",
        "purchases": [
            {
            "item": "Hot Cheetos",
            "quantity":2,
            "price":2.50
            },
            {
            "item": "Red Bull Sudachi Lime",
            "quantity":1,
            "price":3.00
            }
        ]
        }
    ]
    }`)

    // first check if url is a url
    let decodedSlug: string;
    try {
        decodedSlug = decodeURIComponent(UID || '.');
    } catch {
        return <Navigate to="/receipt/invalid" replace />;
    }

    // now check if url is letters and numbers only because thats what we expect
    const isValidSlug = /^[0-9a-fA-F]+$/.test(decodedSlug);

    if ( !isValidSlug) {
        return <Navigate to="/receipt/invalid" replace />;
    }

  useEffect(() => {
    if (!isValidSlug) {
      setInvalid(true);
      setLoading(false);
      return;}

    let cancelled = false;

    async function fetchData() {
      try {
        const url = `${import.meta.env.VITE_PUBLIC_API_ENDPOINT}/receipt/${decodedSlug}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: import.meta.env.VITE_PUBLIC_API_AUTH || '',
          },
        });

        if (response.ok) {
          const json = await response.json();
          if (!cancelled) setData(json);
        } else {
          if (!cancelled) setInvalid(true);
        }
      } catch {
        if (!cancelled) setInvalid(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchData();
    // setData(dummyData);
    // setInvalid(false);
    // setLoading(false);

    return () => {
      cancelled = true;
    };
  }, [decodedSlug]); 

    useEffect(() => {
        if (data?.transactions) {
            const tot = data.transactions.reduce((s, trans) => s+ +trans.purchases.reduce((s, purc) => s+ (+purc.price * +purc.quantity), 0), 0);
            setTotal(tot);
        }
    },[data])

    if (!data) return <div className="h-[77.9vh] flex flex-col flex-1 items-center justify-center p-2 pb-3 bg-black"></div>

  return (
    <div className="min-h-full flex flex-col flex-1 h-full items-center justify-center p-2 pb-3 bg-black">
      <Card className="receipt-slide-anim rounded-none w-96 min-h-[75vh] max-w-md bg-background overflow-hidden relative">
        <h1 className='z-0 absolute opacity-5 select-none text-8xl -mt-4'>{decodedSlug}</h1>
        <CardHeader className="space-y-1 z-20 pt-6 pb-0 text-center text-xs font-display">
          {/* <CardTitle className="font-display text-2xl text-center">Open Sauce '26 Receipt</CardTitle> */}
          <img src={bnbreceipt} className='px-12' />
          <p className='text-base'>*CUSTOMER COPY*</p>
          <p>RECEIPT PRINTED ON: {new Date().toLocaleDateString()}</p>
          <div className="flex items-center justify-between mt-4">
            <span className='w-full text-center'>customer name: {data && <span className='font-display'>{data.user.name}</span>}</span>
            {/* <div className="rounded-full bg-primary/10 overflow-hidden w-12 h-12">
              {data && <img src={data.user.img} width={64} height={64} />}
            </div> */}
          </div>
        </CardHeader>
        <p className='w-full px-2 tracking-widest'>-------------------------------------------------------------</p>
        <p className='text-center w-full font-display text-base pb-2'>TRANSACTION HISTORY</p>
        <CardContent className='text-xs'>
            {data && data.transactions.map((transaction) => {
                return (<div key={transaction.created_at}>
                    <h3 className='text-[1.1em] pb-1'>{new Date(transaction.created_at).toLocaleString()}</h3>
                    <ul>
                        {transaction.purchases && transaction.purchases.map((purchase) => {
                            return purchase && <li className='font-display' key={transaction.created_at+purchase.item}>
                                <p>{purchase.item}</p>
                                <div className='w-full flex justify-between pb-1'>
                                    <p className='pl-3 text-[0.75em]'>{purchase.quantity} count</p>
                                    <div>
                                        <p>${(+purchase.quantity * + (+purchase.price)).toFixed(2)}</p>
                                        <p className='text-[0.75em]'>@ ${(+purchase.price).toFixed(2)} ea.</p>
                                    </div>
                                </div>
                            </li>
                        })}
                    </ul>
                </div>)
            }
            )
            }
        </CardContent>
        <p className='w-full px-2 tracking-widest'>-------------------------------------------------------------</p>
        <CardContent className='text-right font-display text-xs pt-0 pb-2'>
            <div className='flex justify-between w-full pr-6'><p>total:</p><p>${total.toFixed(2)}</p></div>
            <div className='flex justify-between w-full pr-6'><p>OPEN SAUCE 2026 DISCOUNT:</p><p>-${total.toFixed(2)}</p></div>
            <p className='text-xs pr-2'>---------</p>
            <div className='flex justify-between w-full px-6'><p>amount owed:</p><p>$0.00</p></div>
        </CardContent>
        <p className='w-full text-center text-xs font-display mt-2'>THANKS FOR VISITING BITS 'N BYTES !!!!!</p>
      </Card>
    </div>
    )
}