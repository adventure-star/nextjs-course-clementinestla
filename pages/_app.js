import '../styles/index.css'
import Layout from "../components/layout";
import '@brainhubeu/react-carousel/lib/style.css';
export default function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}
