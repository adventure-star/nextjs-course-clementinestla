
import { getLatestsPostsByRange, getNumberOfPosts } from '@api'
import Link from 'next/link'
import Router from 'next/router'
import { LazyImage } from '@components/lazy-image'

export default  class Blog extends React.Component {
  state = { imgLoaded: false };

  static async getInitialProps({ query: { from = 1, to = 4 } }) {

    const posts = await getLatestsPostsByRange(from, to)
    const lenAllPosts = await getNumberOfPosts()
    return {
      posts: posts,
      lenAllPosts: lenAllPosts,
      from: parseInt(from, 10),
      to: parseInt(to, 10)
    }
  }

  componentDidMount() {
    this.setState({imgLoaded: true})
  }

  shouldDisableButton(){
    return this.props.lenAllPosts <= this.props.to
  }

  render() {
    return <div onScroll={this.handleScroll}>
      <div className="grid grid-cols-1 lg:grid-cols-2" >
        {this.props.posts.map((post, i) =>
          <Link key={i} href={`/posts/${post.slug}`}>
            <a className="mx-20 pt-4 lg:mx-4  flex flex-col text-center shadow-2xl rounded        transform motion-reduce:transform-none hover:-translate-y-1 hover:scale-105 transition ease-in-out duration-300">
              <LazyImage fileName={post.image} loaded={this.state.imgLoaded} className="h-64 w-full m-auto p-4" ></LazyImage>
              <span className="text-beach-grey text-2xl mt-2  p-2">{post.title}</span>
            </a>
          </Link>

        )}
      </div>
      <div className="mt-20 w-full text-center">
      <button disabled={this.shouldDisableButton()} 
      className={`w-2/5 text-2xl p-4 bg-beach-green text-white
      ${this.shouldDisableButton() ? "invisible" : ""}`}
      onClick={() => Router.push(`/blog?from=${parseInt(this.props.from + 4)}&to=${parseInt(this.props.to + 4)}`)}>
          voir plus
        </button>
        </div>
    </div>
  }
}
