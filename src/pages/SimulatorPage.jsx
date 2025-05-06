// ✅ Updated SimulatorPage.jsx with Save to Vault
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

export default function SimulatorPage() {
  const [income, setIncome] = useState(60000);
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(10);
  const [age, setAge] = useState(25);

  const [tfsaData, setTfsaData] = useState([]);
  const [rrspData, setRrspData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    simulate();
  }, [income, monthly, years]);

  const simulate = () => {
    const tfsa = [];
    const rrsp = [];
    const newLabels = [];

    const annualRate = 0.05;
    const monthlyRate = annualRate / 12;
    const months = years * 12;
    let tfsaBalance = 0;
    let rrspBalance = 0;

    const refundMultiplier = 1 + (income > 80000 ? 0.30 : income > 50000 ? 0.25 : 0.20);
    const rrspMonthly = monthly * refundMultiplier;

    for (let i = 1; i <= months; i++) {
      tfsaBalance = tfsaBalance * (1 + monthlyRate) + monthly;
      rrspBalance = rrspBalance * (1 + monthlyRate) + rrspMonthly;

      if (i % 12 === 0) {
        tfsa.push(parseFloat(tfsaBalance.toFixed(2)));
        rrsp.push(parseFloat(rrspBalance.toFixed(2)));
        newLabels.push(`Year ${i / 12}`);
      }
    }

    setTfsaData(tfsa);
    setRrspData(rrsp);
    setLabels(newLabels);
  };

  const handleSaveToVault = () => {
    const simulation = {
      id: Date.now(),
      title: `TFSA vs RRSP – ${years} Years`,
      income,
      monthly,
      years,
      created: new Date().toISOString().split("T")[0],
      tfsaData,
      rrspData,
      labels,
    };

    const prev = JSON.parse(localStorage.getItem("smartSaveVault") || "[]");
    const updated = [...prev, simulation];
    localStorage.setItem("smartSaveVault", JSON.stringify(updated));
    alert("✅ Saved to Vault!");
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'TFSA',
        data: tfsaData,
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139,92,246,0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'RRSP',
        data: rrspData,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16,185,129,0.2)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#374151',
          font: { size: 14, weight: 'bold' }
        }
      },
    },
    scales: {
      y: {
        ticks: { color: '#374151' },
        title: {
          display: true,
          text: 'Total Savings ($)',
          color: '#374151'
        }
      },
      x: {
        ticks: { color: '#374151' },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 px-6 py-10 font-[Poppins]">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800">⚖️ TFSA vs RRSP What-If Simulator</h1>

        <div className="bg-white p-6 rounded-xl shadow space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block font-semibold mb-1">Annual Income ($)</label>
              <input type="number" value={income} onChange={(e) => setIncome(+e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Monthly Contribution ($)</label>
              <input type="number" value={monthly} onChange={(e) => setMonthly(+e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Years</label>
              <input type="number" value={years} onChange={(e) => setYears(+e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Current Age</label>
              <input type="number" value={age} onChange={(e) => setAge(+e.target.value)} className="w-full p-2 border border-gray-300 rounded" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">📊 Savings Growth Comparison</h2>
          <Line data={chartData} options={options} />
        </div>

        <div className="text-center">
          <button onClick={handleSaveToVault} className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            💾 Save This Simulation to Vault
          </button>
        </div>
      </div>
    </div>
  );
}
