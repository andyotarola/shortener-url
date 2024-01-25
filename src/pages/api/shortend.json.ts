import { type APIRoute } from 'astro';

export const POST: APIRoute = async ({params, request}) => {

  const { origin } = new URL(request.url)
  const { shortendURL } = await request.json()
  const shortURl = Math.random().toString(36).substring(2, shortendURL.length)
  

  return new Response(JSON.stringify({
    shortURl: `${origin}/${shortURl}`
  }))

}