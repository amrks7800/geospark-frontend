import "./globals.css"
import { Almarai } from "next/font/google"
import { Providers, Navbar, Footer } from "@/components"

const almarai = Almarai({
  subsets: ["arabic"],
  weight: ["300", "400", "700", "800"],
})

export const metadata = {
  title: "GeoSpark",
  description: "Teaching",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={almarai.className} dir="rtl">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
