import { SEOModel } from "@/models/SEO";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

type MainLayoutsProps = {
  children: React.ReactNode;
  SEO: SEOModel;
};

const MainLayout = ({ children, SEO }: MainLayoutsProps) => {
  const pathLocation = useLocation();

  return (
    <>
      <Helmet>
        <title>
          {SEO.title} | {SEO.siteName}
        </title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1.0" />
        <meta name="theme-color" content="#fff1f2" />
        <link rel="canonical" href={`${SEO.siteUrl}${pathLocation.pathname}`} />
        <meta name="description" content={SEO.description} />
        <meta name="keywords" content={SEO.keywords.join(",")} />

        {/* favicon */}
        <link rel="icon" type="image/png" href="/favicon.png" />

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
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
