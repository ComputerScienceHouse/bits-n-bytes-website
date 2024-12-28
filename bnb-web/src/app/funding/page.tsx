export default function FundingPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <h1 className="text-4xl font-bold text-white mb-4">
                What We're Looking For: 
            </h1>
            <h2 className="text-lg text-white max-w-2xl mx-auto">
                Freight Shipping: $3600
            </h2>
            <h2 className="text-lg text-white max-w-2xl mx-auto">
                AirBNB: $3000
            </h2>
            <h2 className="text-lg text-white max-w-2xl mx-auto">
                Items To Go In The Cabinet: $3500
            </h2>
            <h2 className="text-lg text-white max-w-2xl mx-auto">
                Rental Cars: $1000
            </h2>
            <h2 className="text-lg text-white max-w-2xl mx-auto">
                Plane Tickets: $4800
            </h2>
            <h1 className="text-4xl font-bold text-white mb-4">
                Total: $15900
            </h1>
            <p className="text-lg text-white max-w-2xl mx-auto">
                If you are interested in funding this project, please contact us at our 
                <a href="contact"> contact page.</a>
            </p>
        </div>
    );
}

        