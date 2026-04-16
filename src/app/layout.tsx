import type { Metadata } from "next";
import { Inter, Noto_Sans_Bengali } from "next/font/google";
import { LanguageProvider } from "@/lib/language";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ইশকুল - বাংলাদেশের প্রিমিয়াম শিক্ষা প্ল্যাটফর্ম",
  description: "এইচএসসি, এসএসসি, বিশ্ববিদ্যালয় ভর্তি, বিসিএস এবং চাকরি পরীক্ষার জন্য সম্পূর্ণ অনলাইন প্রস্তুতি প্ল্যাটফর্ম। বাংলাদেশের শীর্ষ কোচিং সেন্টার এবং শিক্ষকদের সাথে সংযুক্ত হন।",
  keywords: ["HSC", "SSC", "University Admission", "BCS", "Coaching", "Education", "Bangladesh", "Online Learning"],
  authors: [{ name: "ইশকুল" }],
  openGraph: {
    title: "ইশকুল - বাংলাদেশের প্রিমিয়াম শিক্ষা প্ল্যাটফর্ম",
    description: "এইচএসসি, এসএসসি, বিশ্ববিদ্যালয় ভর্তি, বিসিএস এবং চাকরি পরীক্ষার জন্য সম্পূর্ণ অনলাইন প্রস্তুতি প্ল্যাটফর্ম।",
    type: "website",
    locale: "bn_BD",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${inter.variable} ${bengali.variable}`}>
      <body className="min-h-screen antialiased">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
