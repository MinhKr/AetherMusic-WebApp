import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { playlist_id, song_id } = await request.json();

    if (!playlist_id || !song_id) {
      return NextResponse.json({ error: 'Playlist ID and Song ID are required' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('playlist_songs')
      .insert({
        playlist_id,
        song_id
      })
      .select()
      .single();

    if (error) {
      // Handle duplicate entries gracefully
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Song already in playlist' }, { status: 200 });
      }
      throw error;
    }

    return NextResponse.json({ message: 'Song added to playlist', data });
  } catch (error: any) {
    console.error('Add song to playlist error:', error.message || error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
