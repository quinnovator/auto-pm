import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@v1/ui/card";

interface ApplicationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  children?: React.ReactNode;
}

export function ApplicationCard({ title, description, icon, href, children }: ApplicationCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            {icon && <span>{icon}</span>}
            <span>{title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <p className="text-sm text-muted-foreground flex-grow">{description}</p>
          {children}
        </CardContent>
      </Card>
    </Link>
  );
}