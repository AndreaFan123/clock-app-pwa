import { TimezoneDataTypes } from "../types/type";

interface TimezoneDataTypes {
  currentTimezone: string;
  dayOfYear: number;
  dayOfWeek: number;
  weekNumber: number;
  dayTime: boolean;
  afternoon: boolean;
}

export const ExpendInfo = ({
  currentTimezone,
  dayOfYear,
  dayOfWeek,
  weekNumber,
  afternoon,
  dayTime,
}: TimezoneDataTypes) => {
  return (
    <table>
      <tbody>
        <tr>
          <td
            className="expendInfo__td-title"
            style={{ color: dayTime || afternoon ? "#999" : "#fff" }}
          >
            current timezone
          </td>
          <td
            className="expendInfo__td-description"
            style={{ color: dayTime || afternoon ? "#000" : "#fff" }}
          >
            {currentTimezone}
          </td>
        </tr>
        <tr>
          <td
            className="expendInfo__td-title"
            style={{ color: dayTime || afternoon ? "#999" : "#fff" }}
          >
            Day of the year
          </td>
          <td
            className="expendInfo__td-description"
            style={{ color: dayTime || afternoon ? "#000" : "#fff" }}
          >
            {dayOfYear}
          </td>
        </tr>
        <tr>
          <td
            className="expendInfo__td-title"
            style={{ color: dayTime || afternoon ? "#999" : "#fff" }}
          >
            Day of the week
          </td>
          <td
            className="expendInfo__td-description"
            style={{ color: dayTime || afternoon ? "#000" : "#fff" }}
          >
            {dayOfWeek}
          </td>
        </tr>
        <tr>
          <td
            className="expendInfo__td-title"
            style={{ color: dayTime || afternoon ? "#999" : "#fff" }}
          >
            Week number
          </td>
          <td
            className="expendInfo__td-description"
            style={{ color: dayTime || afternoon ? "#000" : "#fff" }}
          >
            {weekNumber}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
