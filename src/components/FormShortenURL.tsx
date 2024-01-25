import { shortenerURL } from '@/services/shortend'
import { useState } from 'react'
import { toast } from 'sonner'
import './FormShortenURL.css'

const FormShortenURL = () => {
  const [shortendURL, setShortendURL] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (shortendURL.trim() === '') return

    try {
      const { origin: originURL } = new URL(shortendURL)
      const origin = globalThis.location.origin

      if (origin === originURL) {
        toast.error(
          'La URL proporcionada no está permitida, por favor pruebe con otra.'
        )
        return
      }

      shortenerURL(shortendURL)
        .then((res) => res.json())
        .then((json) => {
          console.log(json)
        })
    } catch (e) {
      toast.error(
        'La URL proporcionada es inválida, por favor pruebe con otra.'
      )
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex-grow">
          <div className="absolute top-0 flex w-full justify-center">
            <div className="h-[1px] animate-border-width rounded-full bg-gradient-to-r from-[rgba(17,17,17,0)] via-white to-[rgba(17,17,17,0)] transition-all duration-1000" />
          </div>
          <input
            className="block h-12 w-full rounded-md border border-slate-800 bg-black px-3 py-2 focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50"
            placeholder="Ejemplo: http://super-long-link.com/shorten-it"
            onChange={(e) => setShortendURL(e.target.value)}
            value={shortendURL}
          />
        </div>
        <button className="relative h-10 sm:h-12 items-center justify-center rounded-md bg-white px-6 font-medium text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
          Acortar URL
        </button>
      </div>
    </form>
  )
}

export default FormShortenURL
