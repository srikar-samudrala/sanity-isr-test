import Link from 'next/link';

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

  return {
    props: {
      animals: animals.result,
    },
    revalidate: 30,
  };
}
