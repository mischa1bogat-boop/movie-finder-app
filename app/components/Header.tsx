import React, { useState, useEffect } from 'react';

interface HeaderProps {
    isDark: boolean;
    setIsDark: (val: boolean) => void;
    isLogin: boolean;
    setIsLogin: (val: boolean) => void;
    user: string;
    setUser: (val: string) => void;
    showDropdown: boolean;
    setShowDropdown: (val: boolean) => void;
    navigateTo: (page: string) => void;
    fetchTrending: () => void;
    fetchTopRated: () => void;
    fetchSeries: () => void;
    setMovies: (movies: any[]) => void;
    watchlist: any[];
    setCategoryTitle: (title: string) => void;
}

export default function Header(props: HeaderProps) {
    const {
        isDark, setIsDark, isLogin, setIsLogin, user, setUser,
        showDropdown, setShowDropdown, navigateTo, fetchTrending,
        fetchTopRated, fetchSeries, setMovies, watchlist, setCategoryTitle
    } = props;

    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    useEffect(() => {
        const controlNavbar = () => {
            if (typeof window !== 'undefined') {
                if (window.scrollY < lastScrollY || window.scrollY < 100) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false);
                }
                setLastScrollY(window.scrollY);
            }
        };
        window.addEventListener('scroll', controlNavbar);
        return () => window.removeEventListener('scroll', controlNavbar);
    }, [lastScrollY]);



    return (
        <header className={`
            fixed top-0 left-0 right-0 z-50 transition-transform duration-300
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}
            w-[100%] h-10 px-40 py-7 flex items-center justify-between
            ${isDark ? 'from-indigo-800/90 to-indigo-900/90 bg-gradient-to-r backdrop-blur-md' : 'from-indigo-200/90 to-indigo-400/90 bg-gradient-to-r backdrop-blur-md'}
        `}>
            <button className={`cursor-pointer bg-clip-text text-transparent text-2xl font-bold ${isDark ? 'from-pink-600 to-amber-700' : 'from-pink-400 to-purple-400'} bg-gradient-to-r`}
                onClick={() => { fetchTrending(); navigateTo('home'); }}>
                Movie Finder🎟
            </button>

            <div className="flex gap-6 items-center">
                <button className="hover:text-sky-600 cursor-pointer" onClick={() => { fetchTopRated(); navigateTo('home'); }}>Movie</button>
                <button className="hover:text-sky-600 cursor-pointer" onClick={() => { fetchSeries(); navigateTo('home'); }}>Series</button>
                <button className="hover:text-sky-600 cursor-pointer" onClick={() => { setMovies(watchlist); setCategoryTitle('Saved'); navigateTo('home'); }}>Saved</button>

                <div className="relative">
                    <div className="flex gap-6">
                        {isLogin ? (
                            <button className="hover:text-sky-600 border border-white rounded-full px-2 py-1 cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); setShowDropdown(!showDropdown); }}>
                                {user.charAt(0).toUpperCase()}
                            </button>
                        ) : (
                            <button onClick={() => navigateTo('login')} className="hover:text-sky-600 cursor-pointer">Login</button>
                        )}
                    </div>

                    {showDropdown && (
                        <div className="absolute right-0 top-10 bg-white rounded-xl shadow-2xl p-4 min-w-48 z-50">
                            <p className="font-bold text-black text-lg">{user}</p>
                            <p className="text-gray-400 text-sm mb-4">My profile</p>
                            <hr className="border-zinc-200 mb-2" />
                            <button className="w-full text-left text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg cursor-pointer"
                                onClick={() => { setIsLogin(false); setUser(''); localStorage.removeItem('user'); setShowDropdown(false); }}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>

                <button className="cursor-pointer text-xl" onClick={() => setIsDark(!isDark)} >
                    {isDark ? '🌙' : '☀️'}
                </button>
            </div>
        </header>
    );
}
