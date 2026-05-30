import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Owolabi Oluwashijibomi — AI Systems Engineer & Cloud Architect",
  description:
    "Computer Scientist specializing in AI Systems, Distributed Computing, Cloud Engineering, and Cybersecurity. Building serious systems.",
  keywords: ["AI Engineer","Cloud Engineer","Distributed Systems","Computer Science","Full Stack Developer","Machine Learning","Cybersecurity"],
  openGraph: {
    title: "Owolabi Oluwashijibomi — AI Systems Engineer",
    description: "Building the future: AI systems, distributed computing, and cloud-native infrastructure.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Owolabi Oluwashijibomi" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
