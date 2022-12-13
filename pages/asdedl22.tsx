import Link from 'next/link';
import path from 'path';
import fs from 'fs';

export default function AnimalsPage({ animals }: any) {
  return animals.map((animal: any) => {
    return (
      <div key={animal._id}>
        <Link href={`/animals/${animal._id}`}>{animal.name}</Link>
      </div>
    );
  });
}

export async function getStaticProps() {
  const animals = await fetch(
    'https://e7vk8w4f.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22animal%22%5D'
  ).then((res) => res.json());

  const str = animals.result.reduce((acc: string, data: { name: string }) => {
    return `${acc}${data.name}`;
  }, '');

  const sitemapContent = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
  <loc>https://s3.coto.com/careers/sitemap.xml/${str || 'hello'}</loc>
  </sitemap>
  </sitemapindex>`;

  const filePath = path.resolve(process.cwd(), 'public', 'sitemap.xml');

  fs.writeFileSync(filePath, sitemapContent);

  return {
    props: {
      animals: animals.result,
    },
    revalidate: 30,
  };
}
