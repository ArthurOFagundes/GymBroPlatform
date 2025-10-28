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
      <div className="flex flex-col min-h-screen min-w-screen items-center justify-center bg-gradient-to-r from-sky-500 to-violet-500">
        <div className=" w-[80vw] h-[80vh] flex flex-col rounded-2xl  justify-center  p-6 text-sm md:text-lg">

          <div className="flex flex-row h-full items-center justify-center gap-4">

            <div className="bg-slate-100 hover:bg-slate-300 h-[98%] w-1/2 rounded-xl shadow-md p-8 flex flex-col items-center justify-center hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300">

              <h2 className="text-2xl font-semibold text-slate-950 mb-4">Monte um treino</h2>

              <Button onClick={() => setModalOpenCreateTraining(true)} className="bg-slate-100 text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100 transition" >Criar treino</Button>
            </div>

            <Modal open={modalOpenCreateTraining} onClose={() => setModalOpenCreateTraining(false)}>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-2xl font-semibold mb-4">Criar Treino</h2>
                <p className="mb-4 text-sm text-center">Preencha o formulário abaixo para criar um plano de treino personalizado.</p>
              </div>
              <FormCreateTraining setModalOpen={setModalOpenCreateTraining} />
            </Modal>

            <div className="w-px h-full bg-gray-300 mx-2" />

            <div className="bg-slate-100 hover:bg-slate-300  h-[98%] w-1/2 rounded-xl shadow-md p-8 flex flex-col items-center justify-center hover:shadow-lg hover:shadow-primary/20 hover:scale-105 transition-all duration-300">
              <h2 className="text-2xl font-semibold text-slate-950 mb-4">Visualize seus treinos</h2>
              <Button onClick={() => setModalOpenViewTrainings(true)} className="bg-slate-100 text-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-100 transition" >Visualizar</Button>
            </div>

            <Modal open={modalOpenViewTrainings} onClose={() => setModalOpenViewTrainings(false)}>
              <div className="flex flex-col justify-center items-center">
                <h2 className="text-2xl font-semibold mb-4">Treinos disponíveis</h2>
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
