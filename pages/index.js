import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { getConfig, getAllPosts, getAllPlannings } from '@api'
import { BandeauCleo } from '@components/bandeau-cleo'
import { BandeauBlog } from '@components/bandeau-blog'
import { LazyImage } from '@components/lazy-image'
import { BaseIcon } from '@components/icons/base-icon'
import { NoelIcon } from '@components/icons/noel-icon'
import { CalendarIcon } from '@components/icons/calendar-icon'

import Carousel, { autoplayPlugin } from '@brainhubeu/react-carousel';
export default class Home extends React.Component {

    state = { imgLoaded: false };
    t = {

        resolve: autoplayPlugin,
        options: {
            interval: 4000,
        }

    }
    componentDidMount() {
        this.setState({ imgLoaded: true })
    }
    render() {
        return (
            <div className={styles.container}>
                <section className="w-full p-8 bg-beach-sand rounded-lg mb-4">
                    <div className="flex flex-col sm:flex-row justify-center items-center">
                        <BaseIcon className="sm-max:w-12 sm-max:h-12 h-32 w-32" />
                        <h1 className="text-center text-beach-grey font-extrabold">Consommez autrement, upcyclez votre quotidien !</h1>
                        <BaseIcon className=" sm-max:w-12 sm-max:h-12 h-32 w-32" />
                    </div>
                </section>                
                <Carousel infinite  autoPlay={6000} animationSpeed={3000} dots >
                <div className="w-full md:w-4/5 lg:w-2/3 xl:w-3/5 h-bandeau"><LazyImage fileName={'gangcharlotte.jpg'} loaded={this.state.imgLoaded}/></div>
                <div className="w-full md:w-4/5 lg:w-2/3 xl:w-3/5 h-bandeau"><LazyImage fileName={'bandeau_top.jpeg'} loaded={this.state.imgLoaded}/></div>
                </Carousel>

                <Link href="/noel">
                <a className="bg-beach-red w-full my-8 p-4">
                <div className="flex flex-row justify-center items-center">
                        <NoelIcon className="sm-max:w-full h-32 w-32" />
                        <h1 className="text-white font-extrabold">Catalogue de Noel</h1>
                    </div>
                    </a>
                </Link>

                <BandeauCleo />

                <section className="w-1/2 bg-beach-sand rounded-lg mt-6 flex flex-col">

                        {this.props.plannings.map(function (planning, idx) {
                            return (
                                <Link key={idx} href={`/plannings/${planning.slug}`}>
                                    <a className="w-auto h-40 text-beach-grey font-extrabold text-2xl text-center">
                                        <p>planning {planning.title}</p>
                                        <CalendarIcon className="w-full text-center"/>
                                    </a>
                                    
                                </Link>

                            )
                        })}
                </section>
               {/* <p>List of posts:</p>
                <ul>
                    {this.props.posts.map(function (post, idx) {
                        return (
                            <li key={idx}>
                                <Link href={`/posts/${post.slug}`}>
                                    <a>{post.title}</a>
                                </Link>
                            </li>
                        )
                    })}
                </ul>

                <BandeauBlog latestPosts={this.props.latestPosts} />*/}
            </div>
        )
    }
}

export async function getStaticProps() {
    const config = await getConfig()
    const allPosts = await getAllPosts()
    const allPlannings = await getAllPlannings()
    //const latestPosts = await getLatestsPostsByNumber()

    return {
        props: {
            posts: allPosts,
            plannings: allPlannings,
            title: config.title,
            description: config.description,
            //latestPosts: latestPosts
        }
    }
}