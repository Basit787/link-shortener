import dynamic from "next/dynamic";

const LinkShortenerForm = dynamic(
  () => import("@/components/link-short/linkshortener-form")
);

export default async function Home() {
  return (
    <section className="text-center space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Create short link</h1>
        <p>
          Just paste your link below and get your short link in fraction of
          seconds
        </p>
      </div>
      <LinkShortenerForm />
    </section>
  );
}
