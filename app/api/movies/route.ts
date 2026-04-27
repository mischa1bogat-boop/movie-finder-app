import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'movie';
    const query = searchParams.get('query');
    const endpoint = searchParams.get('endpoint') || 'popular';

    const API_KEY = process.env.TMDB_API_KEY;
    let url = '';
    if (type === 'genre') {
        url = `https://api.themoviedb.org/3/genre/${endpoint}?api_key=${API_KEY}`;
    }
    else if (query) {
        url = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${query}`;
    }
    else {
        url = `https://api.themoviedb.org/3/${type}/${endpoint}?api_key=${API_KEY}`;
    }

    try {
        const res = await fetch(url);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
