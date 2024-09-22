"use client";

import Link from "next/link";
import { Button } from "@v1/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { deleteFeatureAction } from "@/actions/application/feature/delete-feature";

interface FeatureActionsProps {
  applicationId: string;
  featureId: string;
}

function FeatureActionsContent({ applicationId, featureId }: FeatureActionsProps) {
  const router = useRouter();

  async function handleDelete() {
    await deleteFeatureAction({ featureId }).then(() => {
      router.push(`/applications/${applicationId}`);
    });
  }

  return (
    <div className="flex space-x-2">
      <Link href={`/applications/${applicationId}/features/${featureId}/edit`}>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </Link>
      <Button variant="ghost" size="icon" onClick={handleDelete}>
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}

export default function FeatureActions(props: FeatureActionsProps) {
  return (
    <Suspense fallback={<div className="h-8 w-16 bg-gray-200 animate-pulse" />}>
      <FeatureActionsContent {...props} />
    </Suspense>
  );
}