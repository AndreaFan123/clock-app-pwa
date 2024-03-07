interface TimezoneDataTypes {
  currentTimezone: string;
  dayOfYear: number;
  dayOfWeek: number;
  weekNumber: number;
  dayTime: boolean;
}

export const ExpendInfo = ({
  currentTimezone,
  dayOfYear,
  dayOfWeek,
  weekNumber,
  dayTime,
}: TimezoneDataTypes) => {
  return (
    <table>
      <tbody>
        <tr>
          <td
            className="expendInfo__td-title"
            style={{ color: dayTime ? "#999" : "#fff" }}
          >
            current timezone
          </td>
          <td
            className="expendInfo__td-description"
            style={{ color: dayTime ? "#000" : "#fff" }}
          >
            {currentTimezone}
          </td>
        </tr>
        <tr>
          <td
            className="expendInfo__td-title"
            style={{ color: dayTime ? "#999" : "#fff" }}
          >
            Day of the year
          </td>
          <td
            className="expendInfo__td-description"
            style={{ color: dayTime ? "#000" : "#fff" }}
          >
            {dayOfYear}
          </td>
        </tr>
        <tr>
          <td
            className="expendInfo__td-title"
            style={{ color: dayTime ? "#999" : "#fff" }}
          >
            Day of the week
          </td>
          <td
            className="expendInfo__td-description"
            style={{ color: dayTime ? "#000" : "#fff" }}
          >
            {dayOfWeek}
          </td>
        </tr>
        <tr>
          <td
            className="expendInfo__td-title"
            style={{ color: dayTime ? "#999" : "#fff" }}
          >
            Week number
          </td>
          <td
            className="expendInfo__td-description"
            style={{ color: dayTime ? "#000" : "#fff" }}
          >
            {weekNumber}
          </td>
        </tr>
      </tbody>
    </table>
  );
};
