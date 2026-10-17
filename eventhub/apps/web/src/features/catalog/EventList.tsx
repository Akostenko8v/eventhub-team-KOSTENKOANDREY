import { useEffect, useState } from "react";
import { getEvents } from "../../api/events";

type Event = Awaited<ReturnType<typeof getEvents>>[number];

export function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvents()
      .then(setEvents)
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
              <p>Дата: {new Date(event.date).toLocaleString("ru-RU")}</p>
              <p>Место: {event.location ?? "Не указано"}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
