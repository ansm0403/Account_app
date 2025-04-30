import type { Metadata } from "next";
import localFont from "next/font/local";
import GlobalStyle from "@/components/style/GlobalStyle";
import ClientProvider from "@/context/ClientProvider";
import AuthContext from "@/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";
import Navbar from "@/components/shared/Navbar";
import { AlertContextProvider } from "@/context/AlertContext";
import LoadingContext from "@/context/LoadingContext";
import RecoilContext from "@/context/RecoilContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "bank-account",
  description: "banks account application",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {


  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <RecoilContext>
          <GlobalStyle />
          <AuthContext>
            <ClientProvider>
              <AlertContextProvider>
                <AuthGuard>
                  <LoadingContext>
                  <Navbar />
                  {children}
                  </LoadingContext>
                </AuthGuard>
              </AlertContextProvider>
            </ClientProvider>
          </AuthContext>
        </RecoilContext>
        <div id = 'root-portal' />
      </body>
    </html>
  );
}