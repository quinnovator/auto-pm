import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@v1/ui/tabs";
import { Title } from "@/components/title";
import { getApplicationAction } from "@/actions/application/get-application";
import FeaturesTab from "./features-tab";
import UserPersonasTab from "./user-personas-tab";

interface ApplicationPageProps {
  params: {
    appId: string;
  };
}

export default async function ApplicationPage({ params }: ApplicationPageProps) {
  const application = await getApplicationAction({ appId: params.appId });

  if (application?.serverError) {
    return <div>Error loading application: {application.serverError}</div>;
  }

  if (!application?.data) {
    return notFound();
  }

  return (
    <div className="container mx-auto p-4">
      <Title>{application.data?.title}</Title>
      <p className="mt-2 text-gray-600">{application.data?.description}</p>

      <Tabs defaultValue="features" className="mt-6">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="personas">User Personas</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <Suspense fallback={<div>Loading features...</div>}>
            <FeaturesTab applicationId={application.data.id} />
          </Suspense>
        </TabsContent>
        <TabsContent value="personas">
          <Suspense fallback={<div>Loading user personas...</div>}>
            <UserPersonasTab applicationId={application.data.id} />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
}
