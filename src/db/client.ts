import pg from 'pg'

const pool = new pg.Pool({
  connectionString: import.meta.env.DATABASE_URL ?? '',
  ssl: {requestCert:true},
})


export const getShortenURL= async (shortURL: string) => {
  const client = await pool.connect()

  const result = await client.query(
    `
      SELECT shorten_url FROM shorts_url WHERE short_url = $1
    `, [shortURL]
  )

  client.release()  

  return result.rows[0]

}


export const getShortURL = async (shortenURL: string) => {
  const client = await pool.connect()

  const result = await client.query(
    `
      SELECT short_url FROM shorts_url WHERE shorten_url = $1
    `, [shortenURL]
  )

  client.release()  

  return result.rows[0]

}

export const addNewShortURL = async (
  { shortURL, shortenURL }: 
  { shortURL:string, shortenURL:string }
) => {  
  const client = await pool.connect()

  await client.query(
    `
      INSERT INTO shorts_url (short_url, shorten_url)
      VALUES ($1, $2)
    `, [shortURL, shortenURL]
  )

  client.release()

}