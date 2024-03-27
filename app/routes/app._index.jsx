
import { Link, useSubmit } from "@remix-run/react";
import { Page , Layout, Text, Card, Button} from '@shopify/polaris';
import { DropZoneExample } from '~/components/Dropzone';
import Placeholder from '../components/Placeholder';
import CalloutCardEx from '../components/Callout';
import { ActionFunction, redirect} from '@remix-run/node';
import { authenticate } from "~/shopify.server";
import {
  useActionData,
  useLoaderData,
  useNavigation,
  useNavigate,
} from "@remix-run/react";
/*
export default function index() {
  const submit = useSubmit();
  function handleSave() {
    const data = {
      title: "NIKHILL",
    };
    submit(data, { method: "post" });
  }

  return (
    <Page title='Badge App'>
      <ui-title-bar title='Bulky Opertaion'></ui-title-bar>
      <Layout>
        <Layout.Section>
          <Card>
            <Text as="h2">
              Export
            </Text>
            <br />
            <Text as='h6'>
              You will be able to select
            </Text>
            <Link to="/app/exportForm">
              <Button variant='primary' onClick={handleSave}>New Export</Button>
            </Link>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            <Text as='h2'>
              Import
            </Text>
            <DropZoneExample />
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Placeholder label="You have zero badges"/>
        </Layout.Section>
        <Layout.Section>
          <CalloutCardEx />
        </Layout.Section>
      </Layout>
    </Page>
  )
}
*/

// src/routes/index.js

export async function loader({ request, params }) {
  console.log(":reqqq2", request);
  const { admin } = await authenticate.admin(request);
  return 0;
}

export async function action({ request, params }) {
  console.log(":reqqq", request);
  console.log("params", params);
  const { session } = await authenticate.admin(request);
  return redirect(`/app`);
};

export default function Index() {
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Extract form data
    const formData = new FormData(event.currentTarget);
    console.log("Nikhil1", formData);
    // Make POST request to action handler
    const response = await fetch('/action', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      // Handle success (optional)
    } else {
      // Handle error (optional)
    }
  };

  const submit = useSubmit();
  function handleSave() {
    const data = {
      title: "Nikhil"
    };
    console.log("HandleSave ", data)
    submit(data, { method: "post" });
  }

  return (
    <Page title='Badge App'>
      <h1>Submit Form</h1>
      {/* Form component */}
      <form>
        {/* Form fields */}
        <input type="text" name="name" placeholder="Enter your name" />
        <button type="submit" onClick={handleSave}>Submit</button>
      </form>
    </Page>
  );
}

