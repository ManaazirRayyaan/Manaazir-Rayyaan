import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { apiVersion, dataset, hasSanityEnv, projectId, useCdn } from "@/lib/sanity/env";

export const client = createClient({
  projectId: projectId || "demo",
  dataset,
  apiVersion,
  useCdn,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  fallback,
}: {
  query: string;
  params?: Record<string, unknown>;
  fallback: QueryResponse;
}): Promise<QueryResponse> {
  if (!hasSanityEnv) {
    return fallback;
  }

  try {
    const data = await client.fetch<QueryResponse>(query, params);
    if (data === null || data === undefined) {
      return fallback;
    }
    if (Array.isArray(data) && data.length === 0 && Array.isArray(fallback)) {
      return fallback;
    }
    return data;
  } catch {
    return fallback;
  }
}
