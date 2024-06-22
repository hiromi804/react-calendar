import React, { useReducer, useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import dayjs, { Dayjs } from "dayjs";
import { eventType } from "context/GlobalContext";

interface ContextWrapperProps {
  children: React.ReactElement;
}

type Action =
  | { type: "push"; payload: eventType }
  | { type: "update"; payload: eventType }
  | { type: "delete"; payload: eventType };

const saveEventsReducer = (state: eventType[], action: Action): eventType[] => {
  switch (action.type) {
    case "push":
      return [...state, action.payload];
    case "update":
      return state.map((evt) =>
        evt.id === action.payload.id ? action.payload : evt
      );
    case "delete":
      return state.filter((evt) => evt.id !== action.payload.id);
    default:
      throw new Error("Unexpected action");
  }
};

// 初期状態を取得
const initEvents = (): eventType[] => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

const ContextWrapper: React.FC<ContextWrapperProps> = (props) => {
  const [monthIndex, setMonthIndex] = useState<number>(dayjs().month());
  const [daySelected, setDaySelected] = useState<Dayjs>(dayjs());
  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<eventType | null>(null);
  const [savedEvents, dispatchCalEvent] = useReducer(
    saveEventsReducer,
    [],
    initEvents
  );

  // localStorageにデータを設定
  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  // モーダルフラグがfalseの場合はselectedEventをnullに設定
  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  return (
    <GlobalContext.Provider
      value={{
        monthIndex, // 月のインデックス 6月なら5
        setMonthIndex, // 当月のインデックスの更新関数
        daySelected, // クリックされた日
        setDaySelected, // クリックされた日の更新関数
        showEventModal, // モーダルの表示フラグ
        setShowEventModal, // モーダルの表示フラグの更新関数
        selectedEvent, // 登録されているイベント
        setSelectedEvent, // 登録されているイベントの更新関数
        dispatchCalEvent, // カレンダーのイベント送信
        savedEvents, // 登録されている全てのイベント
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;
