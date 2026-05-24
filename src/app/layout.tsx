import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Foorsati - فرصتي | منصة الخدمات المحلية في الجزائر",
  description:
    "فرصتي هي المنصة الرائدة لربط العملاء بالعمال والحرفيين المحليين في ورقلة والجزائر.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className="font-sans antialiased min-h-screen bg-secondary flex flex-col">
        
        <Navbar />

        <main className="flex-grow">
          {children}
        </main>

        <Footer />

      </body>
    </html>
  );
}