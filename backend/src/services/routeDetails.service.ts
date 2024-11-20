import { Client, TravelMode } from "@googlemaps/google-maps-services-js";
import Drivers from "../utils/driversMock.json";

const googleMapsClient = new Client({});
const GOOGLE_MAPS_API_KEY: string | any = process.env.GOOGLE_MAPS_API_KEY;

interface Driver {
  name: string;
  minDistance: number;
  costPerKm: number;
  description: string;
  vehicle: string;
  evaluation: string;
  comments: string;
}

const drivers: Partial<Driver>[] = Drivers;

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

export const getAvailableDrivers = (routeDistance: number): any[] => {
  return drivers
    .filter(
      (driver) =>
        driver.minDistance !== undefined && driver.minDistance <= routeDistance
    )
    .map((driver) => {
      const costPerKm = driver.costPerKm ?? 0;
      return {
        ...driver,
        totalCost: costPerKm * routeDistance,
      };
    })
    .sort((a, b) => a.totalCost - b.totalCost);
};
