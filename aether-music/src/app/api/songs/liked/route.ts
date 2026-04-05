import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: likedSongs, error } = await supabase
      .from('liked_songs')
      .select('song_id')
      .eq('user_id', user.id);

    if (error) throw error;

    const songIds = likedSongs.map((item: any) => item.song_id);

    return NextResponse.json({ liked_songs: songIds });
  } catch (error: any) {
    console.error('Get liked songs error:', error.message || error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
