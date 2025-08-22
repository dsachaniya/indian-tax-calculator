import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'TaxGenius.in - Advanced India Tax Calculator',
    template: '%s | TaxGenius.in'
  },
  description: 'Most comprehensive India tax calculator for AY 2025-26. Compare old vs new tax regime with precise Budget 2025 updates, HRA calculation, 80C deductions, and marginal relief.',
  keywords: ['india tax calculator', 'income tax calculator', 'tax regime comparison', 'budget 2025', 'HRA calculator', '80C deductions'],
  authors: [{ name: 'TaxGenius.in' }],
  creator: 'TaxGenius.in',
  publisher: 'TaxGenius.in',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://taxgenius.in'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://taxgenius.in',
    title: 'TaxGenius.in - Advanced India Tax Calculator',
    description: 'Comprehensive tax calculator with Budget 2025 updates. Compare regimes, calculate HRA, deductions & get precise tax liability.',
    siteName: 'TaxGenius.in',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TaxGenius.in - India Tax Calculator',
    description: 'Advanced tax calculator with Budget 2025 compliance',
  },
  robots: {
    index: true,
    follow: true,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3b82f6" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
