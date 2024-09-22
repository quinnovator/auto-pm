"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@v1/ui/card';
import { deleteFeatureAction } from '@/actions/application/feature/delete-feature';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@v1/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Feature {
  id: string;
  title: string;
  description: string;
  business_value: string;
  user_benefit: string;
  state: string;
}

interface FeaturesTabProps {
  applicationId: string;
  initialFeatures: Feature[];
}

export function FeaturesTab({ applicationId, initialFeatures }: FeaturesTabProps) {
  const [features, setFeatures] = useState(initialFeatures);
  const router = useRouter();

  const handleDelete = async (featureId: string) => {
    if (confirm('Are you sure you want to delete this feature?')) {
      await deleteFeatureAction({ featureId });
      setFeatures(features.filter(f => f.id !== featureId));
      router.refresh();
    }
  };

  if (features.length === 0) {
    return <p>No features found for this application.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {features.map((feature) => (
          <Card key={feature.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{feature.title}</CardTitle>
              <div className="space-x-2">
                <Link href={`/applications/${applicationId}/features/${feature.id}/edit`} passHref>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(feature.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p><strong>Description:</strong> {feature.description}</p>
              <p><strong>Business Value:</strong> {feature.business_value}</p>
              <p><strong>User Benefit:</strong> {feature.user_benefit}</p>
              <p><strong>State:</strong> {feature.state}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-start">
        <Link href={`/applications/${applicationId}/features/new`} passHref>
          <Button variant="brutalist">
            <Plus className="mr-2 h-4 w-4" />
            Create New Feature
          </Button>
        </Link>
      </div>
    </div>
  );
}