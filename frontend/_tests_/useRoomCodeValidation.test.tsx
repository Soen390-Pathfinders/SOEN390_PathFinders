import useRoomCodeValidation from "@/app/hooks/useRoomCodeValidation";
import { renderHook } from "@testing-library/react";

describe("useRoomCodeValidation", () => {
  //test the vald nput of the form 'H-521'
  const { validateRoomCode } = useRoomCodeValidation();

  test("should return true for valid room code", () => {
    const result = validateRoomCode("H-521");
    expect(result.isValid).toBe(true);
    expect(result.errorMessage).toBe("");
  });

  test("should return false for room code wthout hiphen", () => {
    const result = validateRoomCode("H521");
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe(
      "Invalid room code. Please enter a code in the format LETTERS-DIGITS (H-521)."
    );
  });
  //should return false for room code that dont start wth a letter
  test("should return false for room code wthout startng letter", () => {
    const result = validateRoomCode("521");
    expect(result.isValid).toBe(false);
    expect(result.errorMessage).toBe(
      "Invalid room code. Please enter a code in the format LETTERS-DIGITS (H-521)."
    );
  });
});
