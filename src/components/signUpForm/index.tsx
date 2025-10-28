import { AtSign, Eye, EyeOff, Lock, Phone, User } from "lucide-react";
import { useState } from "react";
import Button from "../generics/button/index.tsx";
import Logo from "../generics/logo/index.tsx";
import Label from "../generics/label/index.tsx";
import Input from "../generics/input/index.tsx";


import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase/supabaseClient.ts";

export default function SignInForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cellphone: "",
    age: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.name,
              age: formData.age,
              cellphone: formData.cellphone,
            }
          }
        }
      )

      if (error) throw error
      alert('Olhe seu e-mail para verificar sua conta!')
      navigate('/sign-in');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert(String(error));
      }
    }
  }

  return (
    <>
      <Logo />
      <div className="text-slate-600 mt-2  ">
        Comece a sua transformação{" "}
        <span className="font-bold text-violet-600">hoje</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 w-[75%]">
        <div className="space-y-2">
          <Label htmlFor="name" text="Nome Completo" />
          <Input hasIcon={true} icon={<User size={20} />} type="text" id="name" name="name" placeholder="Seu nome completo" required value={formData.name} onChange={handleChange} > </Input>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" text="Email" />
          <Input hasIcon={true} icon={<AtSign size={20} />} type="email" id="email" name="email" placeholder="seu@email.com" required value={formData.email} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cellphone" text="Telefone" />
          <Input hasIcon={true} icon={<Phone size={20} />} type="tel" id="cellphone" name="cellphone" placeholder="(11) 99999-9999" maxLength={15} required value={formData.cellphone} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="age" text="Idade" />
          <div className="relative">
            <Input hasIcon={true} icon={<User size={20} />} type="number" id="age" name="age" placeholder="Ex: 25" required minLength={2} maxLength={3} value={formData.age} onChange={handleChange} />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" text="Senha" />
          <div className="relative">
            <Input hasIcon={true} icon={<Lock size={20} />} type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Mínimo 6 caracteres" required value={formData.password} onChange={handleChange}>
              <span className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-400">

                <Button
                  className="font-medium transition-all duration-300 hover:scale-105 rounded-lg h-full  hover:bg-transparent"
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </Button>
              </span>
            </Input>
          </div>
        </div>
        <Button
          className="font-medium transition-all duration-300 bg-gradient-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/20 hover:scale-105 h-11 px-6 w-full bg-gradient-to-r from-sky-500 to-violet-500 hover:from-sky-600 hover:to-violet-600 py-6 text-lg text-slate-50"
          type="submit"
        >
          Criar Conta
        </Button>
      </form>
      <div className="mt-6 text-center">
        <p className="">
          Já tem uma conta?{" "}
          <Button onClick={() => navigate("/sign-in")} className="text-sm font-medium transition-all duration-300   underline-offset-4 hover:underline h-11 text-sky-500 hover:text-sky-600 p-0">
            Fazer login
          </Button>
        </p>
      </div>
    </>
  );
}
