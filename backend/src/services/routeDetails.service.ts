import { Client, TravelMode } from "@googlemaps/google-maps-services-js";
import pool from "../config/database";

const googleMapsClient = new Client({});
const GOOGLE_MAPS_API_KEY: string | any = process.env.GOOGLE_MAPS_API_KEY;

interface Driver {
  id: number;
  name: string;
  min_distance: number;
  cost_per_km: number;
}

export const getRouteDetails = (
  origin: string,
  destination: string
): Promise<any> => {
  return new Promise((resolve, reject) => {
    googleMapsClient
      .directions({
        params: {
          origin,
          destination,
          mode: TravelMode.driving,
          key: GOOGLE_MAPS_API_KEY,
        },
      })
      .then((response) => {
        const route = response.data.routes[0].legs[0];
        resolve({
          distance: route.distance.text,
          duration: route.duration.text,
          origin: route.start_location,
          destination: route.end_location,
          routeDetails: response.data,
        });
      })
      .catch((err) => reject(err));
  });
};

export const getAvailableDrivers = async (routeDistance: number): Promise<Partial<Driver>[]> => {
  const queryDriver = "SELECT * FROM drivers";
  const { rows: drivers } = await pool.query(queryDriver);

  return drivers
    .filter((driver: Driver) => driver.min_distance <= routeDistance)
    .map(({ min_distance, cost_per_km, ...driver }: Driver) => {
      const totalCost = (cost_per_km ?? 0) * routeDistance;
      return {
        ...driver,
        totalCost,
      };
    })
    .sort((a, b) => a.totalCost - b.totalCost);
};
