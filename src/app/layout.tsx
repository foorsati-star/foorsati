import type {
  Metadata,
  Viewport,
} from "next";

import { Toaster } from "react-hot-toast";

import "./globals.css";

export const metadata: Metadata = {

  title: {

    default:
      "فرصتي | منصة الحرفيين والعمل الحر",

    template:
      "%s | فرصتي",

  },

  description:
    "منصة فرصتي تربط بين العملاء والحرفيين المحترفين بسهولة وأمان. ابحث عن أفضل الحرفيين أو انشر طلبك الآن.",

  keywords: [

    "حرفيين",

    "عمال",

    "منصة خدمات",

    "Freelance",

    "عمال الجزائر",

    "كهربائي",

    "سباك",

    "نجار",

    "منصة فرصتي",

    "خدمات منزلية",

  ],

  authors: [

    {
      name: "Forsati",
    },

  ],

  creator: "Forsati",

  publisher: "Forsati",

  metadataBase: new URL(
    "https://forsati.vercel.app"
  ),

  openGraph: {

    title:
      "فرصتي | منصة الحرفيين والعمل الحر",

    description:
      "ابحث عن أفضل الحرفيين أو انشر طلبك بسهولة عبر منصة فرصتي.",

    url:
      "https://forsati.vercel.app",

    siteName:
      "Forsati",

    locale: "ar_AR",

    type: "website",

  },

  twitter: {

    card:
      "summary_large_image",

    title:
      "فرصتي | منصة الحرفيين والعمل الحر",

    description:
      "منصة تربط العملاء بالحرفيين بسهولة وأمان.",

  },

  robots: {

    index: true,

    follow: true,

  },

};

// Mobile App Feel

export const viewport: Viewport = {

  width: "device-width",

  initialScale: 1,

  maximumScale: 1,

  userScalable: false,

  themeColor: "#0B6B57",

  viewportFit: "cover",

};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (

    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
    >

      <body
        className="
          bg-slate-100
          text-slate-900
          antialiased
          overflow-x-hidden
          min-h-screen
          overscroll-none
          selection:bg-primary/20
        "
        suppressHydrationWarning
      >

        {/* App Wrapper */}

        <div
          className="
            relative
            min-h-screen
            w-full
            overflow-hidden
          "
        >

          {/* Mobile Safe Area */}

          <div
            className="
              pb-[90px]
              md:pb-0
            "
          >

            {children}

          </div>

        </div>

        {/* Global Toast */}

        <Toaster

          position="top-center"

          reverseOrder={false}

          toastOptions={{

            duration: 3500,

            style: {

              background: "#ffffff",

              color: "#0f172a",

              borderRadius: "22px",

              padding: "16px 20px",

              fontWeight: "700",

              boxShadow:
                "0 15px 40px rgba(15,23,42,0.12)",

              border:
                "1px solid rgba(226,232,240,0.7)",

              direction: "rtl",

            },

            success: {

              style: {

                border:
                  "1px solid rgba(16,185,129,0.18)",

              },

              iconTheme: {

                primary: "#10B981",

                secondary: "#ffffff",

              },

            },

            error: {

              style: {

                border:
                  "1px solid rgba(239,68,68,0.18)",

              },

              iconTheme: {

                primary: "#EF4444",

                secondary: "#ffffff",

              },

            },

          }}

        />

      </body>

    </html>

  );

}