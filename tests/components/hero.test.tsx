import { render, screen } from "@testing-library/react";

import { HeroSection } from "@/components/marketing/hero";

describe("HeroSection", () => {
  it("renders the main marketing message", () => {
    render(<HeroSection />);

    expect(screen.getByText("Your AI Productivity Co-Pilot")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start free/i })).toBeInTheDocument();
  });
});
