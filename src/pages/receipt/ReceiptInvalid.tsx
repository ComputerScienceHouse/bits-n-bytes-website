import { useParams, Navigate } from 'react-router-dom';

export default function InvalidReceiptPage() {

    return (
        <div className="min-h-full flex flex-col flex-1 h-full items-center justify-center p-2 pb-3 bg-black text-white font-display">
            this doesnt look right...we were unable to process your receipt :(
        </div>
    )
}