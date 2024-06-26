import { convertDate } from "@/utils/convertDate";

describe("convertDate", () => {
  it("should return Date object", () => {
    const dateString = "20210101235959";
    const result = convertDate(dateString);
    expect(result).toBeInstanceOf(Date);
  });
  it("should return correct Date object", () => {
    const dateString = "20210101235959";
    const result = convertDate(dateString);
    expect(result.getFullYear()).toBe(2021);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(59);
    expect(result.getSeconds()).toBe(59);
  });
});
