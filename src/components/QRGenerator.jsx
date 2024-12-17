'use client'
import React, { useState } from "react";
import QRCode from "qrcode";

const QRGenerator = () => {
  const [inputValue, setInputValue] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateQRCode = async () => {
    if (!inputValue) return;
    setIsLoading(true);
    try {
      const qr = await QRCode.toDataURL(inputValue, { width: 256, margin: 2 });
      setQrUrl(qr);
    } catch (err) {
      console.error("Error generating QR code:", err);
    }
    setIsLoading(false);
  };

  const downloadQRCode = (format) => {
    const link = document.createElement("a");
    link.href = qrUrl;
    link.download = `qr-code.${format}`;
    link.click();
  };

  const copyValue = () => {
    navigator.clipboard.writeText(inputValue);
    alert("QR Code value copied to clipboard!");
  };

  const copyImage = async () => {
    if (!qrUrl) return;
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      alert("QR Code image copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy image:", error);
      alert("Could not copy image. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="w-full max-w-md bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 shadow-lg rounded-lg p-6 text-white">
        <h1 className="text-3xl font-extrabold mb-4 text-center">QR Code Generator</h1>
        <input
          type="text"
          placeholder="Enter value for QR Code"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
        />
        <button
          onClick={generateQRCode}
          disabled={isLoading}
          className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition ${
            isLoading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Generating..." : "Generate QR Code"}
        </button>
        {qrUrl && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Generated QR Code:</h2>
            <img
              src={qrUrl}
              alt="Generated QR Code"
              className="mx-auto mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => downloadQRCode("png")}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                Download PNG
              </button>
              <button
                onClick={() => downloadQRCode("jpg")}
                className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition"
              >
                Download JPG
              </button>
              <button
                onClick={copyValue}
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
              >
                Copy Value
              </button>
              <button
                onClick={copyImage}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
              >
                Copy Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRGenerator;
