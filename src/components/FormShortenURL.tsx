import { shortenerURL } from '@/services/shortend'
import { useState } from 'react'
import { toast } from 'sonner'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './Dialog'
import './FormShortenURL.css'
import Loader from './Loader'
import Check from './icons/Check'
import Copy from './icons/Copy'

const FormShortenURL = () => {
  const [open, setOpen] = useState(false)
  const [shortendURL, setShortendURL] = useState('')
  const [shortURL, setShortURL] = useState('')
  const [isCopied, setIsCopied] = useState(false)
  const [loading, setLoading] = useState(false)

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

      setLoading(true)

      shortenerURL(shortendURL.trim())
        .then((res) => res.json())
        .then((json) => {
          setOpen(true)
          setShortURL(json.shortURL)
        })
        .catch(() => {
          toast.error(
            'Ha ocurrido un error en el servidor, por inténtelo nuevamente.'
          )
        })
        .finally(() => {
          setShortendURL('')
          setLoading(false)
        })
    } catch (e) {
      toast.error(
        'La URL proporcionada es inválida, por favor pruebe con otra.'
      )
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortURL)
      setIsCopied(true)

      setTimeout(() => setIsCopied(false), 3000)
    } catch (e) {
      console.log('Hubo un error')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
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
        <Dialog open={open} onOpenChange={setOpen}>
          <button
            disabled={loading}
            type="submit"
            className="relative h-10 sm:h-12 items-center justify-center rounded-md bg-white px-6 font-medium text-black transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            <div className="absolute -inset-0.5 -z-10 rounded-lg bg-gradient-to-b from-[#c7d2fe] to-[#8678f9] opacity-75 blur" />
            {loading && (
              <div className="absolute inset-0 z-10 bg-white rounded-md">
                <Loader />
              </div>
            )}
            <div className="flex justify-center relative">
              <span>Acortar URL</span>
            </div>
          </button>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Compartir URL</DialogTitle>
            </DialogHeader>
            <div className="flex items-center space-x-2">
              <input
                readOnly
                className="
                  block h-12 w-full rounded-md border border-slate-800 bg-black px-3 py-2 focus:outline-none  focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50
                "
                value={shortURL}
              />
              <button
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-white-foreground hover:bg-white/90 h-9 rounded-md px-3"
                onClick={handleCopy}
              >
                {isCopied ? <Check /> : <Copy />}
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </form>
  )
}

export default FormShortenURL
