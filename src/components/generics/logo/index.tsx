import { Rabbit } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <>
      <a onClick={() => navigate("/")} className="flex items-center justify-center space-x-2" href="#">
        <div className="w-8 h-8 bg-gradient-to-r from-sky-500 to-violet-500 rounded-2xl flex items-center justify-center shadow-lg shadow-sky-500/20">
          <Rabbit color="white" size={24} />
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-sky-500 to-violet-500 bg-clip-text text-transparent">
          Gym Bro
        </h1>
      </a>
    </>
  );
}
