import {Link} from 'react-router-dom';
import { useAuth } from './AuthProvider.js';
import {auth} from './firebase.js';

const NavBar = () => {
    const {localUser, putLocalUser} = useAuth();
    const logOut = async () => {
        await auth.signOut();
        putLocalUser(null);
    }
    return(
        <nav>
            <div>
                <h4>Chat Hot</h4>
            </div>
            <ul>
                <li><Link to='/home'>Principal</Link></li>
                {localUser ? <li><button onClick = {logOut}>Salir de la cuenta</button></li> : <li><Link to='/signin'>Ingresar</Link></li>}
                {!localUser && <li><Link to='/signup'>Registrarse</Link></li>}
                {localUser ? <li><Link to='/chat/0'>Ir al chat</Link></li> : []}
            </ul>
        </nav>
    )
}

export default NavBar;