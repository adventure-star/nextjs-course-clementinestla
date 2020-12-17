import { LazyImage} from '@components/lazy-image'
import { getAllProductsByCategory } from '@api'
import Link from 'next/link'


export default  class Noel extends React.Component {

    state = {imgLoaded: false};

    componentDidMount () {
      //  setTimeout(() => {  this.setState({imgLoaded: true}); }, 2000);
        this.setState({imgLoaded: true})
      }
    render(){
    return <div className="text-center">
        <h1>Catalogue de noël</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2" >
        {this.props.products.map((post, i) =>
          <Link key={i} href={`/products/${post.slug}`}>
            <div className="300 m-6">
            <a className="m-auto max-w-md flex flex-col text-center shadow-2xl rounded        transform motion-reduce:transform-none hover:-translate-y-1 hover:scale-105 transition ease-in-out duration-300">
              <LazyImage fileName={post.image} loaded={this.state.imgLoaded} className="h-64 w-64 m-auto" ></LazyImage>
              <span className="text-beach-grey text-2xl mt-2  p-2">{post.title}</span>
            </a>
            </div>
          </Link>
        )}
      </div>
    </div>
  }
}


export async function getStaticProps() {
    const allProductsNoel = await getAllProductsByCategory("noel")

    return {
        props: {
            products: allProductsNoel,
        }
    }
}
  
