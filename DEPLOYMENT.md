# Indian Tax Calculator - GitHub Pages Deployment

## 🎯 Overview
A comprehensive tax calculator for India (AY 2025-26) with both Income Tax and GST calculators, optimized for GitHub Pages deployment.

## 🚀 Live Demo
Visit: `https://dsachaniya.github.io/indian-tax-calculator/`

## ✨ Features
- **Income Tax Calculator**: Compare Old vs New regime with all deductions
- **GST Section 14 Calculator**: Time of supply calculator with rate reforms
- **Production Ready**: Static export optimized for GitHub Pages
- **Responsive Design**: Works on all devices
- **Real-time Calculations**: Instant results as you type

## 📦 Deployment Setup

### Prerequisites
1. Enable GitHub Pages in repository settings
2. Set source to "GitHub Actions"

### Automatic Deployment
The site automatically deploys to GitHub Pages when you push to the `main` branch using GitHub Actions.

### Manual Deployment

```bash
# 1. Build the static export
npm run build

# 2. Deploy (adds .nojekyll file)
npm run deploy

# 3. The 'out' directory contains the static files
# Copy contents to your web server or push to gh-pages branch
```

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Test static export locally
cd out && python3 -m http.server 8080
```

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                           # Homepage with Income Tax Calculator
│   ├── gst-section-14-time-of-supply/     # GST Calculator route
│   └── layout.tsx                         # Root layout
├── components/
│   ├── TaxCalculatorSimple.tsx            # Production-optimized tax calculator
│   ├── GSTCalculator.tsx                  # GST Section 14 calculator
│   └── ui/                                # Shadcn/ui components
└── lib/
    └── taxCalculationsNew.ts              # Tax calculation logic
```

## ⚙️ Configuration

### Next.js Config (`next.config.ts`)
```typescript
const nextConfig: NextConfig = {
  output: 'export',                         // Enable static export
  trailingSlash: true,                     // Required for GitHub Pages
  images: { unoptimized: true },           # Disable image optimization
  basePath: '/indian-tax-calculator',      # Repository name
  assetPrefix: '/indian-tax-calculator/'   # Asset prefix for GitHub Pages
};
```

### GitHub Actions (`.github/workflows/nextjs.yml`)
- Automatically builds and deploys on push to main
- Optimized for Next.js static export
- Adds `.nojekyll` file for proper GitHub Pages handling

## 🎨 Tech Stack
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui**: Beautiful UI components
- **Lucide Icons**: Modern icon library

## 📊 Build Output
```
Route (app)                            Size  First Load JS    
┌ ○ /                               22.4 kB         136 kB
├ ○ /gst-section-14-time-of-supply  80.6 kB         195 kB
└ ○ /sitemap.xml                        0 B            0 B
+ First Load JS shared by all        126 kB

○  (Static)  prerendered as static content
```

## 🔧 Troubleshooting

### Blank Page Issues
- ✅ Fixed: Removed Framer Motion animations (hydration issues)
- ✅ Fixed: Simplified state management
- ✅ Fixed: Added `export const dynamic = 'force-static'` to sitemap

### GitHub Pages Requirements
- ✅ Static export enabled
- ✅ `.nojekyll` file added
- ✅ Proper base path configuration
- ✅ Trailing slashes enabled

## 📝 License
MIT License - Feel free to use for educational purposes.

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test the build: `npm run build`
5. Submit a pull request

---

**Made with ❤️ for Indian taxpayers**
