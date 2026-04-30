import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'movie';
    const query = searchParams.get('query');
    const endpoint = searchParams.get('endpoint') || 'popular';
    const page = searchParams.get('page') || '1';
    const language = searchParams.get('language') || 'en-US';

    const API_KEY = process.env.TMDB_API_KEY;
    let url = '';

    if (query) {
        url = `https://api.themoviedb.org/3/search/${type}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}&language=${language}&include_adult=false`;
    } else {
        url = `https://api.themoviedb.org/3/${type}/${endpoint}?api_key=${API_KEY}&page=${page}&language=${language}`;
    }

    try {
        const res = await fetch(url);
        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
    }
}
