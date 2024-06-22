import { useContext } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";
import ja from "dayjs/locale/ja";

dayjs.locale(ja);

// ヘッダー
export const Header = () => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);
  // 前月へ戻る
  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  // 来月へ進む
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  const handleReset = () => {
    // 現在の月を取得
    setMonthIndex(dayjs().month());
  };

  return (
    <header className="px-4 py-2 flex items-center">
      <h1 className="mr-10 text-xl text-gray-500 fond-bold">Calendar</h1>
      <h2 className="mr-10 text-xl text-gray-500 font-bold">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("YYYY MMMM")}
      </h2>
      <button onClick={handleReset} className="border rounded py-2 px-4 mr-5">
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <MdChevronLeft />
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="cursor-pointer text-gray-600 mx-2">
          <MdChevronRight />
        </span>
      </button>
    </header>
  );
};
