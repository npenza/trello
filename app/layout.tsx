import Banner from "./components/Banner";
import { Modal } from "./components/Modal";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#f5f6f8]">
        <Banner />
        {children}
        <Modal />
      </body>
    </html>
  );
}
