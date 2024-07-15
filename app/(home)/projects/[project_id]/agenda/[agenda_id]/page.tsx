"use client";

import Calendar from "@/app/(home)/agenda/components/calendar";
// import WithDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { events } from "@/lib/Mockdata";
import { useRouter } from "next/navigation";
import useAgenda from "@/app/api/agenda/get-agenda";
import useEvent from "@/app/api/event/get-events";
import moment from "moment";
import Loading from "@/components/ui/loading";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IProps {
  params: { agenda_id: string };
}

type event_res = {
  description: string;
  end_time: string;
  id: string;
  name: string;
  participants: Participant[];
  start_time: string;
};

type Participant = {
  id: string;
};

type event = {
  title: string;
  start: Date;
  end: Date;
  id: string;
  data: {
    agenda_id: string;
    description: string;
    participants: Participant[];
  };
};

export default function ConcreteAgendaPage({ params }: IProps) {
  const { agenda_id } = params;

  const router = useRouter();
  const { data: agenda_data, error: agenda_error } = useAgenda({ agenda_id });
  const agenda_name = agenda_data.name;

  const { data: event_data, error: event_error } = useEvent({ agenda_id });
  const events = event_data.events;
  let events_new: event[] = [];

  events.map((event: event_res) => {
    const startDate = moment(event.start_time, "YYYY-MM-DDThh:mm:ss[.mmm]TZD").toDate();
    const endDate = moment(event.end_time, "YYYY-MM-DDThh:mm:ss[.mmm]TZD").toDate();
    let event_new = {
      id: event.id,
      title: event.name,
      start: startDate,
      end: endDate,
      data: {
        agenda_id: agenda_id,
        description: event.description,
        participants: event.participants,
      },
    };
    events_new.push(event_new);
  });

  const handleEventClick = (event: event) => {
    router.push(`./${agenda_id}/${event.id}`);
    console.log(event.title);
  };

  if (!agenda_data) return <Loading />;
  if (event_data.events.length === 0) {
    return <Loading />;
  }

  return (
    <div style={{ height: "90vh" }}>
      <Label>{agenda_name}</Label>
      <Calendar
        events={events_new}
        views={["month", "week", "day"]}
        onSelectEvent={(event) => {
          handleEventClick(event as any);
        }}
      ></Calendar>
      <div className="flex justify-end mt-5">
        <Button>
          <Link href={`./`}>返回</Link>
        </Button>
      </div>
    </div>
  );
}
