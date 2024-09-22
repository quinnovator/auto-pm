"use client";

import Link from "next/link";
import { Button } from "@v1/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { Suspense } from "react";

interface PersonaActionsProps {
  applicationId: string;
  personaId: string;
}

function PersonaActionsContent({ applicationId, personaId }: PersonaActionsProps) {
  return (
    <div className="absolute top-2 right-2 flex space-x-2">
      <Link href={`/applications/${applicationId}/personas/${personaId}/edit`}>
        <Button variant="ghost" size="icon">
          <Pencil className="h-4 w-4" />
        </Button>
      </Link>
      <Button variant="ghost" size="icon">
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}

export default function PersonaActions(props: PersonaActionsProps) {
  return (
    <Suspense fallback={<div className="absolute top-2 right-2 h-8 w-16 bg-gray-200 animate-pulse" />}>
      <PersonaActionsContent {...props} />
    </Suspense>
  );
}