import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

import "./style.css";

export default async function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale}>
      <body>
        <div className="container">
          <Header />
          <div className="main">
            <Sidebar />
            <section className="col note-viewer">{children}</section>
          </div>
        </div>
      </body>
    </html>
  );
}
