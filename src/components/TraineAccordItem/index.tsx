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
        className={`w-full text-left px-3 py-2.5 border-0 cursor-pointer font-semibold ${open ? 'bg-gray-100' : 'bg-gray-50'}`}
        aria-expanded={open}
      >
        {title}
      </button>

      {open && (
        <div className="p-3 border-t border-gray-200">
          <div className="ml-2">
            <div className="mb-2 font-bold">Exercícios:</div>
            {exercises.length === 0 ? (
              <div className="ml-2">—</div>
            ) : (
              exercises.map((ex, i) => (
                <div key={i} className="mb-2.5 p-2  rounded-md border border-gray-300">
                  <div className="flex items-center">
                    <strong>Exercicio:</strong>
                    <span className="ml-1.5">{ex?.name ?? '-'}</span>
                    <button
                      type="button"
                      onClick={() => openYoutubeSearch(ex?.name ?? '')}
                      aria-label={`Pesquisar ${ex?.name ?? 'exercicio'} no YouTube`}
                      className="ml-2 inline-flex items-center p-1 rounded hover:bg-gray-100 text-blue-600"
                    >
                      <Play size={16} />
                    </button>
                  </div>
                  <div className="mt-1">
                    <strong>Series:</strong> <span className="ml-1.5">{ex?.sets ?? '-'}</span>
                    <span className="ml-3"><strong>Repetições:</strong> <span className="ml-1.5">{ex?.reps ?? ex?.Reps ?? '-'}</span></span>
                  </div>
                  <div className="mt-1"><strong>Descanso:</strong> <span className="ml-1.5">{ex?.rest ?? '-'}</span></div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}