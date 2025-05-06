import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaPiggyBank, FaCalculator, FaFlask } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

export default function HomePage() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen px-4 py-12 font-[Poppins] flex items-center justify-center transition-all duration-300 ${
        darkMode
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-blue-200 via-white to-blue-300 text-gray-900"
      }`}
    >
      {/* Toggle Button */}
      <div className="absolute top-6 right-6">
        <button
          onClick={toggleDarkMode}
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition"
        >
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`p-10 rounded-xl shadow-2xl max-w-3xl w-full text-center ${
          darkMode
            ? "bg-gray-800 border border-gray-600"
            : "bg-white bg-opacity-20 backdrop-blur-xl"
        }`}
      >
        {/* Piggy Bank Icon */}
        <FaPiggyBank
          className={`text-6xl mx-auto mb-4 drop-shadow-md ${
            darkMode ? "text-yellow-300" : "text-pink-600"
          }`}
        />

        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow">
          SmartSave
        </h1>

        {/* Subtitle */}
        <p className="text-lg mb-10">
          Plan your financial future the{" "}
          <span className="font-semibold text-blue-500">smart</span> way.
        </p>

        {/* Buttons */}
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <Link
            to="/accounts"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transition"
          >
            <FaPiggyBank className="text-xl" />
            Explore Accounts
          </Link>

          <Link
            to="/calculator"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-700 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transition"
          >
            <FaCalculator className="text-xl" />
            Savings Calculator
          </Link>

          <Link
            to="/simulator"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transition"
          >
            <FaFlask className="text-xl" />
            What-If Simulator
          </Link>

          <Link
            to="/vault"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transition"
          >
            🔐 Vault
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
