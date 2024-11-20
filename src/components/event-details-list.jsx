import { Box, Calendar, Map } from "lucide-react";

export const EventDetails = ({ event }) => {
  return (
    <ul className="flex flex-col gap-2">
      <li className="flex items-center gap-2 text-sm">
        <Box className="h-5 w-5" />
        <span>Organizer: {event.profiles.full_name}</span>
      </li>
      <li className="flex items-center gap-2 text-sm">
        <Calendar className="h-5 w-5" />
        <span>Date: {event.event_date}</span>
      </li>
      <li className="flex items-center gap-2 text-sm">
        <Map className="h-5 w-5" />
        <span>Location: {event.event_location}</span>
      </li>
    </ul>
  );
};
