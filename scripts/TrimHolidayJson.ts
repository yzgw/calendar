import * as fs from "fs";

const path = "src/assets/holiday.json";
const file = fs.readFileSync(path, "utf8");
const json = JSON.parse(file);

if (!json["VCALENDAR"]) {
    process.exit(1);
}

const trimed = json["VCALENDAR"][0]["VEVENT"].map((day) => {
    const start: string = day["DTSTART;VALUE=DATE"];
    const end: string = day["DTEND;VALUE=DATE"];

    return {
        name: day["SUMMARY"],
        start: {
            year: parseInt(start.substr(0, 4), 10),
            month: parseInt(start.substr(4, 2), 10),
            day: parseInt(start.substr(6, 2), 10)
        },
        end: {
            year: parseInt(end.substr(0, 4), 10),
            month: parseInt(end.substr(4, 2), 10),
            day: parseInt(end.substr(6, 2), 10)
        }
    }
}).sort((a, b) => {
    return a.start.year - b.start.year || a.start.month - b.start.month || a.start.day - b.start.day;
});

fs.writeFileSync(path, JSON.stringify(trimed, undefined, 2));
console.log("json trim completed");
