import { AtSign, Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";
import Button from "../generics/button/index.tsx";
import Logo from "../generics/logo/index.tsx";
import { useNavigate } from "react-router-dom";

import { supabase } from "../../supabase/supabaseClient.ts";
import Label from "../generics/label/index.tsx";
import Input from "../generics/input/index.tsx";


export default function UpdateUserForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.updateUser({
        email: form.email,
        password: form.password
      });
      if (error) throw error
      alert('Senha alterada!')
      navigate('/sign-in');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Ocorreu um erro desconhecido.");
      }
    }
  }

  return (
    < >

      <Logo />

      <div className="text-slate-600 mt-2">
        Preencha para redefinir sua senha
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 w-[75%]">
        <div className="space-y-2">
          <Label htmlFor="email" text="Email" />
          <Input
            icon={<AtSign size={20} />}
            type="email"
            id="email"
            name="email"
            placeholder="seu@email.com"
            required
            value={form.email}
            onChange={handleChange} hasIcon={true} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" text="Nova Senha" />
          <Input
            icon={<Lock size={20} />}
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="Mínimo 6 caracteres"
            required
            value={form.password}
            onChange={handleChange} hasIcon={true}                  >

            <Button
              className="font-medium transition-all duration-300   hover:scale-105 rounded-lg absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
              type="button"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </Button>
          </Input>
        </div>
        <Button
          className="font-medium transition-all duration-300 bg-gradient-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:scale-105 h-11 px-6 w-full bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 py-6 text-lg text-slate-50"
          type="submit"
        >
          Redefinir Senha
        </Button>
      </form>

    </>
  );
}
