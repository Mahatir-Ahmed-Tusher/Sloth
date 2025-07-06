"use client";
import React, { useEffect, useState } from "react";

const MODELS = [
  { label: "Gemini 2.0 Flash Exp", value: "gemini-2.0-flash-exp" },
  { label: "Gemini 1.5 Flash", value: "gemini-1.5-flash" },
];

export default function SettingsPage() {
  const [selectedModel, setSelectedModel] = useState(MODELS[0].value);

  useEffect(() => {
    const saved = localStorage.getItem("selectedModel");
    if (saved && MODELS.some(m => m.value === saved)) {
      setSelectedModel(saved);
    }
  }, []);

  const handleChange = (value: string) => {
    setSelectedModel(value);
    localStorage.setItem("selectedModel", value);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream-50 dot-grid-dense px-4 py-12">
      <div className="bg-white/90 rounded-2xl shadow-lg p-8 w-full max-w-md border border-cream-200">
        <h1 className="text-2xl font-bold mb-2 text-amber-800 font-display">Settings</h1>
        <p className="text-cream-700 mb-6">Choose your preferred AI model for code generation:</p>
        <div className="space-y-4">
          {MODELS.map((model) => (
            <label
              key={model.value}
              className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer border transition-colors duration-150 ${selectedModel === model.value ? "border-amber-700 bg-amber-50/60" : "border-cream-200 bg-cream-100/60 hover:border-amber-300"}`}
            >
              <input
                type="radio"
                name="model"
                value={model.value}
                checked={selectedModel === model.value}
                onChange={() => handleChange(model.value)}
                className="accent-amber-700 w-5 h-5"
              />
              <span className="text-cream-900 font-medium">{model.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
} 