import { parseTaskInput } from "@/lib/ai";

describe("parseTaskInput", () => {
  it("extracts tags, estimates, and urgency from natural language", () => {
    const result = parseTaskInput("finish proposal by Monday 3pm #work 45 min urgent");

    expect(result.title).toContain("finish proposal");
    expect(result.tags).toContain("work");
    expect(result.estimatedMinutes).toBe(45);
    expect(result.priority).toBe("urgent");
  });
});
