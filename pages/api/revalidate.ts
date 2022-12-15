import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  revalidated: boolean;
};
// _type in ["jobDetail", "jobListing", "careerLanding","videos", "department"]
const idRouteMap: { [type: string]: string[] } = {
  '/': ['careerLanding', 'videos'],
  '/openings': ['jobListing', 'jobDetail', 'department'],
  detail: ['jobDetail', 'aboutCoto', 'jobBenefits', 'howToApply'],
};

function delay() {
  return new Promise((res) => setTimeout(() => res(''), 1500));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.status(500).send({ revalidated: false });
    return;
  }
  try {
    const { _id: id, _type: type }: { _id: string; _type: string } = req.body;
    console.log(`Sanity webhook payload, id: ${id}, type: ${type}`);
    const entries = Object.entries(idRouteMap);

    for (const entry of entries) {
      if (entry[1].includes(type)) {
        console.log(`Invalidating ${entry[0]}...`);
        await delay();
        await res.revalidate(entry[0]);
        console.log(`Invalidated  ${entry[0]}!`);
      }
    }

    res.json({ revalidated: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ revalidated: false });
  }
}
