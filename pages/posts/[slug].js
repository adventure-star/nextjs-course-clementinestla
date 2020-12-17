import { getPostBySlug, getAllPosts } from "@api"
import Link from 'next/link'
import { LazyImage} from '@components/lazy-image'

export default class Post extends React.Component {

    state = {imgLoaded: false};
    componentDidMount () {
        this.setState({imgLoaded: true})
      }
render(){
    console.log("data img => "+this.props.image)

    return <div>
            <article className="text-center text-beach-black">
                <LazyImage objectBehavior="object-contain" className="h-screen w-full" fileName={this.props.image} loaded={this.state.imgLoaded} ></LazyImage>
                <h1 className="underline my-10">{this.props.title}</h1>
                <div className="w-full md:w-4/5 m-auto" dangerouslySetInnerHTML={{__html:this.props.content}}/>
                <div><Link href='/'><a>Home</a></Link></div> 
            </article>
    </div>
    }
}

export async function getStaticProps(context){
    return {
        props: await getPostBySlug(context.params.slug)
    }
}

export async function getStaticPaths(){
    let paths = await getAllPosts()
    paths = paths.map(post => ({
        params: { slug:post.slug }
    }));
    return {
        paths: paths,
        fallback: false
    }
}