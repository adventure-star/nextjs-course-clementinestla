import { LazyImage} from '@components/lazy-image'


export default  class Contact extends React.Component {

    state = {imgLoaded: false};

    componentDidMount () {
        setTimeout(() => {  this.setState({imgLoaded: true}); }, 2000);
        //this.setState({imgLoaded: true})
      }
    render(){
    return <div className="text-center">
        <h1>Contact</h1>
            <LazyImage fileName={'about_photo.jpg'} loaded={this.state.imgLoaded} ></LazyImage>
        <p className="mt-6">Des requêtes spécifiques, plus d'infos ou autres ? N'hésitez pas à me contacter via email en cliquant sur le bouton et je tâcherai de vous répondre au plus vite !</p>
        <a className="bg-beach-sand block mt-8 p-8" href="mailto:cverein.professionnel@yahoo.fr">envoyer email</a>
    </div>
  }
}
  
