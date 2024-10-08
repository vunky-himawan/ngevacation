import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SEOModel } from "@/models/SEO";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";

type MainLayoutsProps = {
  children: React.ReactNode;
  SEO: SEOModel;
  withHeader?: boolean;
  searchPlaceholder?: string;
  withSearch?: boolean;
  navigationLink?: string;
};

const MainLayout = ({
  children,
  SEO,
  withHeader = true,
  searchPlaceholder = "Search",
  withSearch = false,
  navigationLink,
}: MainLayoutsProps) => {
  const pathLocation = useLocation();

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>
            {SEO.title} | {SEO.siteName}
          </title>
          <meta charSet="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1.0"
          />
          <meta name="theme-color" content="#fff1f2" />
          <link
            rel="canonical"
            href={`${SEO.siteUrl}${pathLocation.pathname}`}
          />
          <meta name="description" content={SEO.description} />
          <meta name="keywords" content={SEO.keywords.join(",")} />

          {/* favicon */}
          <link rel="icon" type="image/png" href="/favicon.svg" />

          {/* <!-- Open Graph / Facebook --> */}
          <meta property="og:type" content={SEO.type} />
          <meta
            property="og:url"
            content={`${SEO.siteUrl}${pathLocation.pathname}`}
          />
          <meta property="og:title" content={`${SEO.title}`} />
          <meta property="og:description" content={SEO.description} />
          <meta property="og:image" content={""} />

          {/* <!-- Twitter --> */}
          <meta property="twitter:card" content={""} />
          <meta
            property="twitter:url"
            content={`${SEO.siteUrl}${pathLocation.pathname}`}
          />
          <meta property="twitter:title" content={SEO.title} />
          <meta property="twitter:description" content={SEO.description} />
        </Helmet>
        <main className="w-screen relative">
          {withHeader && (
            <Header
              navigationLink={navigationLink}
              withSearch={withSearch}
              searchPlaceholder={searchPlaceholder}
            />
          )}
          {children}
        </main>
        <Footer />
      </HelmetProvider>
    </>
  );
};

export default MainLayout;
