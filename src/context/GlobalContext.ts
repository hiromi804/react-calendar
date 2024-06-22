import dayjs from "dayjs";
import { createContext, Dispatch, SetStateAction } from "react";

export type eventType = {
  title: string;
  day: number | undefined;
  id: number;
};

interface GlobalContextType {
  monthIndex: number;
  setMonthIndex: Dispatch<SetStateAction<number>>;

  daySelected: dayjs.Dayjs | null;
  setDaySelected: Dispatch<SetStateAction<dayjs.Dayjs>>;

  showEventModal: boolean;
  setShowEventModal: Dispatch<SetStateAction<boolean>>;

  dispatchCalEvent: ({
    type,
    payload,
  }: {
    type: "push" | "update" | "delete";
    payload: eventType;
  }) => void;

  savedEvents: eventType[] | [];

  selectedEvent: eventType | null;
  setSelectedEvent: Dispatch<SetStateAction<eventType | null>>;
}

// 初期値
const initialContext: GlobalContextType = {
  monthIndex: 0,
  setMonthIndex: () => {},
  daySelected: null,
  setDaySelected: () => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
};

const GlobalContext = createContext<GlobalContextType>(initialContext);

export default GlobalContext;
