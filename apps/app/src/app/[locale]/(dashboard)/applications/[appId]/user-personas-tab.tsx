"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@v1/ui/card';
import { deletePersonaAction } from '@/actions/application/persona/delete-persona';
import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@v1/ui/button';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserPersona {
  id: string;
  name: string;
  job_title: string;
  day_to_day_description: string;
  important_factors: string;
  application_satisfaction: number;
  pain_points: string | null;
  goals: string | null;
}

interface UserPersonasTabProps {
  applicationId: string;
  initialPersonas: UserPersona[];
}

export function UserPersonasTab({ applicationId, initialPersonas }: UserPersonasTabProps) {
  const [userPersonas, setUserPersonas] = useState(initialPersonas);
  const router = useRouter();

  const handleDelete = async (personaId: string) => {
    if (confirm('Are you sure you want to delete this user persona?')) {
      await deletePersonaAction({ personaId });
      setUserPersonas(userPersonas.filter(p => p.id !== personaId));
      router.refresh();
    }
  };

  if (userPersonas.length === 0) {
    return <p>No user personas found for this application.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {userPersonas.map((persona) => (
          <Card key={persona.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{persona.name}</CardTitle>
              <div className="space-x-2">
                <Link href={`/applications/${applicationId}/personas/${persona.id}/edit`} passHref>
                  <Button variant="ghost" size="sm">
                    <Pencil className="h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(persona.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p><strong>Job Title:</strong> {persona.job_title}</p>
              <p><strong>Day-to-Day:</strong> {persona.day_to_day_description}</p>
              <p><strong>Important Factors:</strong> {persona.important_factors}</p>
              <p><strong>Application Satisfaction:</strong> {persona.application_satisfaction}/10</p>
              {persona.pain_points && <p><strong>Pain Points:</strong> {persona.pain_points}</p>}
              {persona.goals && <p><strong>Goals:</strong> {persona.goals}</p>}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-start">
        <Link href={`/applications/${applicationId}/personas/new`} passHref>
          <Button variant="brutalist">
            <Plus className="mr-2 h-4 w-4" />
            Create New User Persona
          </Button>
        </Link>
      </div>
    </div>
  );
}