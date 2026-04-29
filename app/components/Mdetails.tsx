import React from 'react';

interface MdetailsProps {
    selectedMovie: any;
    isDark: boolean;
    trailerKey: string | null;
    watchlist: any[];
    setWatchList: (list: any[]) => void;
    isLogin: boolean;
    navigateTo: (page: string) => void;
}

export default function Mdetails({
    selectedMovie, isDark, trailerKey, watchlist, setWatchList, isLogin, navigateTo
}: MdetailsProps) {
    if (!selectedMovie) return null;

    const formatRuntime = (minutes: number) => {
        if (!minutes) return "Unknown";
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        return `${h > 0 ? h + ' h ' : ''}${m} min`;
    };

    const isInWatchlist = watchlist.some(m => m.id === selectedMovie.id);

    const toggleWatchlist = () => {
        if (!isLogin) {
            navigateTo('login');
            return;
        }
        let newWatchlist;
        if (isInWatchlist) {
            newWatchlist = watchlist.filter(m => m.id !== selectedMovie.id);
        } else {
            newWatchlist = [...watchlist, selectedMovie];
        }

        setWatchList(newWatchlist);

        const currentUser = localStorage.getItem('user');
        if (currentUser) {
            localStorage.setItem(`watchlist_${currentUser}`, JSON.stringify(newWatchlist));
        }

    };

    return (
        <div className={`min-h-screen ${isDark ? 'bg-black text-white' : 'bg-white text-black'}`}>
            <div className="fixed top-0 left-0 w-full h-[60vh] z-0">
                <img
                    className="w-full h-full object-cover opacity-40"
                    src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                    alt="backdrop"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-black/60 to-transparent' : 'from-white via-white/60 to-transparent'}`} />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">

                {/* Кнопка назад */}
                <button
                    onClick={() => navigateTo('home')}
                    className="mb-8 flex items-center gap-2 hover:text-purple-500 transition-colors font-medium"
                >
                    ← Back to list
                </button>

                <div className="flex flex-col md:flex-row gap-12">
                    {/* Постер зліва */}
                    <div className="w-full md:w-80 flex-shrink-0">
                        <img
                            className="w-full rounded-3xl shadow-2xl border-4 border-white/10"
                            src={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
                            alt={selectedMovie.title}
                        />
                    </div>

                    {/* Опис справа */}
                    <div className="flex-grow">
                        <h1 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            {selectedMovie.title || selectedMovie.name}
                        </h1>

                        {/* СПИСОК ДЕТАЛЕЙ */}
                        <div className="space-y-4 mb-8 text-lg">
                            <p><span className="font-bold text-zinc-500">Released in:</span> {(selectedMovie.release_date || selectedMovie.first_air_date)?.slice(0, 4)}</p>

                            <p><span className="font-bold text-zinc-500">Country:</span> {selectedMovie.production_countries?.map((c: any) => c.name).join(', ') || 'Дані відсутні'}</p>

                            <p>
                                <span className="font-bold text-zinc-500">Genres:</span> {
                                    selectedMovie.genres?.map((g: any) => g.name).join(' / ')
                                }
                            </p>

                            <p>
                                <span className="font-bold text-zinc-500">Duration:</span> {
                                    formatRuntime(selectedMovie.runtime || selectedMovie.episode_run_time?.[0])
                                }
                            </p>
                        </div>

                        <p className={`text-xl leading-relaxed mb-10 max-w-3xl ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            {selectedMovie.overview}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={toggleWatchlist}
                                className={`px-8 py-4 rounded-2xl font-bold transition-all transform hover:scale-105 ${isInWatchlist
                                    ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                    : 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                                    }`}
                            >
                                {isInWatchlist ? '✕ Remove from saved' : '❤ save to favorites'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* ТРЕЙЛЕР */}
                {trailerKey && (
                    <div className="mt-20">
                        <h2 className="text-3xl font-bold mb-8 border-l-4 border-purple-600 pl-4">Official Trailer</h2>
                        <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white/5">
                            <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${trailerKey}`}
                                title="YouTube trailer"
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
