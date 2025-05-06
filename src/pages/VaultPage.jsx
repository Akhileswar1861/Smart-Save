// ✅ VaultPage with View Modal Preview for Saved Plans
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend, Filler);

export default function VaultPage() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("smartSaveVault") || "[]");
    setPlans(stored);
  }, []);

  const handleView = (plan) => {
    setSelectedPlan(plan);
  };

  const handleCloseModal = () => setSelectedPlan(null);

  const handleExport = (id) => {
    alert(`📄 Export PDF for simulation #${id}`);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this plan?")) {
      const updated = plans.filter((plan) => plan.id !== id);
      setPlans(updated);
      localStorage.setItem("smartSaveVault", JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-white to-purple-100 px-6 py-10 font-[Poppins]">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.h1
          className="text-4xl font-extrabold text-center text-gray-800"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🔐 Your SmartSave Vault
        </motion.h1>

        {plans.length === 0 ? (
          <div className="text-center text-gray-500 italic">No simulations saved yet.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                className="bg-white rounded-xl p-6 shadow-lg border border-purple-200"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h2 className="text-xl font-bold text-purple-800 mb-1">{plan.title}</h2>
                <p className="text-sm text-gray-600 mb-2">📅 Created: {plan.created}</p>
                <p className="text-sm text-gray-700">Income: ${plan.income.toLocaleString()}</p>
                <p className="text-sm text-gray-700">Monthly: ${plan.monthly}</p>
                <p className="text-sm text-gray-700">Years: {plan.years}</p>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleView(plan)}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    🔍 View
                  </button>
                  <button
                    onClick={() => handleExport(plan.id)}
                    className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
                  >
                    📄 Export
                  </button>
                  <button
                    onClick={() => handleDelete(plan.id)}
                    className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
                  >
                    ❌ Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Chart Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white p-6 rounded-xl max-w-2xl w-full shadow-xl"
            >
              <h2 className="text-xl font-bold text-center text-purple-800 mb-4">
                {selectedPlan.title}
              </h2>

              <ChartPreview plan={selectedPlan} />

              <div className="mt-4 text-center">
                <button
                  onClick={handleCloseModal}
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper component for chart rendering
function ChartPreview({ plan }) {
  const { income, monthly, years } = plan;
  const tfsa = [], rrsp = [], labels = [];
  const annualRate = 0.05, monthlyRate = annualRate / 12;
  let tfsaBal = 0, rrspBal = 0;
  const refundMultiplier = 1 + (income > 80000 ? 0.30 : income > 50000 ? 0.25 : 0.20);
  const rrspMonthly = monthly * refundMultiplier;

  for (let i = 1; i <= years * 12; i++) {
    tfsaBal = tfsaBal * (1 + monthlyRate) + monthly;
    rrspBal = rrspBal * (1 + monthlyRate) + rrspMonthly;
    if (i % 12 === 0) {
      tfsa.push(+tfsaBal.toFixed(2));
      rrsp.push(+rrspBal.toFixed(2));
      labels.push(`Year ${i / 12}`);
    }
  }

  const data = {
    labels,
    datasets: [
      {
        label: 'TFSA',
        data: tfsa,
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139,92,246,0.2)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'RRSP',
        data: rrsp,
        borderColor: '#10B981',
        backgroundColor: 'rgba(16,185,129,0.2)',
        tension: 0.4,
        fill: true,
      },
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top', labels: { color: '#374151' } },
    },
    scales: {
      y: {
        ticks: { color: '#374151' },
        title: { display: true, text: 'Savings ($)', color: '#374151' },
      },
      x: {
        ticks: { color: '#374151' },
      },
    },
  };

  return <Line data={data} options={options} />;
}
