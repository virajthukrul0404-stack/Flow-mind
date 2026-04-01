import { getPlanAmount, PLAN_CATALOG } from "@/lib/payments";

describe("payments catalog", () => {
  it("returns plan pricing for both currencies", () => {
    expect(getPlanAmount("PRO", "monthly", "USD")).toBe(PLAN_CATALOG.PRO.monthly.usd);
    expect(getPlanAmount("TEAM", "annual", "INR")).toBe(PLAN_CATALOG.TEAM.annual.inr);
  });
});
