import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ContactFab from "@/components/ContactFab";
import ScrollRestoration from "@/components/ScrollRestoration";

const bodyFont = IBM_Plex_Sans_Thai({
  variable: "--font-thai",
  subsets: ["thai", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const dataFont = IBM_Plex_Mono({
  variable: "--font-data",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "RNK หมึกปริ้นเตอร์ | หมึกพิมพ์ครบทุกรุ่น ราคาคุ้มค่า",
    template: "%s | RNK หมึกปริ้นเตอร์",
  },
  description:
    "จำหน่ายหมึกปริ้นเตอร์ทุกยี่ห้อ Epson, Canon, HP, Brother ทั้งหมึกแท้ หมึกเทียบเท่า หมึกเติม และโทนเนอร์ สต็อกพร้อมส่ง จัดส่งรวดเร็ว รับประกันคุณภาพ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      data-scroll-behavior="smooth"
      className={`${bodyFont.variable} ${dataFont.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ScrollRestoration />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <ScrollToTop />
        <ContactFab />
      </body>
    </html>
  );
}
