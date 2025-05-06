import React from 'react';
import { motion } from 'framer-motion';
import { FaPiggyBank, FaMoneyBillWave, FaHome, FaGraduationCap } from 'react-icons/fa';

const accounts = [
  {
    title: 'TFSA - Tax-Free Savings Account',
    description: 'A flexible investment account where your money grows tax-free and withdrawals are not taxed.',
    color: 'from-blue-400 to-blue-600',
    icon: <FaPiggyBank />,
    text: 'text-blue-700',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/tax-free-savings-account.html',
  },
  {
    title: 'RRSP - Registered Retirement Savings Plan',
    description: 'Contributions are tax-deductible, and funds grow tax-deferred until withdrawal (usually at retirement).',
    color: 'from-green-400 to-green-600',
    icon: <FaMoneyBillWave />,
    text: 'text-green-700',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/registered-retirement-savings-plan-rrsp.html',
  },
  {
    title: 'FHSA - First Home Savings Account',
    description: 'Helps first-time home buyers save for a home tax-free, combining benefits of both TFSA and RRSP.',
    color: 'from-purple-400 to-purple-600',
    icon: <FaHome />,
    text: 'text-purple-700',
    url: 'https://www.canada.ca/en/revenue-agency/services/tax/individuals/topics/first-home-savings-account.html',
  },
  {
    title: 'RESP - Registered Education Savings Plan',
    description: 'Designed for saving for a child’s post-secondary education, with government grants available.',
    color: 'from-yellow-400 to-yellow-600',
    icon: <FaGraduationCap />,
    text: 'text-yellow-700',
    url: 'https://www.canada.ca/en/services/benefits/education/education-savings.html',
  },
];

export default function AccountsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-100 to-blue-200 px-6 py-14 font-[Poppins]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="max-w-6xl mx-auto"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 flex items-center gap-2 mb-4 drop-shadow-md">
          📁 Account Information
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          Learn about Canada’s top tax-advantaged accounts below:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {accounts.map((acc, index) => (
            <a
              key={index}
              href={acc.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className={`p-[2px] rounded-2xl bg-gradient-to-r ${acc.color} shadow-xl`}
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 h-full hover:shadow-2xl transition-all">
                  <div className="flex items-center gap-4 mb-3">
                    <div className={`text-3xl ${acc.text}`}>{acc.icon}</div>
                    <h2 className={`text-xl font-semibold ${acc.text}`}>{acc.title}</h2>
                  </div>
                  <p className="text-gray-700">{acc.description}</p>
                </div>
              </motion.div>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
