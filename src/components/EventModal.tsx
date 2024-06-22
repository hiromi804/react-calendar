import React, { useState, useContext, FormEvent } from "react";
import { MdDeleteForever, MdClose } from "react-icons/md";
import GlobalContext from "context/GlobalContext";

interface CalendarEvent {
  title: string;
  day: number | undefined;
  id: number;
}

// イベント登録モーダル
export const EventModal: React.FC = () => {
  const { daySelected, setShowEventModal, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const calendarEvent: CalendarEvent = {
      title: title,
      day: daySelected?.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    // selectedEventがあれば更新なければ新規登録
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    // モーダルを非表示
    setShowEventModal(false);
  };

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form
        className="bg-white rounded-lg shadow-2xl w-1/4"
        onSubmit={handleSubmit}
      >
        <header className="bg-gray-100 px-4 py-2 flex justify-end">
          <div className="text-gray-400">
            {selectedEvent && (
              <button
                onClick={() => {
                  dispatchCalEvent({ type: "delete", payload: selectedEvent });
                  setShowEventModal(false);
                }}
              >
                <MdDeleteForever />
              </button>
            )}
            <button onClick={() => setShowEventModal(false)}>
              <MdClose />
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="タイトルを追加"
              value={title}
              required
              className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
              onChange={(e) => setTitle(e.target.value)}
            />
            <p>{daySelected?.format("MMMM DD dddd, ")}</p>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};
