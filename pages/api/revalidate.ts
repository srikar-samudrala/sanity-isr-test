import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  revalidated: boolean;
};
// _type in ["jobDetail", "jobListing", "careerLanding","videos", "department"]
const idRouteMap: { [type: string]: string[] } = {
  '/': ['careerLanding', 'videos'],
  '/openings': ['jobListing', 'jobDetail', 'department'],
};

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

    const entries = Object.entries(idRouteMap);

    for (const entry of entries) {
      if (entry[1].includes(type)) {
        await res.revalidate(entry[0]);
      }
    }

    res.json({ revalidated: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ revalidated: false });
  }
}
