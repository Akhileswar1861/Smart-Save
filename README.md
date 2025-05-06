# Smart-Save
# 💰 SmartSave — Canada’s Personal Finance Simulator

**SmartSave** is an interactive web app that helps individuals in Canada make smarter decisions about saving and investing through tools like **TFSA**, **RRSP**, and soon, **HFSA**, **RESP**, and more. Users can input their financial details, simulate different saving strategies, compare outcomes, and receive AI-based guidance — all through a clean, immersive interface.

---

## 🎯 What Does SmartSave Do?

SmartSave answers common but complex financial questions like:

- Should I invest in TFSA or RRSP?
- How will my savings grow over time?
- What’s the impact of early withdrawals?
- How do my options change with income or goals?

The app simplifies all of this with:
- Easy calculators
- What-if simulators
- Side-by-side comparisons
- Smart recommendations 

---

## ✅ Current Features

- TFSA vs RRSP calculator interface
- "What-If Simulator" input UI 
- Dark mode across the app
- Backend setup with Flask 
- Vault page design 
- Fully responsive layout


- ✅ Full backend logic for savings projections
- 📊 Chart visualizations with Chart.js
- 🧾 Export results as PDF
- 📁 Vault system to store simulation history (localStorage + optional DB)
- 🧠 AI-powered chatbot (LLM) to answer Canadian finance questions:
  - “What’s the benefit of TFSA for a 25-year-old?”
  - “Can I withdraw from RRSP for a home?”
- 🔁 Multi-scenario comparisons (e.g., TFSA vs RRSP vs HFSA)
- 👨‍👩‍👧 RESP calculator module
- 💬 Tax, income, and penalty simulations


## 🛠 Tech Stack

| Layer      | Tech Used         |
|------------|-------------------|
| Frontend   | React.js, Tailwind CSS, Chart.js (upcoming) |
| Backend    | Flask (Python), REST API |
| AI         | OpenAI / LangChain (chatbot) |
| State Mgmt | Context API |
