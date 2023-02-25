import { request } from "graphql-request";
export const fetchData = async () => {
  const { windows } = await request(
    import.meta.env.VITE_HYGRAPH_CONTENT_API,
    `
      {
        windows {
    id
    header
    windowtypes
    buttons
    content {
      ... on CondentDefault {
        defaultcontent {
          html
        }
      }
      ... on ContentJobsListItem {
        id
        jobtitle
      }
    }
  }
      }
    `
  );
  return windows;
};
