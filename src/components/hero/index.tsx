import { Flame, MoveRight } from "lucide-react";
import Button from "../generics/button/index.tsx";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <>
      <section className="flex flex-col items-center justify-center px-4 py-8 md:py-16 text-center min-h-[85vh] max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-6xl font-bold mb-6  leading-tight tracking-tight">
          Mude sua rotina com
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-violet-500">
            <br />
            Inteligência artificial
          </span>
        </h1>
        <p className="md:text-lg text-sm  text-slate-400 mb-8 leading-relaxed max-w-2xl mx-auto font-medium ">
          Treinos e refeições personalizados.
        </p>
        <Button onClick={() => navigate("/sign-up")} className="bg-gradient-to-r from-sky-500 to-violet-500 text-sky-50 h-auto w-full sm:w-auto">
          <Flame /> Teste a ferramenta <MoveRight />
        </Button>
      </section>
    </>
  );
}
