import { Request, Response } from "express";
import pool from "../config/database";
import Drivers from "../utils/driversMock.json";

interface Driver {
  id: number;
  name: string;
  minDistance: number;
}

export const getRide = async (req: Request, res: Response) => {
  try {
    const { driver_id } = req.query;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error_code: "INVALID_DATA",
        error_description: "O cliente é orbigatório",
      });
    }

    const queryDriver = "SELECT  FROM drivers WHERE id = $1"
    const paramsDriver = [driver_id];

    const { rows: drivers } = await pool.query(queryDriver, paramsDriver);

    if (driver_id && !drivers) {
      return res.status(400).json({
        error_code: "INVALID_DRIVER",
        error_description: "Motorista não encontrado",
      });
    }

    const query = driver_id
      ? "SELECT * FROM tripconfirm WHERE customer = $1 AND driver->>'id' = $2 ORDER BY id DESC"
      : "SELECT * FROM tripconfirm WHERE customer = $1 ORDER BY id DESC";
    const params = driver_id ? [id, driver_id] : [id];

    const { rows } = await pool.query(query, params);

    if (rows.length === 0) {
      return res.status(404).json({
        error_code: "NO_RIDES_FOUND",
        error_description:
          "Nenhuma viagem encontrada para os critérios fornecidos",
      });
    }

    return res.status(200).json({
      customer_id: id,
      rides: rows.map((row) => ({
        ...row
      })),
    });
  } catch (error) {
    return res.status(500).json({
      error_code: "INTERNAL_SERVER_ERROR",
      error_description: "Ocorreu um erro ao processar sua solicitação",
    });
  }
};
