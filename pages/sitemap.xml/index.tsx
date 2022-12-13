export const getServerSideProps = async ({ res }: any) => {
  const query = encodeURIComponent(
    `*[_id=="285071e3-14a1-4433-bc31-57cc8b1ca43f"]`
  );
  const animal = await fetch(
    `https://e7vk8w4f.api.sanity.io/v2021-10-21/data/query/production?query=${query}`
  ).then((res) => res.json());

  let sitemapContent = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
  <loc>https://s3.coto.com/careers/sitemap.xml/${
    animal.result[0].name || 'hello'
  }</loc>
  </sitemap>
  </sitemapindex>`;

  res.setHeader('Content-Type', 'text/xml');
  res.setHeader('Cache-control', 'stale-while-revalidate, s-maxage=1200');
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
