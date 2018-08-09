import { CalendarService } from "../services/CalendarService";
import BaseController from "./BaseController";

export default class CalendarController extends BaseController {

    getCalendar(year: number) {
        const service = new CalendarService();
        const data = service.getYearData(year);
        this.res.render("./views/calendar.ejs", {data});
    }

}
