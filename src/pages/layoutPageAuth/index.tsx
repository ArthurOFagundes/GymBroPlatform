import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/generics/header/index.tsx";
import Footer from "../../components/generics/footer/index.tsx";
import Button from "../../components/generics/button/index.tsx";
import { supabase } from "../../supabase/supabaseClient.ts";
import { useState } from "react";

function LayoutPageAuth() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);

  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setIsAuthenticated(false);
      if (error) throw error;
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocorreu um erro desconhecido.");
      }
    }
  };


  return (
    <>
      <Header >
        <Button onClick={logOut} className="text-sm bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 font-semibold rounded-xl shadow-lg shadow-sky-500/20 hover:shadow-xl hover:shadow-sky-500/30 transition-all duration-300 text-sky-50">
          Sair
        </Button>
      </Header>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
export default LayoutPageAuth;

