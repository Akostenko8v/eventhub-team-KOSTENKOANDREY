
import createClient from "openapi-fetch";
import type { paths } from "@eventhub/contracts";

const client = createClient<paths>({
  baseUrl: import.meta.env.VITE_API_URL ?? "http://127.0.0.1:4010",
});

export type EventsResponse =
  paths["/events"]["get"]["responses"][200]["content"]["application/json"];

export async function getEvents(): Promise<EventsResponse> {
  const { data, error, response } = await client.GET("/events", {
    headers: {
      Prefer: "example=filled",
    },
  });

  if (error || !data) {
    throw new Error(`Не удалось загрузить события (${response.status})`);
  }

  return data;
}
