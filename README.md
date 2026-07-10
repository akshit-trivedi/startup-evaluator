# 🚀 Startup Idea VC Evaluator

An AI-powered diagnostic framework that evaluates startup pitches with real Venture Capital decision quality. 

## 📖 Overview
The Startup Idea VC Evaluator is a Next.js web application that allows aspiring founders to pitch their ideas and receive instant, structured, and hyper-critical feedback. By leveraging a Bring Your Own Key (BYOK) architecture, the app utilizes the native intelligence of top-tier LLMs (like Gemini and OpenAI) to output real-time, streaming JSON evaluations without exposing the platform to backend rate-limiting or heavy financial overhead.

## ✨ Core Features (v1)
- **BYOK Architecture:** Users securely input their own API keys (never logged or stored) to bypass centralized rate limits.
- **Real-Time JSON Streaming:** Powered by the Vercel AI SDK, the app streams structured JSON directly to the UI, providing a highly responsive experience without long loading states.
- **Resilient Error Handling:** Built-in safeguards against empty streams, missing data, and invalid API keys with graceful UI error boundaries.
- **Dynamic UI/UX:** Features a sleek, responsive design with dark mode, an auto-fill "magic" button for testing, and type-safe frontend mapping.

## 🛠️ Tech Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **AI Integration:** Vercel AI SDK (`useObject`, `streamObject`)
- **Styling:** Tailwind CSS
- **Deployment:** Vercel Serverless

## 🚀 Product Roadmap (v2 Fast Follows)
- **Multi-Modal Pitch Ingestion:** Transition the input field to accept drag-and-drop image uploads (UI mockups, architecture diagrams, product outputs) leveraging the native vision capabilities of the latest LLMs to evaluate visual evidence alongside text claims.
- **Local Storage Auth:** Persist the user's API key in browser `localStorage` to reduce session friction on page refresh.
- **PDF Export:** Allow users to export their VC diagnostic report as a beautifully formatted PDF.

## ⚙️ Local Setup
1. Clone the repository: `git clone <your-repo-url>`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform]


