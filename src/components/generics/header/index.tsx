import Logo from "../logo/index.tsx";
import { useNavigate } from "react-router-dom";

export default function Header({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <header className="w-full ">
      <div className="px-4 py-3 flex justify-between items-center max-w-6xl mx-auto">
        <Logo />
        <div className="flex items-center space-x-2">
          {children}
        </div>
      </div>
    </header>
  );
}
