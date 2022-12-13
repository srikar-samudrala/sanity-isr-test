// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

type Data =
  | {
      updated: boolean;
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const animals = await fetch(
      'https://e7vk8w4f.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22animal%22%5D'
    ).then((res) => res.json());

    const str = animals.result.reduce((acc: string, data: any) => {
      acc = acc + data.name;
      return acc;
    }, '');

    let sitemapContent = `<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
  <loc>https://s3.coto.com/careers/sitemap.xml/${str || 'hello'}</loc>
  </sitemap>
  </sitemapindex>`;

    const filePath = path.resolve(process.cwd(), 'public', 'sitemap.xml');

    fs.writeFileSync(filePath, sitemapContent);
    res.status(200).json({ updated: true });
  } catch (error: any) {
    res.status(500).json({ error: (error as Error).message });
  }
}
