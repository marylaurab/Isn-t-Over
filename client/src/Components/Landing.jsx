import {Link} from 'react-router-dom'


export default function Landing() {
    return (
        <div>
            <h1>GAMES</h1>
            <Link to='/videogames' ><button>View all games</button></Link>
        </div>
    )
}