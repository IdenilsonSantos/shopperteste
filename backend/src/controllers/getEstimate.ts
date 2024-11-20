import { Request, Response } from "express";
import {
  getAvailableDrivers,
  getRouteDetails,
} from "../services/routeDetails.service";

interface RouteDetails {
  origin: { lat: number; lng: number };
  destination: { lat: number; lng: number };
  distance: string;
  duration: string;
  routeDetails: any;
}

interface Driver {
  id: string;
  name: string;
  description: string;
  vehicle: string;
  evaluation: number;
  totalCost: number;
}

interface GetEstimateRequestBody {
  origin: string;
  destination: string;
  customer_id: string;
}

export const getEstimate = async (
  req: Request<{}, {}, GetEstimateRequestBody>,
  res: Response
) => {
  const { origin, destination, customer_id } = req.body;

  if (!origin || !destination || !customer_id) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error: "Origem, destino e usuário são obrigatórios",
    });
  }

  if (origin === destination) {
    return res.status(400).json({
      error_code: "INVALID_DATA",
      error: "Origem e destino não podem ser iguais",
    });
  }

  try {
    const routeDetails: RouteDetails = await getRouteDetails(
      origin,
      destination
    );
    const routeDistanceInKm: number = parseFloat(
      routeDetails.distance.replace(" km", "")
    );

    const availableDrivers: Driver[] = await getAvailableDrivers(
      routeDistanceInKm
    );

    return res.status(200).json({
      origin: {
        latitude: routeDetails.origin.lat,
        longitude: routeDetails.origin.lng,
      },
      destination: {
        latitude: routeDetails.destination.lat,
        longitude: routeDetails.destination.lng,
      },
      distance: routeDistanceInKm,
      duration: routeDetails.duration,
      availableDrivers: availableDrivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        description: driver.description,
        vehicle: driver.vehicle,
        evaluation: driver.evaluation,
        totalCost: driver.totalCost,
      })),
      routeResponse: routeDetails.routeDetails,
    });
  } catch (error: any) {
    return res.status(500).json({
      error: error.message || "Um erro aconteceu ao processar a operação",
    });
  }
};
