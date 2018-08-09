import * as Express from "express";
import CalendarController from "./controllers/CalendarController";

declare const __dirname: string;

const app = Express();
app.set("view engine", "ejs");
app.set("views", __dirname);

app.get("/calendar/:id", (req: Express.Request, res: Express.Response) => {
    const controller = new CalendarController(req, res);
    controller.getCalendar(parseInt(req.params.id, 10));
});


app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});

export default app;
