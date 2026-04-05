import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "@/sanity/lib/client";
import { apiVersion, dataset, hasSanityEnv, projectId, useCdn } from "@/lib/sanity/env";

const builder = createImageUrlBuilder({
  projectId: projectId || "demo",
  dataset,
});

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
    const data = await client
      .withConfig({
        projectId: projectId || "demo",
        dataset,
        apiVersion,
        useCdn,
      })
      .fetch<QueryResponse>(query, params);
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