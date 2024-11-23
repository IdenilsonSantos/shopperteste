import { useLocation } from "react-router-dom";
import { formatCurrency } from "../utils/currency";

export default function RideOptionsPage() {
  const { state } = useLocation();

  const { origin, destination, availableDrivers } = state;

  const hasLocationData = origin && destination;

  const path = hasLocationData
    ? `${origin.latitude},${origin.longitude}|${destination.latitude},${destination.longitude}`
    : "";
  const mapUrl = hasLocationData
    ? `https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=color:black|weight:5|${path}&markers=color:green|label:A|${origin.latitude},${origin.longitude}&markers=color:red|label:B|${destination.latitude},${destination.longitude}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    : "";

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
              availableDrivers.map((driver) => (
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
                    <button className="btn btn-ghost btn-xs">Escolher</button>
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
      <div className="w-full md:w-1/2 flex items-center justify-center">
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
