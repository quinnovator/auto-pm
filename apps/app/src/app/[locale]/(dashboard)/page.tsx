import { redirect } from 'next/navigation';

export const metadata = {
  title: "Home",
};

export default function Page() {
  redirect('/applications');
}
