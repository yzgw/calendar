import { DateTime } from "luxon";
import Day from "../models/Day";

export class CalendarService {

    getYearData(year: number) {
        const data = [];
        for(let i = 1; i <= 12; i++) {
            data.push(
                {
                    month: i,
                    days: this.getMonthDate(year, i)
                }
            );
        }
        return data;
    }

    private getMonthDate(year: number, month: number) {
        const start = DateTime.fromObject(
            {year: year, month: month, day: 1, zone: "Asia/Tokyo"}
        );
        let current = start;

        const data = [];

        while (current.month === month) {
            data.push(Day.fromDateTime(current));
            current = current.plus({days: 1});
        }

        const last = current.minus({days: 1});

        const head = start.weekday === 7 ? 0 : start.weekday;
        const tail = 7 - last.weekday - 1;

        for (let i = 1; i <= head; i++) {
            data.unshift(Day.fromDateTime(start.minus({days: i}), true));
        }

        for (let i = 1; i <= tail; i++) {
            data.push(Day.fromDateTime(last.plus({days: i}), true));
        }

        return data;
    }

}
