import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/currency";
import Button from "../components/Button";
import fetchData from "../utils/fetch";
import { Bounce, toast } from "react-toastify";

export default function RideOptionsPage() {
  const { state, search } = useLocation();
  const navigate = useNavigate()

  const { origin, destination, availableDrivers, distance, duration } = state;
  const params = Object.fromEntries(new URLSearchParams(search));

  const hasLocationData = origin && destination;

  const path = hasLocationData
    ? `${origin.latitude},${origin.longitude}|${destination.latitude},${destination.longitude}`
    : "";
  const mapUrl = hasLocationData
    ? `https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=color:black|weight:5|${path}&markers=color:green|label:A|${origin.latitude},${origin.longitude}&markers=color:red|label:B|${destination.latitude},${destination.longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    : "";

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rideConfirm = async (driver: any): Promise<void> => {

    try {
      const response = await fetchData<Record<string, unknown>>(
        "http://localhost:8080/ride/confirm",
        "PATCH",
        {
          customer_id: params.customer_id,
          origin: params.origin,
          destination: params.destination,
          distance,
          duration,
          driver: {
            id: driver.id,
            name: driver.name,
          },
          totalCost: driver.totalCost,
        }
      );

      if (response && response.success) {
        navigate('/history')
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error || "Ocorreu um erro ao confirmar corrida", {
        transition: Bounce,
      });
    }
  };

  return (
    <div className="flex flex-wrap w-full h-full my-12 justify-between">
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-6">
          Opções de motoristas para a corrida
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Veículo</th>
              <th>Avaliação</th>
              <th>Valor da viagem</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {availableDrivers && availableDrivers.length > 0 ? (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              availableDrivers.map((driver: any) => (
                <tr key={driver.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={`https://ui-avatars.com/api/?name=${driver.name}&background=random`}
                            alt={`Avatar de ${driver.name}`}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{driver.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{driver.description}</td>
                  <td>{driver.vehicle}</td>
                  <td>{driver.evaluation}</td>
                  <td>{formatCurrency(driver.totalCost)}</td>
                  <th>
                    <Button
                      className="btn btn-ghost btn-xs"
                      label="Escolher"
                      onClick={() => rideConfirm(driver)}
                    />
                  </th>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  Nenhum motorista disponível para esta rota
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full md:w-1/2 h-[600px] flex items-center justify-center">
        {hasLocationData ? (
          <img src={mapUrl} alt="Route Map" className="rounded shadow-lg" />
        ) : (
          <p className="text-center">
            Sem mapa para exibir. Insira os detalhes e clique em "Obter
            Estimativa"
          </p>
        )}
      </div>
    </div>
  );
}
