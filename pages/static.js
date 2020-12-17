function Static({ posts }) {
    return (
      <ul>
        {posts.map((post) => (
          <li key={post.title}>{post.title}</li>
        ))}
      </ul>
    )
  }
  
  export async function getStaticProps() {
    // Call an external API endpoint to get posts
    //const res = await fetch('https://.../posts')
    //const posts = await res.json()

    const posts = [{
        title:"1"},
        {title:"2"},
        {title:"3"}
    ]
  
    // By returning { props: posts }, the Blog component
    // will receive `posts` as a prop at build time
    return {
      props: {
        posts,
      },
    }
  }

  export default Static