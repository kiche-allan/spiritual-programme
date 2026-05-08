import { render, screen } from "@testing-library/react";
import { WeekCard } from "@/components/week/WeekCard";
import { WEEKS_META } from "@/lib/weeks";

const mockWeek = WEEKS_META[0];

describe("WeekCard", () => {
  it("renders week title", () => {
    render(<WeekCard week={mockWeek} />);
    expect(screen.getByText(mockWeek.title)).toBeInTheDocument();
  });

  it("renders hero verse", () => {
    render(<WeekCard week={mockWeek} />);
    expect(screen.getByText(new RegExp(mockWeek.heroRef))).toBeInTheDocument();
  });

  it("shows This Week badge when isLatest is true", () => {
    render(<WeekCard week={mockWeek} isLatest />);
    expect(screen.getByText("This Week")).toBeInTheDocument();
  });

  it("does not show This Week badge when isLatest is false", () => {
    render(<WeekCard week={mockWeek} />);
    expect(screen.queryByText("This Week")).not.toBeInTheDocument();
  });

  it("shows Not started when no progress", () => {
    render(<WeekCard week={mockWeek} progress={{ pct: 0, done: 0 }} />);
    expect(screen.getByText("Not started")).toBeInTheDocument();
  });

  it("shows Complete when all days done", () => {
    render(<WeekCard week={mockWeek} progress={{ pct: 100, done: 7 }} />);
    expect(screen.getByText("✓ Complete")).toBeInTheDocument();
  });

  it("shows partial progress correctly", () => {
    render(<WeekCard week={mockWeek} progress={{ pct: 43, done: 3 }} />);
    expect(screen.getByText("3 / 7 days")).toBeInTheDocument();
  });

  it("links to the correct week URL", () => {
    render(<WeekCard week={mockWeek} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", `/week/${mockWeek.id}`);
  });
});
