import  { useState, useCallback} from 'react'
import { useActionData, useSubmit } from "@remix-run/react";
import { Page , Layout, Text, Card, Popover, Button, ResourceListProps} from '@shopify/polaris';
import {ResourceListExample, itemsResource} from '../components/CustomResourceList';
import { ActionFunction, redirect} from '@remix-run/node';
import { productsQuery } from "~/graphql/productsQuery";
import { authenticate } from "~/shopify.server";

/*
try{
const Shopify = require('shopify-api-node');
const shopify = new Shopify({
  shopName: 'poc-remix',
  apiKey: 'b6ae9e7107c73d759d760c07c982755d',
  password: 'f33b36436a4f07d755ef2bc82186d8cf',
  apiVersion: '2024-01'
});

async function injectLiquidCode() {
  try {
    // Retrieve the current theme of the store
   // const theme = await shopify.theme.list({ limit: 1 });
    const themeId = '164936024357';
    // Specify the section to modify and the liquid code to inject
    const sectionToUpdate = 'sections/image-banner.liquid';
    const liquidCodeToInject = '<h1>Hello from your app!</h1>';

    // Retrieve the content of the section file
    let sectionFile = await shopify.asset.get(themeId, { rejectUnauthorized:false,
      key: sectionToUpdate });

    // Modify the content to include the injected liquid code
    sectionFile.value += liquidCodeToInject;

    // Update the section file with the modified content
    await shopify.asset.update(themeId, {
      key: sectionToUpdate,
      value: sectionFile.value
    });

    console.log('Liquid code injected successfully.');
  } catch (error) {
    console.error('Error injecting liquid code:', error);
  }
}
injectLiquidCode();
}
catch(error)
{
  console.error('Error contacting shopify:', error);
}
*/

export const action: ActionFunction =async ({request}) => {
  const {admin, session} = await authenticate.admin(request);
  const formData = await request.formData();
/*
 // console.log("session ", session);
 // console.log("admin", admin.rest.resources.Asset);
  //const product = new admin.rest.resources.Product({session: session});
  const themeId = '164936024357';
  // Specify the section to modify and the liquid code to inject
  const sectionToUpdate = 'sections/image-banner.liquid';
  const liquidCodeToInject = '<h1>Hello from your app!</h1>';

  try {
    // Update the specified section with the new liquid code
    const updatedTheme = await admin.theme.update(themeId, {
      files: [{
        name: sectionToUpdate,
        attachment: liquidCodeToInject
      }]
    });

    // Handle success
    console.log('Section updated successfully:', updatedTheme);
  } catch (error) {
    // Handle error
    console.error('Error updating section:', error);
  }
*/
const response =  await admin.graphql(
  `#graphql
  mutation MetafieldsSet($metafields: [MetafieldsSetInput!]!) {
    metafieldsSet(metafields: $metafields) {
      metafields {
        key
        namespace
        value
        createdAt
        updatedAt
      }
      userErrors {
        field
        message
        code
      }
    }
  }`,
  {
    variables: {
      "metafields": [
        {
          "key": "materials",
          "namespace": "my_fields",
          "ownerId": "gid://shopify/Product/9052167668005",
          "type": "url",
          "value": "https://cdn.shopify.com/s/files/1/0858/1470/6469/files/pngtree-badge-png-image_996483.jpg?v=1708857907"
        },
        {
          "key": "manufactured",
          "namespace": "my_fields",
          "ownerId": "gid://shopify/Product/9052167668005",
          "type": "single_line_text_field",
          "value": "Made in Canada"
        }
      ]
    },
  },
  );

  // Construct the GraphQL mutation to update the section in the theme
  const response2 =  await admin.graphql(
    `#graphql
mutation UpdateSection($themeId: ID!, $sectionKey: String!, $newLiquidCode: String!) {
  themeAssetUpdate(input: {
    id: $themeId,
    asset: {
      key: $sectionKey,
      value: $newLiquidCode
    }
  }) {
    themeAsset {
      id
    }
  }
}`,
{});


if (response2.ok) {
  const data = await response2.json();
  console.log(data.data, "data");
}
else{
  console.log("UpdateSection mutation not worked")
}

return null;
}

export default function ExportForm() {
    const[activate, setActivate] = useState(false);

    const togglePopoverActive = useCallback(
        () => setActivate((activate) => !activate),
        [],
      );
    
      const activator = (
        <Button onClick={togglePopoverActive} disclosure>
          More actions
        </Button>
      );


 //   const[selectedItems, setSelectedItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState<ResourceListProps["selectedItems"]>([]);
    const submit = useSubmit();
    const createExport = () => {
      submit(
        {},
        {
          replace: true,
          method: "POST",
          action: "/app/exportform",
        },
      );
    };
  return ( 
    <Page>
        <ui-title-bar>
            <button variant="breadcrumb">Home</button>
            <button onClick={() => {}}>Back</button>
            <button variant="primary" onClick={createExport}>Export</button>
        </ui-title-bar>
        <Layout>
            <Layout.Section>
                <Card>
                    <Text as='h6'>
                        Export CSV
                    </Text>
                </Card>
                <br />
                <Card>
                    <Popover
                        active={activate}
                        activator={activator}
                        autofocusTarget="first-node"
                        onClose={togglePopoverActive}>
                            <ResourceListExample items={itemsResource} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>
                    </Popover>
                </Card>
            </Layout.Section>
        </Layout>
    </Page>
  )
}
