import React from 'react';


interface HeroProps {
    heroText: string;
    isDark: boolean;
    searchType: string;
    setSearchType: (type: string) => void;
    fetchTrending: () => void;
    fetchTrendingSeries: () => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    searchMovies: () => void;
}

export default function Hero(props: HeroProps) {
    const {
        heroText, isDark, searchType, setSearchType,
        fetchTrending, fetchTrendingSeries, searchQuery,
        setSearchQuery, searchMovies
    } = props;




    return (
        <div className={`w-[100%] relative overflow-hidden pt-32 pb-6 px-6 md:px-24 mx-auto flex flex-col items-center gap-6 ${isDark ? 'bg-gradient-to-b from-amber-800 to-black' : 'bg-gradient-to-b from-amber-400 to-white'}`}>
            <div className="w-120 h-120 bg-purple-600/60 rounded-full bottom-60 pointer-events-none absolute blur-[100px]"></div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">{heroText}<span className="animate-pulse">|</span>
            </h1>
            <p className="text-xl text-center text-zinc-400 mb-10">{'Find your favorite movie and watch it online for free!'.split('').map((char, i) => (
                <span key={i} className="animate-card inline-block" style={{ animationDelay: `${i * 0.03}s` }}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
            </p>

            <div className="flex gap-4 mb-4">
                <button className={`px-4 py-2 rounded-full ${searchType === 'movie' ? 'bg-purple-600 text-white' : 'bg-zinc-700 text-zinc-300'}`} onClick={() => { setSearchType('movie'); fetchTrending(); }}>🎬 Movies</button>
                <button className={`px-4 py-2 rounded-full ${searchType === 'tv' ? 'bg-purple-600 text-white' : 'bg-zinc-700 text-zinc-300'}`} onClick={() => { setSearchType('tv'); fetchTrendingSeries(); }}>📺 Series</button>
            </div>
            <div className="flex w-full mt-24 shadow-2xl">
                <input type='text' placeholder={`Search ${searchType === 'movie' ? 'movies' : 'series'}...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') searchMovies(); }}
                    className="flex-grow bg-zinc-900 border border-zinc-700 rounded-l-2xl px-6 py-4 text-xl text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button onClick={searchMovies} className="bg-purple-600 hover:bg-purple-500 px-8 py-4 rounded-r-2xl text-xl font-bold text-white transition-colors">Search</button>
            </div>
        </div>
    );
}