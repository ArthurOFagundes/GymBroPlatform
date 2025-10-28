import { useEffect, useState, type JSX } from 'react';
import { supabase } from '../../../supabase/supabaseClient.ts';
import type { Workout } from '../../../supabase/services/saveWorkout.ts';
import { useNavigate } from 'react-router-dom';
import { Trash } from 'lucide-react'; // adicionado

export default function ListDash(): JSX.Element {

  const navigate = useNavigate();

  const [trainings, setTrainings] = useState<Workout[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) {
      setError("Supabase não configurado. Verifique as variáveis de ambiente.");
      setLoading(false);
      return;
    }

    let mounted = true;

    async function loadTrainings() {
      setLoading(true);
      setError(null);

      const { data: authData, error: authErr } = await supabase.auth.getUser();
      const userId = authData?.user?.id;

      if (authErr || !userId) {
        setError("Usuário não autenticado.");
        setTrainings([]);
        setLoading(false);
        return;
      }

      const { data, error: err } = await supabase
        .from<Workout>("workouts")
        .select("*")
        .eq("trainer", userId)
        .order("id", { ascending: true });

      if (!mounted) return;

      if (err) {
        setError(err.message);
        setTrainings([]);
      } else if (data) {
        setTrainings(data);
      } else {
        setTrainings([]);
      }
      setLoading(false);
    }

    loadTrainings();


    let subscription: any = null;
    const supabaseAny = supabase as any;

    if (typeof supabaseAny.channel === "function") {
      subscription = supabaseAny
        .channel("public:workouts")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "workouts" },
          () => {
            if (!mounted) return;
            loadTrainings();
          }
        )
        .subscribe();
    } else if (typeof supabaseAny.from === "function") {
      subscription = supabaseAny
        .from("workouts")
        .on("*", () => {
          if (!mounted) return;
          loadTrainings();
        })
        .subscribe();
    }

    return () => {
      mounted = false;
      try {
        if (subscription?.unsubscribe) subscription.unsubscribe();
        else if (typeof supabaseAny.removeChannel === "function" && subscription) supabaseAny.removeChannel(subscription);
      } catch {
      }
    };
  }, []);

  async function deleteTraining(id: number | string) {
    const confirmDelete = window.confirm('Deseja realmente excluir este treino?');
    if (!confirmDelete) return;

    setLoading(true);
    setError(null);

    const { error: delErr } = await supabase
      .from('workouts')
      .delete()
      .eq('id', id);

    if (delErr) {
      setError(delErr.message);
      setLoading(false);
      return;
    }

    setTrainings((prev) => prev.filter((t) => t.id !== id));
    setLoading(false);
  }

  if (loading) return <div>Carregando treinos...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (trainings.length === 0) return <div>Nenhum treino encontrado.</div>;

  return (
    <div>
      <ul className="list-none p-0">
        {trainings.map((t) => (
          <li
            key={t.id}
            onClick={() => navigate("/TrainingView", { state: { workout: t } })}
            className="border border-gray-200 p-3 mb-2 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200 hover:shadow-lg hover:bg-gray-100 transition-shadow duration-200 flex flex-col sm:flex-row sm:items-start gap-3 sm:justify-between"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') navigate("/TrainingView", { state: { workout: t } }); }}
          >
            <div className="w-full">
              <div className="font-bold text-base sm:text-lg break-words">{t.name_user}</div>
              <div className="text-xs sm:text-sm text-gray-500 mt-1.5">
                {t.objective ? `Objetivo: ${t.objective}` : null}
                {t.week_frequency ? ` ${t.objective ? '|' : ''} Frequência: ${t.week_frequency}` : null}
                {t.level_knowledge ? ` ${t.week_frequency ? '|' : ''} Nível: ${t.level_knowledge}` : null}
              </div>
            </div>

            <button
              aria-label="Excluir treino"
              title="Excluir treino"
              onClick={(e) => { e.stopPropagation(); if (t.id != null) deleteTraining(t.id); }}
              onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Enter' && t.id != null) deleteTraining(t.id); }}
              className="ml-0 sm:ml-3 mt-0 sm:mt-0 self-end sm:self-auto text-red-600 hover:text-red-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-200 w-9 h-9 flex items-center justify-center"
            >
              <Trash size={16} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}