import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/generics/header/index.tsx";
import Footer from "../../components/generics/footer/index.tsx";
import Button from "../../components/generics/button/index.tsx";

function LayoutPage() {
  const navigate = useNavigate();

  return (
    <>
      <Header >
        <Button onClick={() => navigate("sign-in")} className=" transition-all duration-300 hover:scale-105 h-font-medium ">
          Entrar
        </Button>
        <Button onClick={() => navigate("sign-up")} className="text-sm bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 font-semibold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300 text-sky-50">
          Cadastrar
        </Button>
      </Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
export default LayoutPage;