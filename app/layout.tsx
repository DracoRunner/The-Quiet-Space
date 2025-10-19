import type { Metadata } from "next";
import { Inter, Lora } from "next/font/google";
import "./globals.css"; 
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const lora = Lora({ subsets: ["latin"], variable: '--font-lora', style: ['normal', 'italic'] });


export const metadata: Metadata = {
  title: "The Quiet Space",
  description: "Find Clarity and Deep Rest in a Busy World.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${lora.variable} font-sans`}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
