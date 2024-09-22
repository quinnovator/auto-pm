import { ReactNode } from 'react';
import Link from 'next/link';

interface ApplicationCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
}

function ApplicationCard({ title, description, icon, href }: ApplicationCardProps) {
  return (
    <Link href={href} className="block">
      <div className="border border-gray-700 bg-black p-6 w-full max-w-sm aspect-square flex flex-col transition-colors hover:bg-gray-900">
        <div className="text-gray-400 mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 flex-grow">{description}</p>
      </div>
    </Link>
  );
}

export { ApplicationCard };