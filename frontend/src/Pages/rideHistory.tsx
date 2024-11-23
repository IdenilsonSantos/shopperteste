import React, { useState, useCallback, useEffect, useMemo } from "react";
import InputField from "../components/Input";
import SelectInputField from "../components/Select";
import Drivers from "../utils/driversMock.json";
import fetchData from "../utils/fetch";
import { Bounce, toast } from "react-toastify";
import { formatCurrency } from "../utils/currency";
import { formatDate, formatDuration } from "../utils/date";

interface Driver {
  name: string;
  description: string;
  vehicle: string;
  evaluation: string;
}

interface Ride {
  id: string;
  origin: string;
  destination: string;
  date: string;
  distance: number;
  duration: string;
  driver: Driver;
  totalcost: number;
}

interface ApiResponse {
  rides: Ride[];
}

export default function RideHistoryPage() {
  const [values, setValues] = useState({
    driver_id: "",
    id: "",
  });

  const [data, setData] = useState<Ride[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getHistory = useCallback(async (): Promise<void> => {
    if (!values.id) return;

    try {
      const extraQuery = values.driver_id
        ? `?driver_id=${values.driver_id}`
        : "";
      const response = await fetchData<ApiResponse>(
        `http://localhost:8080/ride/${values.id}${extraQuery}`,
        "GET"
      );

      if (response) {
        setData(response.rides || []);
      }
    } catch (error: any) {
      toast.error(error || "Ocorreu um erro ao buscar hisórico de corridas", {
        transition: Bounce,
      });
      setData([])
    }
  }, [values.id, values.driver_id]);

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  const rideList = useMemo(() => {
    return data.map(
      ({
        id,
        origin,
        destination,
        date,
        distance,
        duration,
        driver,
        totalcost,
      }) => ({
        id,
        origin,
        destination,
        date: formatDate(date),
        distance,
        duration: formatDuration(duration),
        driverName: driver.name,
        totalCost: formatCurrency(+totalcost),
      })
    );
  }, [data]);

  return (
    <div className="flex flex-wrap w-full h-full my-12 justify-between">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-6">
          Histórico de corridas
        </h1>
        <div className="flex gap-2 mb-4">
          <InputField
            label="Id do usuário"
            value={values.id}
            onChange={handleChange}
            name="id"
          />
          <SelectInputField
            label="Motorista"
            options={Drivers}
            value={values.driver_id}
            onChange={handleChange}
            name="driver_id"
          />
        </div>
        <div className="overflow-x-auto max-h-[400px]">
          <table className="table min-w-full">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Valor da viagem</th>
                <th>Origem</th>
                <th>Destino</th>
                <th>Data e horário</th>
                <th>Distância</th>
                <th>Tempo</th>
              </tr>
            </thead>
            <tbody>
              {values.id === "" ? (
                <tr>
                  <td colSpan={7} className="text-center text-green-500">
                    Digite o id de um usuário para ver as viagens
                  </td>
                </tr>
              ) : rideList.length > 0 ? (
                rideList.map(
                  ({
                    id,
                    driverName,
                    totalCost,
                    origin,
                    destination,
                    date,
                    distance,
                    duration,
                  }) => (
                    <tr key={id}>
                      <td>{driverName}</td>
                      <td>{totalCost}</td>
                      <td>{origin}</td>
                      <td>{destination}</td>
                      <td>{date}</td>
                      <td>{distance} km</td>
                      <td>{duration}</td>
                    </tr>
                  )
                )
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    Nenhuma viagem encontrada
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
