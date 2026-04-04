import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/lib/sanity/env";

export const client = createClient({
  projectId: projectId || "demo",
  dataset,
  apiVersion,
  useCdn: false, // 🔥 IMPORTANT: always fresh data
});

export async function sanityFetch<T>({
  query,
  params = {},
  fallback,
}: {
  query: string;
  params?: Record<string, unknown>;
  fallback?: T;
}): Promise<T> {
  try {
    const data = await client.fetch(query, params, {
      cache: "no-store", // 🔥 IMPORTANT
    });

    return data ?? fallback;
  } catch (error) {
    return fallback as T;
  }
}