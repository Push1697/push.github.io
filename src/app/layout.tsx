import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from '@vercel/speed-insights/next';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pushpendra - Server Administrator | Cloud Engineer | DevOps Professional | Kubernetes Expert",
  description: "Expert Server Administrator and Cloud Engineer specializing in AWS, Kubernetes, Docker, and DevOps automation. 2+ years managing production servers, cloud infrastructure, and enterprise migrations. AWS Certified professional offering server management, cloud administration, and infrastructure solutions.",
  keywords: [
    "Server Administrator",
    "Server Management Professional",
    "Cloud Administrator",
    "DevOps Engineer",
    "Kubernetes Professional",
    "AWS Cloud Engineer",
    "Linux Server Administrator",
    "Windows Server Administrator",
    "Cloud Infrastructure Engineer",
    "DevOps Specialist",
    "Docker Expert",
    "Infrastructure Automation",
    "Cloud Migration Specialist",
    "Server Administration",
    "Cloud Computing Professional",
    "Kubernetes Administrator",
    "AWS Solutions Architect",
    "Office 365 Migration",
    "Google Workspace Administrator",
    "CI/CD Pipeline Engineer",
    "Terraform",
    "Infrastructure as Code",
    "Server Management",
    "Cloud DevOps",
    "Production Server Management",
    "Pushpendra",
    "Jaipur DevOps Engineer"
  ],
  authors: [{ name: "Pushpendra", url: "https://pushpendra.overflowbyte.cloud" }],
  creator: "Pushpendra",
  publisher: "Pushpendra",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pushpendra.overflowbyte.cloud',
    siteName: 'Pushpendra - Server & Cloud Engineer Portfolio',
    title: 'Pushpendra - Server Administrator | Cloud Engineer | DevOps Professional',
    description: 'Expert Server Administrator and Cloud Engineer specializing in AWS, Kubernetes, Docker, and DevOps automation. AWS Certified professional with 2+ years of production experience.',
    images: [
      {
        url: 'https://pushpendra.overflowbyte.cloud/new_image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pushpendra - Server Administrator and Cloud Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pushpendra - Server Administrator | Cloud Engineer | DevOps Professional',
    description: 'Expert Server Administrator and Cloud Engineer specializing in AWS, Kubernetes, Docker, and DevOps automation.',
    images: ['https://pushpendra.overflowbyte.cloud/new_image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification code
  },
  alternates: {
    canonical: 'https://pushpendra.overflowbyte.cloud',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
