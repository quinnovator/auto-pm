import { Title } from "@/components/title";
import { ApplicationCard } from "@/components/application-card";
import { NewApplicationCard } from "@/components/new-application-card";
import { getUser, getApplications } from "@v1/supabase/queries";
import { redirect } from "next/navigation";

async function ApplicationsPage() {
  const user = await getUser();

  if (!user.data.user?.id) {
    redirect("/login");
  }

  const applications = await getApplications(user.data.user?.id);

  return (
    <div className="space-y-6">
      <Title>Applications</Title>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {applications.map((app) => (
          <ApplicationCard
            key={app.id}
            title={app.title}
            description={app.description || ""}
            icon={app.icon ? <img src={app.icon} alt={app.title} width={32} height={32} /> : null}
            href={`/applications/${app.id}`}
          />
        ))}
        <NewApplicationCard />
      </div>
    </div>
  );
}

export default ApplicationsPage;