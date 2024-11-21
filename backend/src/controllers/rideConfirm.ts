import { Request, Response } from "express";
import pool from "../config/database";
import Drivers from "../utils/driversMock.json";

interface Driver {
  id: number;
  name: string;
  minDistance: number;
}

interface RideRequest {
  origin: string;
  destination: string;
  customer_id: string;
  driver: { id: string };
  distance: number;
  duration?: number;
}

const drivers: Partial<Driver>[] = Drivers;

export const rideConfirm = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { origin, destination, customer_id, driver, distance, duration } =
      req.body as RideRequest;

    if (
      !origin ||
      !destination ||
      !customer_id ||
      !driver?.id ||
      !distance ||
      origin === destination
    ) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description:
          "Os dados fornecidos no corpo da requisição são inválidos",
      });
    }

    const getDriver: any = drivers.find((d: any) => d.id === driver.id);

    const eligibleDrivers = drivers.filter(
      (driver: any) => distance >= driver.minDistance
    );

    if (!getDriver || eligibleDrivers.length === 0) {
      return res.status(404).json({
        error_code: "DRIVER_NOT_FOUND",
        error_description: "Motorista não encontrado",
      });
    }

    if (
      typeof distance !== "number" ||
      distance <= 0 ||
      distance < getDriver.minDistance
    ) {
      return res.status(406).json({
        error_code: "INVALID_DISTANCE",
        error_description: "Quilometragem inválida para o motorista",
      });
    }

    const { rows } = await pool.query(
      "INSERT INTO TripConfirm (origin, destination, distance, duration, confirmed, customer, driver) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [origin, destination, distance, duration, true, customer_id, getDriver.id]
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Ocorreu um erro ao processar sua solicitação",
    });
  }
};
