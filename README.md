# InsightSphere AI v2

Global News → Structured Intelligence → Visual Insight → Personal Action

## Features
- **AI News Structuring**: Automated extraction of key points and impacts.
- **Strategic Insights**: Industry and economic impact analysis.
- **Role-based Actions**: Actionable steps for Investors, Educators, and Founders.
- **Dual Visualization**: Original news imagery + Gemini-generated conceptual illustrations.
- **Premium UI**: Dark mode with mesh gradients and glassmorphism.

## Tech Stack
- **Frontend**: Next.js 16 (App Router), Tailwind CSS v4, Framer Motion.
- **AI**: Google Gemini 1.5 Pro.
- **Backend**: Supabase (Database/Auth readiness).

## How to Deploy to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: InsightSphere AI v2"
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your repository.
   - **Environment Variables**:
     - Add `GEMINI_API_KEY`: Your Google AI Studio API Key.
     - Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` if using Supabase features.

3. **Enjoy!**
