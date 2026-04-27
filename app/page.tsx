'use client';
import { useState, useEffect } from "react"
import Image from "next/image";
import MovieCard from './components/Moviecard';
import Footer from './components/Footer';
import Header from './components/Header';
import Hero from './components/Hero';
import Mdetails from './components/Mdetails';
import LoginForm from './components/Login';
import Register from './components/Register';
import { GoogleOAuthProvider } from '@react-oauth/google';





export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [remember, setRemember] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [heroText, setHeroText] = useState('');
  const [heroSubText, setHeroSubText] = useState('');
  const [searchType, setSearchType] = useState('movie');
  const [showDropdown, setShowDropdown] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [categoryTitle, setCategoryTitle] = useState('Trending Movies');
  const [watchlist, setWatchList] = useState<any[]>([]);
  const [movieGenres, setMovieGenres] = useState<any[]>([]);
  const navigateTo = (page: string) => {
    setCurrentPage(page);
    window.history.pushState({ page }, '');
  }
  useEffect(() => {
    const handleClickOutside = () => setShowDropdown(false);
    if (showDropdown) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showDropdown]);

  const fetchTrailer = async (movieId: number) => {
    const type = searchType === 'tv' ? 'tv' : 'movie';
    const response = await fetch(`/api/movies?type=${type}&endpoint=${movieId}/videos`);
    const data = await response.json();
    const trailer = data.results.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube');
    if (trailer) setTrailerKey(trailer.key);
  };

  const fetchFullDetails = async (movie: any) => {
    const type = movie.title ? 'movie' : 'tv';
    const response = await fetch(`/api/movies?type=${type}&endpoint=${movie.id}`);
    const fullData = await response.json();
    setSelectedMovie(fullData);
  };


  const fetchGenres = async () => {
    try {
      const movieRes = await fetch(`/api/movies?type=genre&endpoint=movie/list`);
      const movieData = await movieRes.json();
      const tvRes = await fetch(`/api/movies?type=genre&endpoint=tv/list`);
      const tvData = await tvRes.json();
      setMovieGenres([...(movieData.genres || []), ...(tvData.genres || [])]);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  useEffect(() => {
    if (currentPage !== 'home') return;
    const title = 'Welcome to Movie Finder🎟';
    const subtitle = 'Find your favorite movie and watch it online for free!';
    let i = 0;
    let j = 0;
    setHeroText('');
    setHeroSubText('');

    const titleInterval = setInterval(() => {
      if (i < title.length) {
        setHeroText(title.slice(0, i + 1));
        i++;
      } else {
        clearInterval(titleInterval);
        const subInterval = setInterval(() => {
          if (j < subtitle.length) {
            setHeroSubText(subtitle.slice(0, j + 1));
            j++;
          } else {
            clearInterval(subInterval);
          }
        }, 30);
      }
    }, 50);

    return () => clearInterval(titleInterval);
  }, [currentPage]);

  useEffect(() => {
    const handleBack = (e: PopStateEvent) => { setCurrentPage(e.state?.page || 'home'); };
    window.addEventListener('popstate', handleBack);
    return () => window.removeEventListener('popstate', handleBack);
  }, []);

  const searchMovies = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    const response = await fetch(`/api/movies?type=${searchType}&query=${searchQuery}`);
    const data = await response.json();
    setMovies(data.results || []);
    setIsSearching(false);
  };

  const fetchTrending = async () => {
    const response = await fetch(`/api/movies?type=trending&endpoint=movie/day`);
    const data = await response.json();
    setMovies(data.results || []);
    setIsSearching(false);
    setCategoryTitle('Trending Movies');
  };


  const fetchSeries = async () => {
    const response = await fetch(`/api/movies?type=tv&endpoint=top_rated`);
    const data = await response.json();
    setMovies(data.results || []);
    setIsSearching(false);
    setCategoryTitle('Top Rated TV Series');
  };

  const fetchTopRated = async () => {
    const response = await fetch(`/api/movies?type=movie&endpoint=top_rated`);
    const data = await response.json();
    setMovies(data.results || []);
    setIsSearching(false);
    setCategoryTitle('Top Rated Movies');
  };

  const fetchTrendingSeries = async () => {
    const response = await fetch(`/api/movies?type=tv&endpoint=popular`);
    const data = await response.json();
    setMovies(data.results || []);
    setIsSearching(false);
    setCategoryTitle('Trending Series');
  };

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setIsDark(true);
    }
    if (localStorage.getItem('user')) {
      setUser(localStorage.getItem('user')!);
      setIsLogin(true);
    }
    fetchGenres();
    fetchTrending();
    const savedWatchlist = localStorage.getItem('watchlist');
    if (savedWatchlist) setWatchList(JSON.parse(savedWatchlist));
  }, [])
  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark])

  const handleLogin = () => {
    setErrorMsg('');
    if (!user || !password) {
      setErrorMsg("Please fill in all fields!");
      return;
    }
    const saved = localStorage.getItem('accounts');
    const accounts = saved ? JSON.parse(saved) : [];
    const found = accounts.find((acc: any) => acc.username === user && acc.password === password)
    if (!found) {
      setErrorMsg("Invalid username or password!");
      return;
    }
    if (remember) {
      localStorage.setItem('user', user);
      localStorage.setItem('password', password);
    }
    setIsLogin(true);
    setPassword('');
    navigateTo('home');
  }

  const handleRegister = () => {
    setErrorMsg('');
    if (!user || !password) {
      setErrorMsg("Fill all fields!");
      return;
    }
    const saved = localStorage.getItem('accounts');
    const accounts = saved ? JSON.parse(saved) : [];
    const exists = accounts.find((acc: any) => acc.username === user);
    if (exists) {
      setErrorMsg("This username is already taken!");
      return;
    }
    accounts.push({ username: user, password: password });
    localStorage.setItem('accounts', JSON.stringify(accounts));
    setIsLogin(true);
    setPassword('');
    navigateTo('home');
  }

  const handleGoogleLogin = () => {
    const fakeGoogleUser = "Google_User_" + Math.floor(Math.random() * 1000);
    localStorage.setItem('user', fakeGoogleUser);
    setUser(fakeGoogleUser);
    setIsLogin(true);
    navigateTo('home');
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>

      <div className={`min-h-screen flex flex-col ${isDark ? 'bg-black bg-dots-dark' : 'bg-white bg-dots-light'} font-sans text-white`}>
        <Header
          isDark={isDark} setIsDark={setIsDark}
          isLogin={isLogin} setIsLogin={setIsLogin}
          user={user} setUser={setUser}
          showDropdown={showDropdown} setShowDropdown={setShowDropdown}
          navigateTo={navigateTo}
          fetchTrending={fetchTrending}
          fetchTopRated={fetchTopRated}
          fetchSeries={fetchSeries}
          setMovies={setMovies}
          watchlist={watchlist}
          setCategoryTitle={setCategoryTitle}
        />
        {currentPage === 'login' ? (
          <div className={`min-h-screen flex flex-col ${isDark ? 'bg-black' : 'bg-white'}`}>
            <div className="flex flex-grow items-center justify-center">
              <LoginForm
                isDark={isDark}
                user={user}
                setUser={setUser}
                password={password}
                setPassword={setPassword}
                errorMsg={errorMsg}
                remember={remember}
                setRemember={setRemember}
                handleLogin={handleLogin}
                navigateTo={navigateTo}
                handleGoogleLogin={handleGoogleLogin}
              />
            </div>
          </div>
        ) :
          currentPage === 'details' ? (
            <>
              <Mdetails
                selectedMovie={selectedMovie}
                isDark={isDark}
                trailerKey={trailerKey}
                watchlist={watchlist}
                setWatchList={setWatchList}
                isLogin={isLogin}
                navigateTo={navigateTo}
              />

            </>
          ) :
            currentPage === 'register' ? (
              <Register
                isDark={isDark}
                user={user}
                setUser={setUser}
                password={password}
                setPassword={setPassword}
                errorMsg={errorMsg}
                remember={remember}
                setRemember={setRemember}
                handleRegister={handleRegister}
                navigateTo={navigateTo}
              />
            ) : (
              <>
                {categoryTitle !== 'Saved' && (
                  <Hero
                    heroText={heroText}
                    isDark={isDark}
                    searchType={searchType}
                    setSearchType={setSearchType}
                    fetchTrending={fetchTrending}
                    fetchTrendingSeries={fetchTrendingSeries}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    searchMovies={searchMovies}
                  />
                )}
                <div className={`max-w-[90%] w-full mx-auto flex-grow ${categoryTitle === 'Saved' ? 'pt-32' : 'mt-16'} min-h-[60vh] relative overflow-hidden`}>

                  <h2 className={`text-4xl w-full text-left font-black mb-10 border-l-8 border-purple-600 pl-6 transition-all ${isDark ? 'text-white' : 'text-black'}`}>
                    {categoryTitle}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8" key={categoryTitle}>
                    {(categoryTitle === 'Saved' ? watchlist : movies).map((movie, index) => (
                      <MovieCard
                        key={movie.id}
                        movie={movie}
                        index={index}
                        isDark={isDark}
                        genres={movieGenres}
                        onClick={() => { fetchFullDetails(movie); fetchTrailer(movie.id); navigateTo('details'); }}
                      />
                    ))}
                  </div>
                  {categoryTitle === 'Saved' && watchlist.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                      <span className="text-6xl mb-4">🎬</span>
                      <p className="text-2xl font-bold text-zinc-500">Your watchlist is empty...</p>
                      <button
                        onClick={() => { fetchTrending(); setCategoryTitle('Trending Movies'); }}
                        className="mt-6 text-purple-500 hover:underline">Explore movies
                      </button>
                    </div>
                  )}
                </div>
                <Footer isDark={isDark} />
              </>
            )
        }
      </div >
    </GoogleOAuthProvider>
  );
}