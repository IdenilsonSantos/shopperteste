import { Request, Response } from "express";
import pool from "../config/database";

interface RideRequest {
  origin: string;
  destination: string;
  customer_id: string;
  driver: { id: string };
  totalCost: number;
  distance: number;
  duration?: number;
}


export const rideConfirm = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const {
      origin,
      destination,
      customer_id,
      driver,
      distance,
      duration,
      totalCost,
    } = req.body as RideRequest;

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

    const queryDriver = "SELECT * FROM drivers WHERE id = $1"
    const paramsDriver = [driver.id];

    const { rows: drivers } = await pool.query(queryDriver, paramsDriver);


    const getDriver: any = drivers.find((d: any) => d.id === driver.id);

    const eligibleDrivers = drivers.filter(
      (driver: any) => distance >= driver.min_distance
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
      distance < getDriver.min_distance
    ) {
      return res.status(406).json({
        error_code: "INVALID_DISTANCE",
        error_description: "Quilometragem inválida para o motorista",
      });
    }

    const currentDate = new Date();

    const driversToSave = {
      id: drivers[0].id,
      name: drivers[0].name
    }

    const { rows } = await pool.query(
      "INSERT INTO TripConfirm (origin, destination, distance, duration, customer, driver, date, totalcost) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        origin,
        destination,
        distance,
        duration,
        customer_id,
        driversToSave,
        currentDate,
        totalCost || 0.0,
      ]
    );

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Ocorreu um erro ao processar sua solicitação",
    });
  }
};
