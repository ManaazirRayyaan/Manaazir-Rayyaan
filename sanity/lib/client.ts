import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/lib/sanity/env";

export const client = createClient({
  projectId: projectId || "demo",
  dataset,
  apiVersion,
  useCdn: true,
});
