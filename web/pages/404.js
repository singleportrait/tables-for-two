import Link from 'next/link';

export const Custom404 = () => (
  <div>
    <div className="w-full h-screen flex flex-col items-center justify-center gap-y-4 bg-secondary">
      <h2 className="px-6 text-center text-primary antialiased">
        Sorry, we couldn&apos;t find that page.
      </h2>
      <Link href="/">
        <button type="button" className="font-mono text-primary antialiased underline">
          Back home
        </button>
      </Link>
    </div>
  </div>
);

export default Custom404;
