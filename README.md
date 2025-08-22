# 🚀 TaxGenius.in - Advanced India Tax Calculator

## Modern, Fast, and SEO-Friendly Tax Calculator for AY 2025-26

Welcome to TaxGenius.in - the most comprehensive and modern tax calculator for India, built with cutting-edge technologies for optimal performance, SEO, and user experience.

### 🎯 Tech Stack

- **Framework**: Next.js 15.5+ with App Router
- **Language**: TypeScript for type safety
- **Styling**: TailwindCSS for rapid UI development
- **Components**: shadcn/ui for accessible, beautiful components
- **Animations**: Framer Motion for smooth interactions
- **Icons**: Lucide React for modern iconography
- **SEO**: Built-in Next.js SEO optimizations
- **Performance**: Server-Side Rendering (SSR) & Static Generation

### ✨ Key Features

#### 🔥 Performance Optimizations
- **Server-Side Rendering (SSR)** for instant page loads
- **Static Generation** for lightning-fast performance
- **Image optimization** with Next.js Image component
- **Font optimization** with automatic font loading
- **Bundle optimization** with automatic code splitting

#### 🎨 Modern UI/UX
- **Responsive design** that works on all devices
- **Smooth animations** with Framer Motion
- **Accessible components** with shadcn/ui
- **Modern design system** with TailwindCSS
- **Interactive tooltips** for better user guidance

#### 🔍 SEO Excellence
- **Structured data** for rich search results
- **Open Graph** meta tags for social sharing
- **Twitter Cards** for enhanced social presence
- **Canonical URLs** for proper indexing

#### 📱 Progressive Web App (PWA)
- **App-like experience** on mobile devices
- **Install prompt** for home screen addition
- **Offline support** (coming soon)

### 🧮 Tax Calculation Features

#### Comprehensive Rule Implementation
- ✅ **AY 2025-26 compliance** with latest tax slabs
- ✅ **Budget 2025 updates** including marginal relief
- ✅ **Old vs New regime** detailed comparison
- ✅ **HRA calculation** with metro/non-metro support
- ✅ **Section 80C deductions** (PF, LIC, ELSS, PPF)
- ✅ **All Chapter VIA deductions** (80D, 80E, 80G, etc.)
- ✅ **Rebate 87A** implementation
- ✅ **Surcharge calculation** for high earners
- ✅ **Health & Education Cess** (4%)

### 🚀 Getting Started

#### Prerequisites
- Node.js 18.17 or later
- npm, yarn, or pnpm

#### Installation
```bash
# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

#### Development
```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

#### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### 📁 Project Structure

```
nextjs-version/
├── src/
│   ├── app/                    # App Router pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout with SEO
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # shadcn/ui components
│   │   └── TaxCalculator.tsx # Main calculator component
│   └── lib/                  # Utility functions
│       ├── taxCalculations.ts # Tax calculation logic
│       └── utils.ts          # General utilities
├── public/                   # Static assets
│   ├── manifest.json        # PWA manifest
│   └── favicon.ico          # Favicon
├── components.json          # shadcn/ui configuration
├── tailwind.config.ts       # TailwindCSS configuration
└── package.json            # Dependencies and scripts
```

### 🎨 Customization

#### Adding New Components
```bash
# Add shadcn/ui components
npx shadcn@latest add [component-name]
```

#### Modifying Tax Rules
Edit `src/lib/taxCalculations.ts` to update tax slabs, deduction limits, and calculation logic.

### 🌐 Deployment

#### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

#### Other Platforms
- **Netlify**: Build command `npm run build`
- **Custom Server**: `npm run build && npm start`

### 🔮 Future Enhancements

- [ ] **PDF export** of tax calculations
- [ ] **Calculation history** with local storage
- [ ] **Dark mode** support
- [ ] **Offline functionality**
- [ ] **Tax planning wizard**

### 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using modern web technologies**
