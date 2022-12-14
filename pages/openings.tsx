import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

const Openings = ({ jobOpeningsData, departmentsData }: any) => {
  const [dept, setDept] = useState('All');
  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '48px' }}>
        <h1>{jobOpeningsData.jobListingHero.heading}</h1>
        <p>{jobOpeningsData.jobListingHero.description}</p>
        <Link href={jobOpeningsData.jobListingHero.cta.url}>
          {jobOpeningsData.jobListingHero.cta.text}
        </Link>
        <div>
          <select onChange={(e) => setDept(e.target.value)}>
            <option>All</option>
            {departmentsData.map((dept: any) => {
              return (
                <option key={dept.departmentName}>{dept.departmentName}</option>
              );
            })}
          </select>
        </div>
      </div>
      <div id="openings">
        {jobOpeningsData.jobList.map((job: any) => {
          if (dept === 'All' || dept === job.departmentName) {
            return (
              <div
                key={job.title}
                style={{
                  padding: '12px',
                  border: '1px solid',
                  borderRadius: '8px',
                  marginBottom: '8px',
                }}
              >
                <div>
                  <strong>{job.title}</strong>
                  <pre>isRemote: {job.isRemote.toString()}</pre>
                  {job.compensation ? <pre>{job.compensation}</pre> : null}
                  <p>Dept: {job.departmentName}</p>
                  <pre>{job.closeDate}</pre>
                  <Link href={`/job/${job._id}`}>Check the role</Link>
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Openings;

export async function getStaticProps() {
  const jobOpeningsquery = `*[_id == 'jobListing']{
    jobListingHero,
    jobList[]->{closeDate, title, _id, "departmentName": department->title,isRemote,compensation},
  }`;
  const departmentsQuery = `*[_type == 'department']{
    "departmentName": title
  }`;
  let jobOpeningsData = fetch(
    `https://e7vk8w4f.apicdn.sanity.io/v2021-10-21/data/query/production?query=${encodeURIComponent(
      jobOpeningsquery
    )}`
  ).then((res) => res.json());
  let departmentsData = fetch(
    `https://e7vk8w4f.apicdn.sanity.io/v2021-10-21/data/query/production?query=${encodeURIComponent(
      departmentsQuery
    )}`
  ).then((res) => res.json());

  return {
    props: {
      jobOpeningsData: (await jobOpeningsData).result[0],
      departmentsData: (await departmentsData).result,
    },
  };
}
