import { useEffect, useState } from "react";
import { getEvents } from "../../api/events";

type Event = Awaited<ReturnType<typeof getEvents>>["items"][number];

export function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data.items))
      .catch(() => setError("Не удалось загрузить события"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Загрузка событий...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section>
      <h2>Каталог событий</h2>

      {events.length === 0 ? (
        <p>Событий пока нет.</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h3>{event.title}</h3>
              <p>Дата: {new Date(event.startsAt).toLocaleString("ru-RU")}</p>
              <p>Место: {event.venue.name + ", " + event.venue.city}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
