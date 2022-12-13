export default function AnimalPage({ animal }: any) {
  if (!animal) return null;
  return <p>{animal.result[0].name}</p>;
}

export async function getStaticProps({ params }: any) {
  const query = encodeURIComponent(`*[_id=="${params.id}"]`);
  const animal = await fetch(
    `https://e7vk8w4f.api.sanity.io/v2021-10-21/data/query/production?query=${query}`
  ).then((res) => res.json());

  if (animal.result.length === 0) {
    return {
      notFound: true,
      revalidate: 30,
    };
  }

  return {
    props: {
      animal,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const animals = await fetch(
    'https://e7vk8w4f.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%22animal%22%5D'
  ).then((res) => res.json());

  const paths = animals.result.map((animal: any) => {
    return {
      params: {
        id: animal._id,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}
