import refreshIcon from "../asset/icon-refresh.svg";
import { QuoteDataType } from "../types/type";
import "../App.css";

interface QuoteProps {
  quote: QuoteDataType;
  handleRefreshQuote: () => void;
}

export const Quote = ({ quote, handleRefreshQuote }: QuoteProps) => {
  return (
    <>
      <div className="mainContent__quote-texts">
        <p>"{quote.content}"</p>
        <button type="button" onClick={handleRefreshQuote}>
          <img src={refreshIcon} alt="Refresh icon, click to refresh quote" />
        </button>
      </div>
      <span>{quote.author}</span>
    </>
  );
};
