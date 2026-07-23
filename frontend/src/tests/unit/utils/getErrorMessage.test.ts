import { describe, expect, it } from "vitest";
import { getErrorMessage } from "../../../utils/getErrorMessage";

describe("getErrorMessage", () => {
  it("returns the message when the error is an Error instance", () => {
    const result = getErrorMessage(new Error("network down"), "fallback");

    expect(result).toBe("network down");
  });

  it("returns the fallback when the error is not an Error instance", () => {
    expect(getErrorMessage("some string", "fallback")).toBe("fallback");
    expect(getErrorMessage(undefined, "fallback")).toBe("fallback");
    expect(getErrorMessage({ code: 500 }, "fallback")).toBe("fallback");
  });
});
