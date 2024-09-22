import { getPersonasAction } from "@/actions/application/persona/get-persona";
import Link from "next/link";
import { Button } from "@v1/ui/button";

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
        <h2 className="text-xl font-semibold">User Personas</h2>
        <Link href={`/applications/${applicationId}/personas/new`}>
          <Button variant={"brutalist"}>Add Persona</Button>
        </Link>
      </div>
      {personas?.data && personas.data.length > 0 ? (
        <ul className="space-y-4">
          {personas.data.map((persona) => (
            <li key={persona.id} className="border p-4 rounded-md">
              <h3 className="font-semibold">{persona.name}</h3>
              <p className="text-sm text-gray-600">{persona.job_title}</p>
              <p className="text-sm mt-2">{persona.day_to_day_description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No user personas found for this application.</p>
      )}
    </div>
  );
}
