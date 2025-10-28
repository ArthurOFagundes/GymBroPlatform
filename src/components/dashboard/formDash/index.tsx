import { useState } from "react";
import Input from "../../generics/input/index.tsx";
import Label from "../../generics/label/index.tsx";
import Button from "../../generics/button/index.tsx";
import { generateTrainee } from "../../../gemini/generateTrainee.ts";
import MultiSelect from "../../generics/multiSelect.tsx";
import { saveWorkout } from "../../../supabase/services/saveWorkout.ts";

function FormCreateTraining({ setModalOpen }: { setModalOpen: (open: boolean) => void }) {
  const [form, setForm] = useState({
    nameUser: "",
    age: Number(""),
    objective: "",
    availableTime: Number(""),
    weekFrequency: Number(""),
    bestTime: "",
    health: "",
    healthDetails: "",
    levelKnowledge: "",
    availableEquipment: [] as string[],
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));


  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4].map((s) => (
          <div key={s} className={`mx-2 w-8 h-8 flex items-center justify-center rounded-full border-2 ${step === s ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-white"}`}>
            {s}
          </div>
        ))}
      </div>

      <div className="w-[98%] h-px bg-gray-300 my-2" ></div>

      <form action="submit" className="flex flex-col gap-2 h-full m-auto w-full">
        {step === 1 && (
          <>
            <Label htmlFor={"name"} text={"Nome do Treino"} />
            <Input type="text" placeholder="Nome do Treino" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2" id={"name"} name={"nameUser"} required={false} value={form.nameUser} onChange={handleChange} />

            <div className="flex flex-col sm:flex-row sm:gap-4 items-center w-full">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-between">
                <div className="flex flex-col gap-2 mt-4 w-full">
                  <Label htmlFor={"age"} text={"Idade"} />
                  <Input type="number" placeholder="Idade:" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2" id={"age"} name={"age"} required={false} value={form.age.toString()} onChange={handleChange} minValue={0} maxValue={150} />
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full">
                  <Label htmlFor={"objective"} text={"Qual o objetivo:"} />
                  <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 " id={"objective"} name={"objective"} required={false} value={form.objective} onChange={handleChange}>
                    <option value="" disabled>objetivo</option>
                    <option value="Hipertrofia">Hipertrofia</option>
                    <option value="Emagrecimento">Emagrecimento</option>
                    <option value="Resistência">Resistência</option>
                    <option value="Força">Força</option>
                  </select>
                </div>
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="flex flex-col gap-4 items-center w-full">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-between">
                <div className="flex flex-col gap-2 mt-4 w-full">
                  <Label htmlFor={"weekFrequency"} text={"Frequência Semanal:"} />
                  <Input type="number" placeholder="Frequência Semanal" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2" id={"weekFrequency"} name={"weekFrequency"} required={false} value={form.weekFrequency.toString()} maxValue={7} onChange={handleChange} />
                </div>

                <div className="flex flex-col gap-2 mt-4 w-full">
                  <Label htmlFor={"availableTime"} text={"Tempo disponível:"} />
                  <Input type="number" placeholder="(Em Minutos)" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2" id={"availableTime"} maxValue={1440} name={"availableTime"} required={false} value={form.availableTime.toString()} onChange={handleChange} />
                </div>
              </div>

              <div className="flex flex-col gap-2 mt-4 w-full">
                <Label htmlFor={"bestTime"} text={"Turno disponível:"} />
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 " id={"bestTime"} name={"bestTime"} required={false} value={form.bestTime} onChange={handleChange}>
                  <option value="" disabled>Selecione</option>
                  <option value="morning">Manhã</option>
                  <option value="afternoon">Tarde</option>
                  <option value="evening">Noite</option>
                </select>
              </div>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div className="flex flex-col gap-2 w-full">
              <div className="flex flex-col gap-2 mt-4 w-full">
                <Label htmlFor={"health"} text={"Possui alguma condição de saúde ou doença?"} />
                <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 " id={"health"} name={"health"} required={false} value={form.health.toString()} onChange={handleChange}>
                  <option value="" disabled>Selecione</option>
                  <option value="false">Não</option>
                  <option value="true">Sim</option>
                </select>
                {form.health === "true" ?
                  <div className="flex flex-col gap-2 mt-4 w-full">
                    <Label htmlFor={"healthDetails"} text={"Se sim, por favor, forneça detalhes:"} />
                    <Input type="text" placeholder="Detalhes da condição de saúde" className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2" id={"healthDetails"} name={"healthDetails"} required={form.health === "true" ? true : false} value={form.healthDetails.toString()} onChange={handleChange} />
                  </div> : null}
              </div>
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <div className="flex flex-col gap-4 items-center w-full">
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:justify-between">
                <div className="flex flex-col gap-2 mt-4 w-full">
                  <Label htmlFor={"levelKnowledge"} text={"Nível de conhecimento:"} />
                  <select className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 " id={"levelKnowledge"} name={"levelKnowledge"} required={false} value={form.levelKnowledge} onChange={handleChange}>
                    <option value="" disabled>Selecione</option>
                    <option value="Iniciante">Iniciante</option>
                    <option value="Intermediário">Intermediário</option>
                    <option value="Avançado">Avançado</option>
                  </select>
                </div>
              </div>

              <div className="w-full">
                <MultiSelect
                  label="Equipamentos disponíveis:"
                  name="availableEquipment"
                  options={[
                    { value: "Dumbbells", label: "Halteres" },
                    { value: "Bench", label: "Banco" },
                    { value: "Barbell", label: "Barra" },
                    { value: "ResistanceBands", label: "Elásticos" },
                    { value: "Weights", label: "Anilhas" },
                    { value: "Pulleys", label: "Polias" },
                  ]}
                  selected={form.availableEquipment}
                  onChange={(selected) => setForm({ ...form, availableEquipment: selected })}
                />
              </div>
            </div>
          </>
        )}

        <div id="ActionButtons" className="flex flex-col sm:flex-row items-center sm:justify-around mt-4 gap-2 w-full">
          {step >= 1 && (
            <Button type="button" disabled={step === 1} onClick={prevStep} className="w-full sm:w-auto mr-0 sm:mr-2 border-2 hover:border-blue-500">Voltar</Button>
          )}
          {step < 4 && (
            <Button type="button" className="w-full sm:w-auto ml-0 sm:ml-2 border-2 hover:border-blue-500" onClick={nextStep}>Próximo</Button>
          )}
          {step === 4 && (
            <Button
              type="button"
              onClick={async () => {
                console.log(form);
                setIsLoading(true);

                try {
                  const response = await generateTrainee({
                    ...form,
                  });

                  if (typeof response !== "string") {
                    console.error("Treino gerado não está em formato de string:");
                    setIsLoading(false);
                    return;
                  }

                  const plan = JSON.parse(response);

                  await saveWorkout({
                    name_user: form.nameUser,
                    plan,
                    week_frequency: form.weekFrequency,
                    level_knowledge: form.levelKnowledge,
                    objective: form.objective,
                  });

                  setForm({
                    nameUser: "",
                    age: Number(""),
                    objective: "",
                    availableTime: Number(""),
                    weekFrequency: Number(""),
                    bestTime: "",
                    health: "",
                    healthDetails: "",
                    levelKnowledge: "",
                    availableEquipment: [],
                  });
                  setStep(1);

                  setIsLoading(false);
                  setModalOpen(false);
                } catch (error) {
                  console.error("Erro ao gerar treino:", error);
                  setIsLoading(false);
                }
              }}
              className="w-full sm:w-auto ml-0 sm:ml-2 border-2 hover:border-blue-500"
            >
              Criar Treino
            </Button>
          )}
        </div>
      </form>

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg flex flex-col items-center">
            <svg className="animate-spin h-8 w-8 text-blue-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            <p className="text-gray-700">Gerando treino, por favor aguarde...</p>
          </div>
        </div>
      )}

    </>
  );
}

export default FormCreateTraining;