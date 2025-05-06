import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CSVLink } from 'react-csv';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, ArcElement, Tooltip, Legend);

export default function CalculatorPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [monthly, setMonthly] = useState(200);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(5);
  const [monthly2, setMonthly2] = useState(300);
  const [rate2, setRate2] = useState(6);
  const [years2, setYears2] = useState(5);
  const [compare, setCompare] = useState(false);

  const [dataSet1, setDataSet1] = useState({});
  const [dataSet2, setDataSet2] = useState({});
  const [tableData, setTableData] = useState([]);
  const pdfRef = useRef(null);

  const generateProjection = (monthly, rate, years) => {
    const r = rate / 100 / 12;
    let balance = 0;
    const labels = [];
    const data = [];
    const table = [];

    for (let m = 1; m <= years * 12; m++) {
      balance = balance * (1 + r) + monthly;
      if (m % 12 === 0) {
        labels.push('Year ' + m / 12);
        data.push(parseFloat(balance.toFixed(2)));
        table.push({
          year: m / 12,
          deposit: monthly * m,
          interest: parseFloat(balance - monthly * m).toFixed(2),
          balance: parseFloat(balance.toFixed(2)),
        });
      }
    }

    return { labels, data, table, totalDeposit: monthly * years * 12, finalAmount: balance };
  };

  useEffect(() => {
    const d1 = generateProjection(monthly, rate, years);
    const d2 = generateProjection(monthly2, rate2, years2);
    setDataSet1(d1);
    setDataSet2(d2);
    setTableData(d1.table);
  }, [monthly, rate, years, monthly2, rate2, years2]);

  const handleExportPDF = () => {
    html2canvas(pdfRef.current).then((canvas) => {
      const img = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(img, "PNG", 10, 10, 190, 0);
      pdf.save("SmartSave_Calculator.pdf");
    });
  };

  const headers = [
    { label: "Year", key: "year" },
    { label: "Total Deposit", key: "deposit" },
    { label: "Interest Earned", key: "interest" },
    { label: "Balance", key: "balance" },
  ];

  const recommendations = () => {
    if (rate >= 6 && years >= 10) return "💡 Consider investing in RRSP to maximize long-term tax-deferred growth.";
    if (rate < 5 && monthly < 200) return "📌 Consider increasing your monthly contribution for better compounding.";
    if (years <= 3) return "🧠 TFSA may offer more flexibility for short-term goals.";
    return "✅ You’re on a solid path. Review your risk level and stay consistent!";
  };

  const lineChart = (labels, data, color) => ({
    labels,
    datasets: [
      {
        label: 'Balance Over Time',
        data: data,
        fill: true,
        backgroundColor: color + '33',
        borderColor: color,
        tension: 0.4,
      },
    ],
  });

  return (
    <div className={`min-h-screen px-6 py-12 font-[Poppins] ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-white via-blue-100 to-blue-200 text-gray-800"}`}>
      <div className="max-w-6xl mx-auto space-y-8" ref={pdfRef}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">📊 SmartSave Calculator</h1>
          <button
            className="px-4 py-2 rounded-full bg-black text-white hover:bg-gray-700"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        <div className="flex flex-wrap gap-6">
          <div className="flex-1 space-y-3">
            <label>Monthly Contribution ($)</label>
            <input type="number" value={monthly}
              onChange={e => setMonthly(+e.target.value)}
              className={`w-full p-2 rounded ${darkMode ? "bg-gray-800 text-white border border-gray-600" : "bg-white text-black border border-gray-300"}`} />
            <label>Interest Rate (%)</label>
            <input type="number" value={rate}
              onChange={e => setRate(+e.target.value)}
              className={`w-full p-2 rounded ${darkMode ? "bg-gray-800 text-white border border-gray-600" : "bg-white text-black border border-gray-300"}`} />
            <label>Duration (Years)</label>
            <input type="number" value={years}
              onChange={e => setYears(+e.target.value)}
              className={`w-full p-2 rounded ${darkMode ? "bg-gray-800 text-white border border-gray-600" : "bg-white text-black border border-gray-300"}`} />
          </div>

          {compare && (
            <div className="flex-1 space-y-3">
              <label>Monthly Contribution 2 ($)</label>
              <input type="number" value={monthly2}
                onChange={e => setMonthly2(+e.target.value)}
                className={`w-full p-2 rounded ${darkMode ? "bg-gray-800 text-white border border-gray-600" : "bg-white text-black border border-gray-300"}`} />
              <label>Interest Rate 2 (%)</label>
              <input type="number" value={rate2}
                onChange={e => setRate2(+e.target.value)}
                className={`w-full p-2 rounded ${darkMode ? "bg-gray-800 text-white border border-gray-600" : "bg-white text-black border border-gray-300"}`} />
              <label>Duration 2 (Years)</label>
              <input type="number" value={years2}
                onChange={e => setYears2(+e.target.value)}
                className={`w-full p-2 rounded ${darkMode ? "bg-gray-800 text-white border border-gray-600" : "bg-white text-black border border-gray-300"}`} />
            </div>
          )}
        </div>

        <div className="flex gap-4">
          <button className={`px-4 py-2 rounded ${darkMode ? "bg-green-500 hover:bg-green-600 text-white" : "bg-green-600 hover:bg-green-700 text-white"}`} onClick={handleExportPDF}>
            📄 Export PDF
          </button>
          <CSVLink
            data={tableData}
            headers={headers}
            filename="savings_data.csv"
            className={`px-4 py-2 rounded ${darkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
          >
            📁 Export CSV
          </CSVLink>
          <button className={`px-4 py-2 rounded ${darkMode ? "bg-purple-500 hover:bg-purple-600 text-white" : "bg-purple-600 hover:bg-purple-700 text-white"}`} onClick={() => setCompare(!compare)}>
            {compare ? "🔙 Single Mode" : "⚖️ Compare Mode"}
          </button>
        </div>

        <p className="bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow">{recommendations()}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className={`rounded-xl p-4 shadow ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
            <Line data={lineChart(dataSet1.labels, dataSet1.data, '#3B82F6')} />
          </div>
          {compare && (
            <div className={`rounded-xl p-4 shadow ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
              <Line data={lineChart(dataSet2.labels, dataSet2.data, '#10B981')} />
            </div>
          )}
        </div>

        <div className={`rounded-xl p-6 shadow overflow-x-auto ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
          <h2 className="text-xl font-bold mb-4">📆 Year-wise Breakdown</h2>
          <table className="min-w-full text-left border">
            <thead>
              <tr>
                <th className={`border p-2 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}>Year</th>
                <th className={`border p-2 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}>Total Deposit</th>
                <th className={`border p-2 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}>Interest Earned</th>
                <th className={`border p-2 ${darkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`}>Balance</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  <td className={`border p-2 ${darkMode ? "text-white" : "text-black"}`}>{row.year}</td>
                  <td className={`border p-2 ${darkMode ? "text-white" : "text-black"}`}>${row.deposit.toLocaleString()}</td>
                  <td className={`border p-2 ${darkMode ? "text-white" : "text-black"}`}>${row.interest}</td>
                  <td className={`border p-2 ${darkMode ? "text-white" : "text-black"}`}>${row.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
