export const getServerSideProps = async ({ res }: any) => {
  let sitemapContent = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
  <loc>https://s3.coto.com/careers/sitemap.xml</loc>
  </sitemap>
  </sitemapindex>`;

  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemapContent);

  res.end();

  // Empty since we don't render anything
  return {
    props: {},
  };
};

const SitemapXML: React.FC = () => {
  return null;
};

export default SitemapXML;
