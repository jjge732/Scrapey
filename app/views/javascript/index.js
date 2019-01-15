axios.get('/api/articles/').then(res => {
    function Card(props) {
        return(
            <div class='card'>
                <h2 class='headline'>{props.headline}</h2>
                <h3 class='genre'>{props.genre}</h3>
                <a href={props.url} class='image'><img src={props.imageUrl}/></a>
                <button class='comment'>Comment on this Article!</button>
            </div>
        );
    }

    class Container extends React.Component {
        // constructor(props) {

        // }
        render() {
            return (
                <div id='container'>
                    <Card headline = {res.data[0].headline} genre = {res.data[0].genre} url = {res.data[0].url} imageUrl = {res.data[0].imageUrl}/>
                    <Card headline = {res.data[1].headline} genre = {res.data[1].genre} url = {res.data[1].url} imageUrl = {res.data[1].imageUrl}/>
                    <Card headline = {res.data[2].headline} genre = {res.data[2].genre} url = {res.data[2].url} imageUrl = {res.data[2].imageUrl}/>
                    <Card headline = {res.data[3].headline} genre = {res.data[3].genre} url = {res.data[3].url} imageUrl = {res.data[3].imageUrl}/>
                    <Card headline = {res.data[4].headline} genre = {res.data[4].genre} url = {res.data[4].url} imageUrl = {res.data[4].imageUrl}/>
                    <Card headline = {res.data[5].headline} genre = {res.data[5].genre} url = {res.data[5].url} imageUrl = {res.data[5].imageUrl}/>
                    <Card headline = {res.data[6].headline} genre = {res.data[6].genre} url = {res.data[6].url} imageUrl = {res.data[6].imageUrl}/>
                    <Card headline = {res.data[7].headline} genre = {res.data[7].genre} url = {res.data[7].url} imageUrl = {res.data[7].imageUrl}/>
                    <Card headline = {res.data[8].headline} genre = {res.data[8].genre} url = {res.data[8].url} imageUrl = {res.data[8].imageUrl}/>
                    <Card headline = {res.data[9].headline} genre = {res.data[9].genre} url = {res.data[9].url} imageUrl = {res.data[9].imageUrl}/>
                    <Card headline = {res.data[10].headline} genre = {res.data[10].genre} url = {res.data[10].url} imageUrl = {res.data[10].imageUrl}/>
                    <Card headline = {res.data[11].headline} genre = {res.data[11].genre} url = {res.data[11].url} imageUrl = {res.data[11].imageUrl}/>

                </div>
            );
        }
    }

    ReactDOM.render(
        <Container />,
        document.getElementById('root')
    );
}).catch(err => console.log(err));