"use client";

import Link from "next/link";

export const Sponsor = () => {
  return (
    <div className="border rounded-lg p-6">
      <h2 className="text-xl font-semibold">Become a Sponsor</h2>
      <p className="mt-2 text-sm">
        Support the development and long-term maintenance of this project.
      </p>

      <Link
        href="https://github.com/sponsors/Bridgetamana"
        target="_blank"
        rel="github sponsor"
        className="inline-block mt-4 rounded-md bg-black px-5 py-2 text-white"
      >
        Sponsor on GitHub
      </Link>
    </div>
  );
};
