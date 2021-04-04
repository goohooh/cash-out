import Schedule from "../../domain/entity/schedule";
import Expenditure from "../../domain/entity/expenditure";
import { ExpenseTypeColorMap } from "../../domain/value-object/expenseTypeColorMap";

import { format, eachDayOfInterval } from "date-fns";
import { numFormat } from "./util";

export const expenditureToSchedule = (expenditures: Expenditure[]): Schedule[] => {
  return expenditures
    .map(d => {
      const dayInterval: Date[] = eachDayOfInterval({
        start: d.dueDateStart,
        end: d.dueDateEnd,
      });

      if (dayInterval.length === 1) {
        return new Schedule({
          key: format(d.dueDateStart, "MM-dd"),
          title: d.name,
          subtitle: numFormat(d.amount),
          date: d.dueDateStart,
          color: ExpenseTypeColorMap[d.type].color,
          background: ExpenseTypeColorMap[d.type].background,
        });
      }

      // 납부 기한이 하루 이상인 경우
      return dayInterval.map((dateObj, i, arr) => {
        const isLast = i === arr.length - 1;
        return new Schedule({
          key: format(dateObj, "MM-dd"),
          title: d.name,
          subtitle: isLast ? numFormat(d.amount) : "",
          date: dateObj,
          color: ExpenseTypeColorMap[d.type].color,
          background: ExpenseTypeColorMap[d.type].background,
        });
      });
    })
    .flat();
}
