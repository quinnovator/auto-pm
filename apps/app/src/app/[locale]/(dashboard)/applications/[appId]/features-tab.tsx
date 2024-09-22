import { getFeaturesAction } from "@/actions/application/feature/get-feature";
import Link from "next/link";
import { Button } from "@v1/ui/button";

interface FeaturesTabProps {
  applicationId: string;
}

export default async function FeaturesTab({ applicationId }: FeaturesTabProps) {
  const features = await getFeaturesAction({ applicationId });

  if (features?.serverError) {
    return <div>Error loading features: {features.serverError}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Features</h2>
        <Link href={`/applications/${applicationId}/features/new`}>
          <Button variant={"brutalist"}>Add Feature</Button>
        </Link>
      </div>
      {features?.data && features.data.length > 0 ? (
        <ul className="space-y-4">
          {features.data.map((feature) => (
            <li key={feature.id} className="border p-4 rounded-md">
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
              <p className="text-sm mt-2">
                <span className="font-semibold">State:</span> {feature.state}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No features found for this application.</p>
      )}
    </div>
  );
}
