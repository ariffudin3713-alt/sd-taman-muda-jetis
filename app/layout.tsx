import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SCHOOL, SITE_URL } from "@/lib/school";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

const DESCRIPTION =
  "Website resmi SD Taman Muda Jetis, Jetis, Yogyakarta. Profil sekolah, berita, galeri kegiatan, dan informasi SPMB.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SCHOOL.name} — ${SCHOOL.tagline}`,
    template: `%s | ${SCHOOL.name}`,
  },
  description: DESCRIPTION,
  openGraph: {
    title: SCHOOL.name,
    description: DESCRIPTION,
    locale: "id_ID",
    type: "website",
    siteName: SCHOOL.name,
  },
};

/**
 * Layout akar: hanya menyediakan <html>/<body>, font, dan metadata bersama.
 *
 * Header/footer TIDAK dipasang di sini supaya tampilan desktop dan mobile bisa
 * memakai kerangka (chrome) masing-masing:
 *   - app/(site)/layout.tsx  → header + footer desktop
 *   - app/m/*                → header ringkas + bilah tab bawah (MobileShell)
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="flex min-h-screen flex-col bg-mist font-sans text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
