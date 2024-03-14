import { Link } from "@remix-run/react";
import { Page , Layout, Text, Card, Button} from '@shopify/polaris';
import { DropZoneExample } from '~/components/Dropzone';
import Placeholder from '../components/Placeholder';
import CalloutCardEx from '../components/Callout';

export default function index() {
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
              <Button variant='primary'>New Export</Button>
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
