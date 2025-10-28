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

  // estados para confirmação em modal (substitui window.confirm)
  const [deleteTarget, setDeleteTarget] = useState<number | string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

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
    setDeleting(true);
    setLoading(true);
    setError(null);

    const { error: delErr } = await supabase
      .from('workouts')
      .delete()
      .eq('id', id);

    if (delErr) {
      setError(delErr.message);
      setDeleting(false);
      setLoading(false);
      return;
    }

    setTrainings((prev) => prev.filter((t) => t.id !== id));
    setDeleting(false);
    setLoading(false);
  }

  function requestDelete(id: number | string | null | undefined) {
    setDeleteTarget(id ?? null);
    setConfirmOpen(true);
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
              onClick={(e) => { e.stopPropagation(); requestDelete(t.id); }}
              onKeyDown={(e) => { e.stopPropagation(); if (e.key === 'Enter') requestDelete(t.id); }}
              className="ml-0 sm:ml-3 mt-0 sm:mt-0 self-end sm:self-auto text-red-600 hover:text-red-800 p-2 rounded focus:outline-none focus:ring-2 focus:ring-red-200 w-9 h-9 flex items-center justify-center"
            >
              <Trash size={16} />
            </button>
          </li>
        ))}
      </ul>

      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          role="dialog"
          aria-modal="true"
          onKeyDown={(e) => { if (e.key === 'Escape') { setConfirmOpen(false); setDeleteTarget(null); } }}
        >
          <div
            className="bg-white rounded-md p-4 max-w-sm w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-sm text-gray-800 mb-4">Deseja realmente excluir este treino?</div>
            <div className="flex gap-2 justify-end">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => { setConfirmOpen(false); setDeleteTarget(null); }}
              >
                Cancelar
              </button>
              <button
                className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
                onClick={async () => {
                  if (deleteTarget == null) return;
                  await deleteTraining(deleteTarget);
                  setConfirmOpen(false);
                  setDeleteTarget(null);
                }}
                disabled={deleting}
              >
                {deleting ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}