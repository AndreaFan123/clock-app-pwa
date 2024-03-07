// Write test to test the toggle functionality of the button
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ToggleButton } from "../components/ToggleButton";

describe("ToggleButton Component", () => {
  test("toggle text and image rotation on click", () => {
    const mockOnShowMore = jest.fn();

    render(<ToggleButton onShowMore={mockOnShowMore} showMore={false} />);
    expect(screen.getByText("more")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button"));
    expect(mockOnShowMore).toHaveBeenCalled();

    render(<ToggleButton onShowMore={mockOnShowMore} showMore={true} />);
    expect(screen.getByText("less")).toBeInTheDocument();
  });
});
