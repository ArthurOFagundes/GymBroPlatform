import { Play } from 'lucide-react';

export function TrainingAccordionItem({
  t,
  idx,
  open = false,
  onToggle = () => { },
}: {
  t: any;
  idx: number;
  open?: boolean;
  onToggle?: () => void;
}) {
  const training = t?.trainning ?? t ?? {};
  const title = training?.muscularGroup ?? training?.name ?? `Treino ${idx + 1}`;

  const exercises: any[] = Array.isArray(training?.exercises) ? training.exercises : [];

  const openYoutubeSearch = (query: string) => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    if (typeof window !== 'undefined') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="mb-2 border border-gray-200 rounded-md overflow-hidden bg-white">
      <button
        onClick={onToggle}
        className={`w-full text-left px-3 py-3 sm:py-2.5 border-0 cursor-pointer font-semibold ${open ? 'bg-gray-100' : 'bg-gray-50'} text-sm sm:text-base flex items-center justify-between focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-200`}
        aria-expanded={open}
      >
        <span className="whitespace-normal break-words">{title}</span>
      </button>

      {open && (
        <div className="p-3 border-t border-gray-200">
          <div className="ml-0 sm:ml-2">
            <div className="mb-2 font-bold text-sm sm:text-base">Exercícios:</div>
            {exercises.length === 0 ? (
              <div className="ml-2 text-sm">—</div>
            ) : (
              exercises.map((ex, i) => (
                <div key={i} className="mb-2.5 p-3 sm:p-2 rounded-md border border-gray-300">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start sm:items-center gap-2">
                        <strong className="text-sm sm:text-base">Exercício:</strong>
                        <span className="ml-1.5 text-sm sm:text-base break-words truncate">{ex?.name ?? '-'}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => openYoutubeSearch(ex?.name ?? '')}
                        aria-label={`Pesquisar ${ex?.name ?? 'exercicio'} no YouTube`}
                        className="inline-flex items-center p-2 rounded hover:bg-gray-100 text-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-200"
                      >
                        <Play size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div>
                      <strong>Series:</strong> <span className="ml-1">{ex?.sets ?? '-'}</span>
                    </div>
                    <div>
                      <strong>Repetições:</strong> <span className="ml-1">{ex?.reps ?? ex?.Reps ?? '-'}</span>
                    </div>
                    <div className="sm:col-span-2">
                      <strong>Descanso:</strong> <span className="ml-1">{ex?.rest ?? '-'}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}