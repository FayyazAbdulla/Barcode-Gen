'use client'
import React, { useState } from "react";
import JsBarcode from "jsbarcode";

const Barcode = () => {
  const [inputValue, setInputValue] = useState("");
  const [barcodeUrl, setBarcodeUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateBarcode = () => {
    if (!inputValue) return;
    setIsLoading(true);
    setTimeout(() => {
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, inputValue, { format: "CODE128", width: 2, height: 60 });
      setBarcodeUrl(canvas.toDataURL());
      setIsLoading(false);
    }, 1000); // Simulate loading delay
  };

  const downloadBarcode = () => {
    const link = document.createElement("a");
    link.href = barcodeUrl;
    link.download = "barcode.png";
    link.click();
  };

  const copyValue = () => {
    navigator.clipboard.writeText(inputValue);
    alert("Barcode value copied to clipboard!");
  };

  const copyImage = async () => {
    if (!barcodeUrl) return;
    try {
      const response = await fetch(barcodeUrl);
      const blob = await response.blob();
      const item = new ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([item]);
      alert("Barcode image copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy image:", error);
      alert("Could not copy image. Try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full p-4">
      <div className="w-full max-w-md bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg rounded-lg p-6 text-white">
        <h1 className="text-3xl font-extrabold mb-4 text-center">
          Barcode Generator
        </h1>
        <input
          type="text"
          placeholder="Enter value for barcode"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500 mb-4"
        />
        <button
          onClick={generateBarcode}
          disabled={isLoading}
          className={`w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-purple-800 transition ${
            isLoading && "opacity-50 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Generating..." : "Generate Barcode"}
        </button>
        {barcodeUrl && (
          <div className="mt-6 text-center">
            <h2 className="text-lg font-semibold mb-2">Generated Barcode:</h2>
            <img
              src={barcodeUrl}
              alt="Generated Barcode"
              className="mx-auto mb-4 border border-gray-300 rounded-lg"
            />
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={downloadBarcode}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition"
              >
                Download Image
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

export default Barcode;
