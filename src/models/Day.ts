import Event from "./Event"
import { DateTime } from "luxon";

const holiday: Array<any> = require("../assets/holiday");

export default class Day {
    constructor(
        public year: number,
        public month: number,
        public day: number,
        public weekday: number,
        public isRest: boolean,
        public events: Event[]
    ) {

    }

    get ISO() {
        return DateTime.local(this.year, this.month, this.day).toISO();
    }

    isHoliday() {
        return this.events.some((event: Event) => {
            return event.isHoliday;
        });
    }

    isSaturday() {
        return this.weekday === 6;
    }

    isSunday() {
        return this.weekday === 7;
    }

    static fromDateTime(dateTime: DateTime, isRest: boolean = false): Day {
        const events = this.findEvents(dateTime).map((event: any) => {
            return {
                name: event.name,
                isHoliday: true
            };
        });
        return new Day(
            dateTime.year,
            dateTime.month,
            dateTime.day,
            dateTime.weekday,
            isRest,
            events
        );
    }

    private static findEvents(dateTime: DateTime): Event[] {
        return holiday.filter((day) => {
            return (
                day.start.year === dateTime.year
                && day.start.month === dateTime.month
                && day.start.day === dateTime.day
            )
        })
    }
}
