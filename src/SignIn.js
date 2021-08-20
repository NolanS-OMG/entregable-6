import UserForm from './UserForm';
import { useAuth } from './AuthProvider.js';
import { Redirect } from "react-router";
import { useEffect } from 'react';

const SignIn = () => {
    const {localUser} = useAuth();
    return (
        <div className='sign-container'>
            {localUser ? <Redirect to = '/chat/0'/>: <UserForm/>}
        </div>
    )
}

export default SignIn;