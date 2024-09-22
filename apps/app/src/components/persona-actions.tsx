"use client";

import Link from "next/link";
import { Button } from "@v1/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { deletePersonaAction } from "@/actions/application/persona/delete-persona";

interface PersonaActionsProps {
  applicationId: string;
  personaId: string;
}

function PersonaActionsContent({ applicationId, personaId }: PersonaActionsProps) {
  const router = useRouter();

  async function handleDelete() {
    await deletePersonaAction({ personaId }).then(() => {
      router.push(`/applications/${applicationId}`);
    });
  }

  return (
    <div className="flex space-x-2">
      <Link href={`/applications/${applicationId}/personas/${personaId}/edit`}>
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

export default function PersonaActions(props: PersonaActionsProps) {
  return (
    <Suspense fallback={<div className="h-8 w-16 bg-gray-200 animate-pulse" />}>
      <PersonaActionsContent {...props} />
    </Suspense>
  );
}