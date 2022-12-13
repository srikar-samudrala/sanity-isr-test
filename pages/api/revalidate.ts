import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  revalidated: boolean;
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
    fetch('http://localhost:3000/api/hello');
    await res.revalidate(`${req.body.path}`);
    res.json({ revalidated: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ revalidated: false });
  }
}
