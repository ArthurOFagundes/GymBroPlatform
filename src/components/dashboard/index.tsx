import { useState } from "react";
import Button from "../generics/button/index.tsx";
import Modal from "../modal/index.tsx";
import Input from "../generics/input/index.tsx";
import FormCreateTraining from "./formDash/index.tsx";
import ListDash from "./listDash/index.tsx";

export default function Dashboard() {
  const [modalOpenCreateTraining, setModalOpenCreateTraining] = useState(false);
  const [modalOpenViewTrainings, setModalOpenViewTrainings] = useState(false);

  return (
    <>
      <div className="flex flex-col min-h-screen w-full items-start sm:items-center justify-start sm:justify-center bg-gradient-to-r from-sky-500 to-violet-500 p-4 sm:p-0">
        <div className="w-full max-w-5xl sm:w-[80vw] md:w-[70vw] h-auto sm:h-[80vh] flex flex-col sm:flex-row rounded-2xl justify-center p-4 sm:p-6 text-sm md:text-lg gap-4 overflow-auto">
          <div className="flex flex-col sm:flex-row w-full gap-4 items-stretch">

            <div className="bg-slate-100 hover:bg-slate-300 w-full sm:w-1/2 rounded-xl shadow-md p-4 sm:p-8 flex flex-col items-center justify-center min-h-[160px] hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-950 mb-3 text-center">Monte um treino</h2>
              <Button onClick={() => setModalOpenCreateTraining(true)} className="bg-slate-100 text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100 transition w-full sm:w-auto">Criar treino</Button>
            </div>

            <div className="hidden sm:flex items-center">
              <div className="w-px h-full bg-gray-300 mx-2" />
            </div>

            <div className="bg-slate-100 hover:bg-slate-300 w-full sm:w-1/2 rounded-xl shadow-md p-4 sm:p-8 flex flex-col items-center justify-center min-h-[160px] hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300">
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-950 mb-3 text-center">Visualize seus treinos</h2>
              <Button onClick={() => setModalOpenViewTrainings(true)} className="bg-slate-100 text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100 transition w-full sm:w-auto">Visualizar</Button>
            </div>

            <Modal open={modalOpenCreateTraining} onClose={() => setModalOpenCreateTraining(false)}>
              <div className="flex flex-col justify-center items-center px-4 sm:px-0">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Criar Treino</h2>
                <p className="mb-4 text-sm text-center">Preencha o formulário abaixo para criar um plano de treino personalizado.</p>
              </div>
              <FormCreateTraining setModalOpen={setModalOpenCreateTraining} />
            </Modal>

            <Modal open={modalOpenViewTrainings} onClose={() => setModalOpenViewTrainings(false)}>
              <div className="flex flex-col justify-center items-center px-4 sm:px-0">
                <h2 className="text-xl sm:text-2xl font-semibold mb-4">Treinos disponíveis</h2>
                <p className="mb-4 text-sm text-center">Selecione um treino existente.</p>
              </div>
              <ListDash />
            </Modal>

          </div>
        </div>
      </div>
    </>
  );
}
