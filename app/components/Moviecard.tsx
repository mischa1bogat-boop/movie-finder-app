import React from 'react';

interface MovieCardProps {
  movie: any;
  index: number;
  isDark: boolean;
  genres: any[];
  onClick: () => void;
}

export default function MovieCard(props: MovieCardProps) {
  const { movie, index, isDark, genres, onClick } = props;
  const getGenreNames = () => {
    if (!movie.genre_ids || !genres) return "";
    return movie.genre_ids
      .map((id: number) => genres.find((g: any) => g.id === id)?.name)
      .filter(Boolean)
      .slice(0, 2)
      .join(', ');
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group animate-card"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="relative hover:scale-105 transition-transform duration-300">
        <img
          className="rounded-2xl shadow-xl w-full h-auto object-cover"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title || movie.name}
        />
        <p className="bg-black/60 text-white px-2 py-1 pointer-events-none top-2 left-2 absolute rounded-lg text-sm">
          ⭐{movie.vote_average?.toFixed(1)}
        </p>
      </div>

      <div className="mt-3 px-1">
        <h3 className={`font-bold truncate text-sm md:text-base ${isDark ? 'text-white' : 'text-black'}`}>
          {movie.title || movie.name}
        </h3>
        <p className="text-xs text-purple-500 font-semibold mb-1">
          {getGenreNames()}
        </p>

        <p className={`text-xs ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
          {(movie.release_date || movie.first_air_date)?.split('-')[0]}
        </p>
      </div>
    </div>
  );
}