export const shortenerURL = async (shortenURL: string) =>  {

  return  fetch(`/api/shortend.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({shortenURL})
  })
}

