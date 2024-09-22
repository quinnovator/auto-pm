"use client";

import { createClient } from "@v1/supabase/client";
import { Button } from "@v1/ui/button";

export function GitHubSignin() {
  const supabase = createClient();

  const handleSignin = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });
  };

  return (
    <Button onClick={handleSignin} variant="outline" className="font-mono">
      Sign in with GitHub
    </Button>
  );
}
