import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Workout } from '../../supabase/services/saveWorkout.ts';
import { TrainingAccordionItem } from '../TraineAccordItem/index.tsx';

export default function TrainingView() {
  const location = useLocation();
  const navigate = useNavigate();
  const stateWorkout = (location.state as any)?.workout as Workout | undefined;

  const [workout, setWorkout] = useState<Workout | null>(stateWorkout ?? null);
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  useEffect(() => {
    setWorkout(stateWorkout ?? null);
  }, [stateWorkout]);

  if (!workout) {
    return (
      <div className="p-4 w-full max-w-xl mx-auto">
        <h2 className="text-lg font-semibold">Nenhum treino selecionado</h2>
        <p className="mt-2 text-sm text-gray-600">Volte para a lista e selecione um treino para ver os detalhes.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full sm:w-auto px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 transition"
        >
          Voltar
        </button>
      </div>
    );
  }

  const planEntry = Object.entries(workout).find(([k, v]) => Array.isArray(v) && v.length > 0 && typeof v[0] === 'object');
  const planKey = planEntry?.[0];
  const plan: any[] = planKey ? (workout as any)[planKey] : [];

  function formatPrimitive(v: any) {
    if (v == null) return '-';
    if (typeof v === 'boolean') return v ? 'Sim' : 'Não';
    return String(v);
  }

  function tryParseJson(input: any) {
    if (typeof input !== 'string') return input;
    try {
      return JSON.parse(input);
    } catch {
      return input;
    }
  }

  const REDUNDANT_KEYS = new Set(['nameUser', 'name_user', 'name', 'created_at', 'updated_at', 'availableTime', 'available_time', 'weekFrequency', 'week_frequency', 'objective']);

  function renderItemContent(item: any, parentKey = 'root') {
    if (!item || typeof item !== 'object') return <div className="break-words">{formatPrimitive(item)}</div>;
    return (
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
        {Object.entries(item)
          .filter(([k]) => !REDUNDANT_KEYS.has(k))
          .map(([k, v]) => {
            const parsed = tryParseJson(v);

            if (k === 'trainings' || k === 'trainning') {
              const arr = Array.isArray(parsed) ? parsed
                : (typeof parsed === 'object' && parsed != null ? (parsed.trainings ? parsed.trainings : [parsed]) : null);

              if (!arr || arr.length === 0) {
                return (
                  <div key={k} className="break-words">
                    <strong>{k}:</strong> <span className="ml-2">—</span>
                  </div>
                );
              }

              return (
                <div key={k} className="col-span-1 sm:col-span-2">
                  <div className="mt-1.5 space-y-2">
                    {arr.map((t: any, idx: number) => {
                      const itemKey = `${parentKey}-${k}-${idx}`;
                      return (
                        <TrainingAccordionItem
                          key={itemKey}
                          t={t}
                          idx={idx}
                          open={openIndex === itemKey}
                          onToggle={() => setOpenIndex(openIndex === itemKey ? null : itemKey)}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            }

            if (Array.isArray(parsed)) {
              return (
                <div key={k} className="break-words">
                  <strong>{k}:</strong>
                  <ul className="mt-1.5 ml-4 list-disc list-inside max-h-48 overflow-auto">
                    {parsed.map((vv: any, idx: number) =>
                      typeof vv === 'object' ? (
                        <li key={idx} className="mb-1">
                          {Object.entries(vv).map(([kk, vv2]) => (
                            <div key={kk}><strong>{kk}:</strong> <span className="ml-1">{formatPrimitive(vv2)}</span></div>
                          ))}
                        </li>
                      ) : (
                        <li key={idx}>{formatPrimitive(vv)}</li>
                      )
                    )}
                  </ul>
                </div>
              );
            }

            if (v != null && typeof v === 'object') {
              return (
                <div key={k} className="break-words">
                  <strong>{k}:</strong>
                  <div className="mt-1.5 p-2 bg-gray-50 rounded-md border border-gray-200 overflow-auto">
                    {Object.entries(v as Record<string, any>).map(([kk, vv]) => (
                      <div key={kk} className="mb-1.5 flex gap-2">
                        <strong className="inline-block w-28 sm:w-32 text-sm">{kk}:</strong>
                        <span className="text-sm break-words">{formatPrimitive(vv)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={k} className="break-words">
                <strong>{k}:</strong> <span className="ml-2">{formatPrimitive(v)}</span>
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <div className="px-4 py-6 w-full max-w-3xl mx-auto">

      <div className="max-h-[85vh] overflow-auto custom-scrollbar rounded">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 w-full sm:w-auto px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 transition"
        >
          ← Voltar
        </button>

        <header className="mb-4">
          <h1 className="m-0 text-xl sm:text-2xl font-semibold break-words">{workout.name_user ?? 'Treino'}</h1>
          <div className="text-gray-600 mt-2 flex gap-3 flex-wrap text-sm sm:text-base">
            {workout.objective ? <div className="break-words"><strong>Objetivo:</strong> <span className="ml-1">{workout.objective}</span></div> : null}
            {workout.week_frequency ? <div><strong>Frequência Semanal:</strong> <span className="ml-1">{workout.week_frequency}</span></div> : null}
          </div>
        </header>

        <section className="mt-2">
          {!planKey || plan.length === 0 ? (
            <div className="text-sm">Nenhum plano de treino disponível.</div>
          ) : (
            <div className="space-y-4">
              {plan.map((item, idx) => {
                const title = "Treinos";
                return (
                  <div key={idx} className="mb-2 border border-gray-200 rounded-md overflow-hidden bg-white">
                    <div
                      className={`w-full text-left px-3 py-2 bg-gray-100 font-semibold text-sm sm:text-base`}
                    >
                      {title}
                    </div>

                    <div className="p-3 border-t border-gray-200">
                      {renderItemContent(item, `plan-${idx}`)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 10px; height: 10px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #F3F4F6; } /* gray-100 */
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 9999px; } /* gray-200 */
        .custom-scrollbar { scrollbar-width: thin; scrollbar-color: #E5E7EB #F3F4F6; }
      `}</style>
    </div>
  );
}