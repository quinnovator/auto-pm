"use client";

import Link from "next/link";
import { Button } from "@v1/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Suspense } from "react";
import { deleteApplicationAction } from "@/actions/application/delete-application";
import { useRouter } from "next/navigation";

interface ApplicationActionsProps {
  applicationId: string;
}

function ApplicationActionsContent({ applicationId }: ApplicationActionsProps) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteApplicationAction({ applicationId }).then(() => {
      router.push("/applications");
    });
  };

  return (
    <div className="mt-auto pt-2 flex justify-end space-x-2">
      <Link href={`/applications/${applicationId}/edit`}>
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

export default function ApplicationActions(props: ApplicationActionsProps) {
  return (
    <Suspense fallback={<div className="mt-auto pt-2 h-8 w-16 bg-gray-200 animate-pulse" />}>
      <ApplicationActionsContent {...props} />
    </Suspense>
  );
}