export const getServerSideProps = async ({ res }: any) => {
  let sitemapContent = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
  <loc>https://s3.coto.com/careers/sitemap.xml</loc>
  </sitemap>
  </sitemapindex>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=1200')
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
