const API_URL = 'http://0.0.0.0:8080/query'

const ServerSide = ({ data }) => {
  return (
    <section>
      <header>
        <h1>There is {data.emailsCount} of registered</h1>
      </header>
    </section>
  );
};

export const getServerSideProps = async () => {
  const data = await fetchAPI(
    `
    query getEmailsCount {
      emailsCount
    }`
  )
  return { props: { data } }
}

async function fetchAPI(query = {}) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
    }),
  })

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}


export default ServerSide;