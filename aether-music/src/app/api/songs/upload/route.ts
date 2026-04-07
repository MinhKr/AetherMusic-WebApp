import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const image = formData.get('image') as File | null;
    const title = formData.get('title') as string;
    const artist = formData.get('artist') as string;
    const genre = formData.get('genre') as string;

    if (!file || !title || !artist) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Upload audio
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    const filePath = `tracks/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('songs')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data: { publicUrl: songUrl } } = supabase.storage
      .from('songs')
      .getPublicUrl(filePath);

    // 2. Upload image (if provided)
    let imageUrl = 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=800&q=80';
    if (image && image.size > 0) {
      const imgExt = image.name.split('.').pop();
      const imgName = `${crypto.randomUUID()}.${imgExt}`;
      const imgPath = `artworks/${imgName}`;

      const { error: imgError } = await supabase.storage
        .from('songs')
        .upload(imgPath, image);

      if (imgError) throw imgError;

      const { data: { publicUrl: imgPublicUrl } } = supabase.storage
        .from('songs')
        .getPublicUrl(imgPath);

      imageUrl = imgPublicUrl;
    }

    // 3. Insert to DB
    const { error: dbError } = await supabase
      .from('songs')
      .insert({
        title,
        artist,
        genre,
        song_url: songUrl,
        image_url: imageUrl,
        user_id: user.id,
      });

    if (dbError) throw dbError;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message || 'Upload failed' }, { status: 500 });
  }
}
