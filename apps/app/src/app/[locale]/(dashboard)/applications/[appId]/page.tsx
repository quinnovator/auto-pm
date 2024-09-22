"use client";

import { getApplicationAction } from '@/actions/application/get-application';
import { getFeaturesAction } from '@/actions/application/feature/get-feature';
import { getPersonasAction } from '@/actions/application/persona/get-persona';
import { FeaturesTab } from './features-tab';
import { UserPersonasTab } from './user-personas-tab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@v1/ui/tabs";
import { use, useState } from 'react';

interface ApplicationPageProps {
  params: {
    appId: string;
  };
}

export default function ApplicationPage({ params: { appId } }: ApplicationPageProps) {
  const application = use(getApplicationAction({ appId }));
  const features = use(getFeaturesAction({ applicationId: appId }));
  const personas = use(getPersonasAction({ applicationId: appId }));
  
  const [activeTab, setActiveTab] = useState("features");

  if (!application) {
    return <div>Application not found</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{application.data?.title}</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="personas">User Personas</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <FeaturesTab applicationId={appId} initialFeatures={features?.data || []} />
        </TabsContent>
        <TabsContent value="personas">
          <UserPersonasTab applicationId={appId} initialPersonas={personas?.data || []} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
