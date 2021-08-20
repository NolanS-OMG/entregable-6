import { useForm } from 'react-hook-form';
import firebase from 'firebase';
import {auth} from './firebase.js';
import { useRouteMatch } from 'react-router';
import {useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword, useAuthState} from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useAuth } from './AuthProvider.js';
import { Link } from 'react-router-dom';

const UserForm = () => {
    const {register, handleSubmit} = useForm();
    const {putLocalUser} = useAuth();
    const {url} = useRouteMatch();
    const [user, loading] = useAuthState(auth);
    const [createUserWithEmailAndPassword] = useCreateUserWithEmailAndPassword(auth);
    const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth,'','');
    const submit = (userObj) => {
        if (url === '/signup') {
            signUp(userObj);
        } else if (url === '/signin') {
            signIn(userObj);
        }
    }
    const signIn = (userObj) => {
        signInWithEmailAndPassword(userObj.email, userObj.password)
    }
    const signUp = (userObj) => {
        createUserWithEmailAndPassword(userObj.email, userObj.password)
    }
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider);
    }
    useEffect(() => {
        if (!loading) {
            putLocalUser(user);
        }
    },[user, loading])
    return(
        <div className='sign'>
            <form onSubmit = {handleSubmit( submit )}>
                <label>Correo: <input placeholder='ej. correo-ejemplo@gmail.com' type='email' {...register('email', {
                        required: true
                    } ) }/></label>
                <label>Contraseña: <input type='password' {...register('password', {
                        required: true
                    } ) }/></label>
                <button type='submit'>REGISTRAR</button>
            </form>
            <button onClick = {signInWithGoogle}>Iniciar con Google</button>
            {url === '/signin' ? <Link to='signup'>¿No tienes cuenta?</Link>:[]}
        </div>
    )
};

export default UserForm;