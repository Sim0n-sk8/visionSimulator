import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

// Fonts
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

// Full metadata
export const metadata: Metadata = {
  title: 'Myopia Simulator',
  description: 'Interactive myopia simulator showing the effect of myopia with adjustable blur levels.',
  keywords: 'myopia, simulator, vision, eye health, interactive, blur simulation, eyesight, eye test',
  authors: [{ name: 'Simon Swart' }],
  creator: 'Simon Swart',
  publisher: 'Nevada Cloud',
  alternates: { canonical: 'https://myopia-simulator.vercel.app/' },
  openGraph: {
    title: 'Myopia Simulator',
    description: 'Interactive myopia simulator showing the effect of myopia with adjustable blur levels.',
    url: 'https://myopia-simulator.vercel.app/',
    siteName: 'Myopia Simulator',
    type: 'website',
    locale: 'en_US',
    images: [{ url: 'https://myopia-simulator.vercel.app/assets/metaimgVisionSim.png', alt: 'Preview of Myopia Simulator' }],
  },

  robots: 'index, follow',
  
  
 
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/*Hello fellow code enthusiasts! Its a great big world out there so remember to go live. Also stay hydrated ~Simon*/}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
