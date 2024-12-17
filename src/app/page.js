'use client'
import React, { useState } from "react";
import BarcodeGenerator from "../components/Barcode.jsx";
import QRGenerator from "../components/QRGenerator";
import Footer from "../components/Footer";

const Home = () => {
  const [showBarcode, setShowBarcode] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <header className="bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Code Generator</h1>
      </header>

      <div className="flex justify-center my-4 space-x-4">
        <button
          onClick={() => setShowBarcode(true)}
          className={`py-2 px-4 rounded-md text-white font-semibold ${
            showBarcode
              ? "bg-blue-700"
              : "bg-gray-400 hover:bg-blue-500 transition"
          }`}
        >
          Barcode Generator
        </button>
        <button
          onClick={() => setShowBarcode(false)}
          className={`py-2 px-4 rounded-md text-white font-semibold ${
            !showBarcode
              ? "bg-blue-700"
              : "bg-gray-400 hover:bg-blue-500 transition"
          }`}
        >
          QR Code Generator
        </button>
      </div>

      <main className="flex-grow flex items-center justify-center">
        {showBarcode ? <BarcodeGenerator /> : <QRGenerator />}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
