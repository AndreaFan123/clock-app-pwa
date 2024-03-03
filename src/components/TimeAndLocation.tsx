import "../App.css";

interface TimeAndLocationProps {
  fullTexts: string;
  shortTexts: string;
  formattedTime: string;
  timeZone?: string;
  country?: string;
  city?: string;
  icon: string;
}

export const TimeAndLocation = ({
  shortTexts,
  fullTexts,
  formattedTime,
  timeZone,
  country,
  city,
  icon,
}: TimeAndLocationProps) => {
  return (
    <>
      <div className="mainContent__greeting-textIcon">
        <img src={icon} alt="time icon" />
        <span className="mainContent__greeting-mobileText">{shortTexts}</span>
        <span className="mainContent__greeting-desktopText">{fullTexts}</span>
      </div>
      <div className="mainContent__timeLocation-container">
        <div className="mainContent__timeLocation-time">
          <span>{formattedTime}</span>
          <span>{timeZone}</span>
        </div>
        <span className="mainContent__timeLocation-location">
          in {city}, {country}
        </span>
      </div>
    </>
  );
};
