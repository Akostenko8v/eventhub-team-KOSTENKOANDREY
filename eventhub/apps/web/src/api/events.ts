
import type { paths } from "../../../../packages/contracts/src/api";

export type EventsResponse =
  paths["/events"]["get"]["responses"][200]["content"]["application/json"];

export async function getEvents(): Promise<EventsResponse> {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL ?? "http://127.0.0.1:4010"}/events`
  );

  if (!response.ok) {
    throw new Error("Не удалось загрузить события");
  }

  return (await response.json()) as EventsResponse;
}
