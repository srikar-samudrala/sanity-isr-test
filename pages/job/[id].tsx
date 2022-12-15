import { toHTML } from '@portabletext/to-html';

import styles from '../../styles/Home.module.css';

const JobDetailPage = ({ jobDetail, htmlString }: any) => {
  return (
    <div className={styles.container}>
      <div style={{ marginBottom: '48px' }}>
        <p>Title: {jobDetail.title}</p>
        <p>Job ID: {jobDetail._id}</p>
        <p>Close date: {jobDetail.closeDate}</p>
        <p>Department: {jobDetail.departmentName}</p>
        <p>Remote: {jobDetail.isRemote.toString()}</p>
      </div>
      <div dangerouslySetInnerHTML={{ __html: htmlString }} />
    </div>
  );
};

export default JobDetailPage;

export async function getStaticProps({ params }: any) {
  const jobDetailQuery = `*[_id == '${params.id}']{
    _id,
    closeDate,
    "departmentName": department->title, 
    isRemote,
    jobAdderUrl,
    title,
    widgets[]->
  }`;
  const jobDetailData = await fetch(
    `https://e7vk8w4f.api.sanity.io/v2021-10-21/data/query/production?query=${encodeURIComponent(
      jobDetailQuery
    )}`
  ).then((res) => res.json());

  const html = jobDetailData.result[0].widgets.reduce(
    (acc: string, widget: any) => {
      // acc = acc + toHTML(widget.description);
      return `${acc}${toHTML(widget.description)}`;
    },
    ''
  );

  return {
    props: {
      jobDetail: jobDetailData.result[0],
      htmlString: html,
    },
  };
}

export async function getStaticPaths() {
  const jobListQuery = `*[_id == 'jobListing']{
    jobList[]->{ _id },
  }`;

  const jobListData = await fetch(
    `https://e7vk8w4f.api.sanity.io/v2021-10-21/data/query/production?query=${encodeURIComponent(
      jobListQuery
    )}`
  ).then((res) => res.json());

  const paths = jobListData.result[0].jobList.map((job: any) => {
    return {
      params: {
        id: job._id,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
}
