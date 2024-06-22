import dayjs from "dayjs";

export function getMonth(month = dayjs().month()) {
  const year = dayjs().year();
  // 1行目に表示される前月の日数を取得
  const lastDayOfTheMonth = dayjs(new Date(year, month, 1)).day();

  // カレンダーの最初の行に表示される今月の日数 1日なら-6
  let currentMonthCount = 0 - lastDayOfTheMonth;

  // カレンダーの行と列を作成
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}
