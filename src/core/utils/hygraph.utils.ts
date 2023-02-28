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
    iconName
    size {
      ... on Size {
        w
        h
      }
    }
    content {
      ... on ContentDefault {
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
