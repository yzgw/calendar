import * as Express from "express";

declare const __dirname: string;

const app = Express();
app.set("view engine", "ejs");
app.set("views", __dirname);

app.get("/", (req: Express.Request, res: Express.Response) => {
    res.render("calendar.ejs", { });
});

app.listen(3000, () => {
    console.log("Example app listening on port 3000!");
});

export default app;
