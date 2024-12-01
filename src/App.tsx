import clsx from "clsx";
import { useImmer } from "use-immer";

// Times are HH:MM

interface ITimeEntry {
  time: string;
  description: string;
}

const startHour = 8;
const endHour = 21;

const hours: string[] = [];

for (let i = startHour; i <= endHour; i++) {
  hours.push(`${i}:00`);
  // hours.push(`${i}:30`);
}

function to12HourFormat(time: string) {
  const [hour, minute] = time.split(":");
  const hour12 = parseInt(hour) % 12 || 12;
  return `${hour12}:${minute} ${parseInt(hour) < 12 ? "AM" : "PM"}`;
}

function App() {
  const [timeEntries, setTimeEntries] = useImmer<ITimeEntry[]>(
    hours.map((time) => ({
      time,
      description: "",
    }))
  );

  return (
    <div className="w-screen h-screen">
      <div className="flex flex-col w-full h-full p-4">
        {timeEntries.map((entry, index) => {
          return (
            <div
              key={entry.time}
              className={clsx("flex flex-1 items-center px-4 py-2")}
            >
              <div className="text-xs w-20">{to12HourFormat(entry.time)}</div>
              <div className="text-sm flex-1">
                <input
                  type="text"
                  className="w-full p-2 px-3 bg-gray-100 text-gray-800"
                  value={entry.description}
                  onChange={(e) => {
                    setTimeEntries((draft) => {
                      draft[index].description = e.target.value;
                    });
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
