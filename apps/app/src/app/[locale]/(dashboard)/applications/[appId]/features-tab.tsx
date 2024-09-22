import { getFeaturesAction } from "@/actions/application/feature/get-feature";
import Link from "next/link";
import { Button } from "@v1/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@v1/ui/card";
import { Badge } from "@v1/ui/badge";
import FeatureActions from "@/components/feature-actions";
import { Title } from "@/components/title";

interface FeaturesTabProps {
  applicationId: string;
}

function formatState(state: string) {
  const stateMap: { [key: string]: { label: string; variant: "default" | "secondary" | "outline" } } = {
    proposed: { label: "Proposed", variant: "default" },
    refinement: { label: "Refinement", variant: "secondary" },
    implemented: { label: "Implemented", variant: "outline" },
  };

  const formattedState = stateMap[state.toLowerCase()] || { label: state, variant: "outline" };
  return <Badge variant={formattedState.variant} className="">{formattedState.label}</Badge>;
}

export default async function FeaturesTab({ applicationId }: FeaturesTabProps) {
  const features = await getFeaturesAction({ applicationId });

  if (features?.serverError) {
    return <div>Error loading features: {features.serverError}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Title>Features</Title>
        <Link href={`/applications/${applicationId}/features/new`}>
          <Button variant="brutalist">Add Feature</Button>
        </Link>
      </div>
      {features?.data && features.data.length > 0 ? (
        <ul className="space-y-4">
          {features.data.map((feature) => (
            <li key={feature.id}>
              <Card>
                <CardHeader className="py-2 flex flex-row justify-between items-center align-baseline">
                  <CardTitle className="flex flex-row justify-between items-center align-baseline w-full">
                    {feature.title}
                    {formatState(feature.state)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <CardDescription>{feature.description}</CardDescription>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <FeatureActions applicationId={applicationId} featureId={feature.id} />
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <Card>
          <CardContent>
            <p>No features found for this application.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
