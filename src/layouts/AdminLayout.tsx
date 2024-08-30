import Header from "@/components/admin/Header";
import Sidebar from "@/components/admin/Sidebar";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const AdminLayout = ({
  children,
  siteName,
  siteUrl,
  title,
}: {
  children: React.ReactNode;
  siteName: string;
  title: string;
  siteUrl: string;
}) => {
  const pathLocation = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            {title} | {siteName}
          </title>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0"
          />
          <meta name="theme-color" content="#fff1f2" />
          <link rel="canonical" href={`${siteUrl}${pathLocation.pathname}`} />

          {/* favicon */}
          <link rel="icon" type="image/png" href="/favicon.svg" />
        </Helmet>
        <main className="w-screen relative">
          <Header setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
          <Sidebar isMenuOpen={isMenuOpen} />
          <section className="w-full h-screen max-h-fit pt-[4.7rem] lg:pl-[20.5rem] lg:py-28 max-w-[1920px] mx-auto">
            {children}
          </section>
        </main>
      </HelmetProvider>
    </>
  );
};

export default AdminLayout;
