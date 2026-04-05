import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { song_id } = await request.json();

    if (!song_id) {
      return NextResponse.json({ error: 'Song ID is required' }, { status: 400 });
    }

    // Check if it exists
    const { data: existingLike } = await supabase
      .from('liked_songs')
      .select('id')
      .eq('user_id', user.id)
      .eq('song_id', song_id)
      .single();

    if (existingLike) {
      // Unlike
      const { error } = await supabase
        .from('liked_songs')
        .delete()
        .eq('id', existingLike.id);

      if (error) throw error;
      return NextResponse.json({ message: 'Unliked successfully', liked: false });
    } else {
      // Like
      const { error } = await supabase
        .from('liked_songs')
        .insert({ user_id: user.id, song_id });

      if (error) throw error;
      return NextResponse.json({ message: 'Liked successfully', liked: true });
    }

  } catch (error: any) {
    console.error('Like toggle error:', error.message || error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
