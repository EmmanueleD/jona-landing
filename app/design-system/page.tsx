/**
 * Design System Showcase — DEV ONLY
 *
 * This route is blocked in production via notFound(). It never ships as a
 * publicly accessible URL. The route lives under the root layout so
 * StyleProvider injects live CMS design tokens automatically.
 */

import { notFound } from "next/navigation";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import {
  registry,
  registryByCategory,
  type ShowcaseCategory,
  type ShowcaseEntry,
} from "@/lib/showcase/registry";

// Production guard — resolved at request time on the server.
// notFound() is the Next.js canonical 404; even a misconfigured NODE_ENV
// produces a visible 404 rather than exposing internal components.
if (process.env.NODE_ENV === "production") {
  notFound();
}

const CATEGORY_LABELS: Record<ShowcaseCategory, string> = {
  sections: "Sections",
  layout: "Layout",
  ui: "UI",
  admin: "Admin",
};

const CATEGORY_ORDER: ShowcaseCategory[] = ["sections", "layout", "ui", "admin"];

function CategoryBadge({ category }: { category: ShowcaseCategory }) {
  const colors: Record<ShowcaseCategory, string> = {
    sections: "bg-blue-100 text-blue-800",
    layout: "bg-purple-100 text-purple-800",
    ui: "bg-green-100 text-green-800",
    admin: "bg-orange-100 text-orange-800",
  };
  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded ${colors[category]}`}
    >
      {CATEGORY_LABELS[category]}
    </span>
  );
}

function NoteBadge({ note }: { note: string }) {
  return (
    <span className="inline-block text-xs font-medium px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 border border-yellow-300">
      {note}
    </span>
  );
}

function ShowcaseCard({ entry }: { entry: ShowcaseEntry }) {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm">
      {/* Card header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-gray-50 flex flex-wrap items-center gap-2">
        <span className="font-semibold text-gray-900 text-sm">{entry.name}</span>
        <CategoryBadge category={entry.category} />
        {entry.note && <NoteBadge note={entry.note} />}
      </div>
      {/* Description */}
      <div className="px-4 py-2 border-b border-gray-100">
        <p className="text-xs text-gray-500">{entry.description}</p>
      </div>
      {/* Component render area */}
      <div className="p-4 overflow-auto">{entry.element}</div>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page header */}
      <header className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-bold text-gray-900">Design System</h1>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200 uppercase tracking-wide">
              Dev only
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {registry.length} components · Live CMS tokens applied via StyleProvider
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-12">
        {CATEGORY_ORDER.map((category) => {
          const entries = registryByCategory[category];
          if (entries.length === 0) return null;
          return (
            <section key={category}>
              <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b border-gray-200 pb-2">
                {CATEGORY_LABELS[category]}
                <span className="ml-2 text-sm font-normal text-gray-400">
                  ({entries.length})
                </span>
              </h2>
              <div className="space-y-6">
                {entries.map((entry) => (
                  <ShowcaseCard key={entry.id} entry={entry} />
                ))}
              </div>
            </section>
          );
        })}
      </main>

      {/*
        Real WhatsAppButton mounted live (not a replica). It is position:fixed
        and reveals itself after scrollY > 300 — its catalog card points here.
      */}
      <WhatsAppButton phoneNumber="+34600000000" />
    </div>
  );
}
