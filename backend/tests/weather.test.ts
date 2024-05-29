import request from "supertest";
import app from "../src/app";
import {
  checkInternet,
  fetchDataFromDatabase,
} from "../src/modules/weather/weather.controller";
import moment from "moment";
const dns = require("dns").promises;

// jest.mock('dns', () => ({
//   promises: {
//     lookup: jest.fn(),
//   },
// }));

const weatherMockData = {
  condition: "Partly cloudy",
  condition_img: "//cdn.weatherapi.com/weather/64x64/day/116.png",
  createdAt: "2024/05/29",
  humidity: 62,
  id: 86,
  is_day: 1,
  local_time: "2024-05-29 10:50",
  location: "Kathmandu",
  temp_c: 28,
  temp_f: 82,
  wind_kph: "6.1",
  wind_mph: "3.8",
};

describe("base API", () => {
  it("should return 404 for an invalid endpoint", async () => {
    const response = await request(app).get("/invalid-endpoint");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: "Page not found",
      status: 404,
    });
  });
});

describe("Weather API", () => {

  // For valid query and data available in the database 
  it("should return weather data for a valid query and in case of no internet connectivity, there must be valid data in the database for the current date", async () => {
    const response = await request(app).get("/get-weather?q=London");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
  // For valid query but the data is not available in the database when there is no internet connectivity
  it("Internet connectivity (fails when internet is connected): won't return weather data for a valid query in case of no internet connectivity, and no valid data available in the database for the current date", async () => {
    const response = await request(app).get("/get-weather?q=London");
    expect(response.status).toBe(404);
  });


  it("should return 404 for no location found matching parameter", async () => {
    const response = await request(app).get("/get-weather?q=Londonss");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: `No matching location found.`,
      status: 404,
    });
  });

  it("Internet connectivity (fails when internet is connected): should return 404 for no location found matching parameter and no internet connectivity", async () => {
    const response = await request(app).get("/get-weather?q=Londonss");
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: `Weather data not found`,
      status: 404,
    });
  });

  it("should return 400 for no query provided", async () => {
    const response = await request(app).get("/get-weather?q=");
    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      message: `Parameter q is missing.`,
      status: 400,
    });
  });

  it("should return the data fetched from the database", async () => {
    const response = await fetchDataFromDatabase("2024/05/29", "kathmandu");
    expect(response).toEqual(weatherMockData);
  });

  // Comment out all the above tests and the dns mock at line no 6 - 10 to test the scenerio where there is no internet connectivity
  /** it('should respond true when server has internet connectivity', async () => {
    // Mock the external API to simulate no internet connectivity
    dns.lookup.mockResolvedValueOnce({});

    const result = await checkInternet();
    expect(result).toBe(true);
  });

  it('should return false when the server does not have internet connectivity', async () => {
    // Mock dns.lookup to simulate a failed lookup
    dns.lookup.mockRejectedValueOnce(new Error('Network Error'));

    const result = await checkInternet();
    expect(result).toBe(false);
  }); **/
});
