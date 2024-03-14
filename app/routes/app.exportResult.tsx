import { LoaderFunction, json } from '@remix-run/node';
import { Page } from '@shopify/polaris';
import { authenticate } from '~/shopify.server';


export const loader: LoaderFunction = async ({ request }) => {
  const { admin } = await authenticate.admin(request);

  const response = await admin.graphql(
    `#graphql
    
    query {
  currentBulkOperation {
    id
    status
    errorCode
    createdAt
    completedAt
    objectCount
    fileSize
    url
    partialDataUrl
  }
}
    `,
  );

  if (response.ok) {
    console.log("----------status export result ------");
    const data = await response.json();
    console.log(data, "responseeeeee");

    return json(await data.data.currentBulkOperation);
  }

  return null;
};

export default function ExportResult() {
  return (
    <Page>ExportResult</Page>
  )
} 