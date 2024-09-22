import Link from 'next/link';
import { Plus } from 'lucide-react';

function NewApplicationCard() {
  return (
    <Link href="/applications/new" className="block">
      <div className="border border-gray-700 bg-accent p-6 w-full max-w-sm aspect-square flex items-center justify-center transition-colors hover:bg-accent/90">
        <Plus size={48} className="text-gray-400 opacity-50" />
      </div>
    </Link>
  );
}

export { NewApplicationCard };