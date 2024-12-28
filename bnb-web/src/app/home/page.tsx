export default function HomePage() {
  return (
    <div className="w-screen h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll bg-black text-white box-border">
      {/* Header Section */}
      <section className="flex flex-col items-center justify-center h-screen snap-start px-6 w-[calc(100%-200px)] mx-auto">
        <h1 className="text-7xl font-extrabold text-center text-gradient mb-6">
          Bits 'n Bytes
        </h1>
        <h2 className="text-4xl font-semibold text-gray-300 mb-4">
          AI and Sensor-Driven Vending Machine
        </h2>
        <p className="text-2xl text-gray-200 max-w-4xl leading-relaxed text-center">
          Bits 'n Bytes is a next-generation vending machine concept made by Computer Science House. It uses AI and sensors to make informed decisions for a seamless, futuristic shopping experience.
        </p>
      </section>

      {/* What We Have Done Section */}
      <section className="flex flex-col items-center justify-center h-screen snap-start px-6 w-[calc(100%-200px)] mx-auto bg-gray-900 py-16">
        <h2 className="text-6xl font-bold mb-6 text-gradient">
          What We Have Done
        </h2>
        <p className="text-2xl text-gray-300 leading-relaxed mb-6 max-w-3xl text-center">
          Our fully-built cabinet is designed to revolutionize vending machines:
        </p>
        <ul className="text-2xl text-gray-200 list-none space-y-6 text-left max-w-2xl mx-auto">
          <li>🚪 <strong>Seamless Access</strong>: Functioning doors open automatically when a user taps their ID card.</li>
          <li>🛒 <strong>Smart Shelves</strong>: Load cells on every shelf detect when items are picked up or placed back.</li>
          <li>🤖 <strong>AI-Driven Insights</strong>: Cameras installed on both sides of the cabinet, powered by NVIDIA Jetson, enable advanced detection and tracking.</li>
          <li>📟 <strong>Interactive Cart Screen</strong>: A Raspberry Pi with an integrated screen displays real-time cart information for users.</li>
        </ul>
      </section>

      {/* Looking to the Future Section */}
      <section className="flex flex-col items-center justify-center h-screen snap-start px-6 w-[calc(100%-200px)] mx-auto bg-gray-800 py-16">
        <h2 className="text-6xl font-bold mb-6 text-gradient">
          Looking to the Future
        </h2>
        <p className="text-2xl text-gray-300 leading-relaxed max-w-3xl text-center">
          We're exploring innovative ways to enhance the customer experience:
        </p>
        <ul className="text-2xl text-gray-200 list-none space-y-6 mt-4 text-left max-w-2xl mx-auto">
          <li>💬 <strong>AI Communication</strong>: An AI-powered large language model (LLM) capable of conversing with customers like a friendly and knowledgeable store clerk.</li>
        </ul>
      </section>
    </div>
  );
}
