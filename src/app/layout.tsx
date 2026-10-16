import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EstateIQ AI — VM Intellect Real Estate Intelligence Platform",
  description: "Enterprise Real Estate Intelligence Platform for VM Intellect Pvt. Ltd., Pune. Integrating Ready Reckoner (ASR) rates, DPDP Act 2023 compliance, development feasibility, and Vastu Shastra space analysis.",
  icons: {
    icon: "/vmi-gold-logo.svg",
    apple: "/VMI-logo.png",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
