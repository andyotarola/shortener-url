export const shortenerURL = async (shortendURL: string) =>  {

  return  fetch(`/api/shortend.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({shortendURL})
  })


}