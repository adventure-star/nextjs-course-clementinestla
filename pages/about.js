import { LazyImage} from '@components/lazy-image'


export default  class About extends React.Component {

    state = {imgLoaded: false};

    componentDidMount () {
        setTimeout(() => {  this.setState({imgLoaded: true}); }, 2000);
        //this.setState({imgLoaded: true})
      }
    render(){
    return <div className="text-center">
        <h1>A propos</h1>
            <LazyImage fileName={'about_photo.jpg'} loaded={this.state.imgLoaded} ></LazyImage>
        <h2>Clémentine, 30 et quelques pépins</h2>
        <p>Pour faire bref, j'aime pas mal de choses comme notamment la Haute couture, la mode éco-responsable, la récup', les braderies, transformer, les BD, regarder les bandes annonces sur allociné, apprendre, découvrir des pays et leurs cultures, galérer et avoir de petites victoires, la couture, la pôle dance ET LE FROMAGE !</p>
        <p >Auparavant je consommais beaucoup, notamment des fringues (fast fashion bonjour), et il y a quelques années, lors d’une expérience à l’étranger, j’ai eu le déclic (explications ici) : je dégage beaucoup trop de CO2, ce serait pas mal que je change mes habitudes !</p>
        <p>Et depuis, cela fait 4 ans que je couds, 3 ans que je n’ai pas acheté de vêtements ni dans les magasins ni sur internet (par contre j’ai fait péter le stock de tissus), 3 ans que je mange moins de viandes, me déplace pratiquement qu’en transport en commun et vélo et un an que je me suis lancée en auto entrepreneur avec Clementine Concept Store (je vous en parlerai un peu plus longuement dans un article).</p>
        <p>Sur ce site je souhaite partager avec vous mes créations, mes inspirations, mes escapades mais aussi vous partager mes opinions et mes goûts sur notamment la mode, l’éco-responsabilité, comment consommer autrement, les petites alternatives pour moins polluer...</p>
        <p>Bonne(s) découverte(s) !</p>
        <p>C.</p>
    </div>
  }
}
  
