import { GitHubSignin } from "@/components/github-signin";
import { Wordmark } from "@/components/wordmark";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="relative h-screen w-screen flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <Wordmark />
      </div>
      <div className="relative z-10">
        <GitHubSignin />
      </div>
    </div>
  );
}
