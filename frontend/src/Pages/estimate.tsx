import { useState } from "react";
import Button from "../components/Button";
import InputField from "../components/Input";
import fetchData from "../utils/fetch";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface EstimateValues {
  origin: string;
  destination: string;
  customer_id?: string;
}

export default function Estimate() {
  const navigate = useNavigate();
  const [values, setValues] = useState<EstimateValues>({
    origin: "",
    destination: "",
    customer_id: "",
  });

  const getEstimate = async (): Promise<void> => {
    try {
      const response = await fetchData<Record<string, unknown>>(
        "http://localhost:8080/ride/estimate",
        "POST",
        values
      );

      navigate(
        `/options?customer_id=${values.customer_id}&origin=${values.origin}&destination=${values.destination}`,
        { state: response }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error || "Ocorreu um erro ao buscar a estimativa.", {
        transition: Bounce,
      });
    }
  };

  const handleChange =
    (field: keyof EstimateValues) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValues((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <div className="flex h-full container my-28">
      <div className="w-1/2 flex items-center justify-center">
        <img
          src="https://plus.unsplash.com/premium_photo-1682310071124-33632135b2ee?q=80&w=2112&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Aplicativo de corrida"
          className="rounded shadow-lg w-[600px]"
        />
      </div>

      <div className="w-1/2  p-2 flex flex-col justify-center">
        <h1 className="text-2xl font-bold mb-6">Estimativa de Viagem</h1>
        <InputField
          label="Digite o id do usuário"
          value={values.customer_id}
          onChange={handleChange("customer_id")}
        />
        <InputField
          label="Digite a origem da viagem"
          value={values.origin}
          onChange={handleChange("origin")}
        />
        <InputField
          label="Digite o destino da viagem"
          value={values.destination}
          onChange={handleChange("destination")}
        />
        <Button onClick={getEstimate} label="Estimar viagem" />
      </div>
    </div>
  );
}
