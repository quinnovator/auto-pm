import { getPersonasAction } from "@/actions/application/persona/get-persona";
import Link from "next/link";
import { Button } from "@v1/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@v1/ui/card";
import PersonaActions from "@/components/persona-actions";
import { Title } from "@/components/title";

interface UserPersonasTabProps {
  applicationId: string;
}

export default async function UserPersonasTab({ applicationId }: UserPersonasTabProps) {
  const personas = await getPersonasAction({ applicationId });

  if (personas?.serverError) {
    return <div>Error loading user personas: {personas.serverError}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title>User Personas</Title>
        <Link href={`/applications/${applicationId}/personas/new`}>
          <Button variant="brutalist">Add Persona</Button>
        </Link>
      </div>
      {personas?.data && personas.data.length > 0 ? (
        <ul className="space-y-4">
          {personas.data.map((persona) => (
            <li key={persona.id}>
              <Card>
                <CardHeader className="py-2 flex flex-row justify-between items-center align-baseline">
                  <CardTitle className="flex flex-row justify-between items-center align-baseline w-full">
                    {persona.name}
                    <span className="text-sm font-normal text-muted-foreground">{persona.job_title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{persona.day_to_day_description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <PersonaActions applicationId={applicationId} personaId={persona.id} />
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <Card>
          <CardContent>
            <p>No user personas found for this application.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
