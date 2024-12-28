export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center px-4">
      {/* Header Section */}
      <h1 className="text-5xl font-extrabold text-white mb-6">
        Bits 'n Bytes
      </h1>
      <h2 className="text-2xl font-semibold text-gray-300 mb-4">
        AI and Sensor-Driven Vending Machine
      </h2>
      <p className="text-lg text-gray-400 max-w-2xl leading-relaxed">
        Bits 'n Bytes is a next-generation vending machine concept made by Computer Science House. It uses AI and sensors to make informed decisions for a seamless, futuristic shopping experience.
      </p>

      {/* What We Have Done Section */}
      <div className="mt-16 max-w-2xl">
        <h2 className="text-3xl font-bold text-white mb-6">
          What We Have Done
        </h2>
        <p className="text-lg text-gray-400 leading-relaxed mb-6">
          Our fully-built cabinet is designed to revolutionize vending machines:
        </p>
        <ul className="text-lg text-gray-400 list-none space-y-4">
          <li>🚪 Seamless Access: Functioning doors open automatically when a user taps their ID card.</li>
          <li>🛒 Smart Shelves: Load cells on every shelf detect when items are picked up or placed back.</li>
          <li>🤖 AI-Driven Insights: Cameras installed on both sides of the cabinet, powered by NVIDIA Jetson, enable advanced detection and tracking.</li>
          <li>📟 Interactive Cart Screen: A Raspberry Pi with an integrated screen displays real-time cart information for users.</li>
        </ul>
      </div>
    </div>
  );
}
