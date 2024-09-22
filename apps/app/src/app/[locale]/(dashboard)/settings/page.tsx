import { SignOut } from "@/components/sign-out";
import { Title } from "@/components/title";
import { getI18n } from "@/locales/server";

export const metadata = {
  title: "Settings",
};

export default async function SettingsPage() {
  const t = await getI18n();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <Title>{t("settings")}</Title>
        <SignOut />
      </div>
    </div>
  );
}
