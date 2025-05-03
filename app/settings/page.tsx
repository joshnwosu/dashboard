import TitleDescription from '@/components/title-description';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Settings() {
  return (
    <div>
      <TitleDescription
        title='Settings'
        description='Update settinsg for better feature performance'
      />

      <Tabs defaultValue='account'>
        <TabsList>
          <TabsTrigger value='account'>Account</TabsTrigger>
          <TabsTrigger value='security'>Security</TabsTrigger>
          <TabsTrigger value='billing'>Plan & Billing</TabsTrigger>
          <TabsTrigger value='appearance'>Appearance</TabsTrigger>
        </TabsList>
        <TabsContent value='account'></TabsContent>
        <TabsContent value='password'></TabsContent>
      </Tabs>
    </div>
  );
}
