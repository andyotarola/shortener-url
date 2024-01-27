import { addNewShortURL, getShortURL } from '@/db/client';
import { type APIRoute } from 'astro';

export const POST: APIRoute = async ({params, request}) => {

  const { origin } = new URL(request.url)
  const { shortenURL } = await request.json()
  const shortURL = Math.random().toString(36).substring(2, shortenURL.length)
  
  try {    
    
    const result =  await getShortURL(shortenURL)
    
    if(result != null) return new Response(JSON.stringify({
      shortURL: `${origin}/${result?.short_url}`
    })) 

    await addNewShortURL({shortURL, shortenURL})
    
    return new Response(JSON.stringify({
      shortURL: `${origin}/${shortURL}`
    }))

  } catch (error) {
    
    return new Response('Internal Server Error', {status: 500})
  }


}