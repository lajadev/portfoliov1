import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Providers from "@/components/i18n/Providers";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio hjemmeside",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
