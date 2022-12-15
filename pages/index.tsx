import type { NextPage } from 'next';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

const Home: NextPage = ({ data }: any) => {
  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '48px' }}>
        <h1>{data.careerLandingHero.heading}</h1>
        <p>{data.careerLandingHero.description}</p>
        <Link href={data.careerLandingHero.cta.url}>
          {data.careerLandingHero.cta.text}
        </Link>
      </div>
      <div style={{ marginBottom: '48px' }}>
        <h2>videoName: {data.careerLandingVideo.videoName}</h2>
        <pre>videoUrl: {data.careerLandingVideo.videoUrl}</pre>
      </div>
      <div style={{ marginBottom: '48px' }}>
        <h2>{data.careerLandingBenefits.heading}</h2>
        <p>{data.careerLandingBenefits.description}</p>
        <h3>Benefits:</h3>
        <ul>
          {data.careerLandingBenefits.listicleItems.map((item: any) => {
            return <li key={item._key}>{item.listicleItemHeader}</li>;
          })}
        </ul>
      </div>
      <div style={{ marginBottom: '48px' }}>
        <h2>{data.careerLandingCoreValues.heading}</h2>
        <p>{data.careerLandingCoreValues.description}</p>
        <h3>Core Values:</h3>
        <ul>
          {data.careerLandingCoreValues.listicleItems.map((item: any) => {
            return (
              <li key={item._key}>
                <strong>{item.listicleItemHeader}</strong>:{' '}
                <p>{item.listicleItemDescription}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const query = `*[_id == 'careerLanding']{
    careerLandingHero,
    careerLandingVideo->{videoName, videoUrl},
    careerLandingCoreValues,
    careerLandingBenefits,
  }`;
  const data = await fetch(
    `https://e7vk8w4f.api.sanity.io/v2021-10-21/data/query/production?query=${encodeURIComponent(
      query
    )}`
  ).then((res) => res.json());

  return {
    props: {
      data: data.result[0],
    },
  };
}

export default Home;
