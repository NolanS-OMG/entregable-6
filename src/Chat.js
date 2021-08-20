import { useEffect, useState } from "react";
import { Redirect, useRouteMatch } from "react-router";
import { useAuth } from './AuthProvider.js';
import {db} from './firebase.js';
import { useForm } from "react-hook-form";
import firebase from "firebase";
import { Link } from "react-router-dom";

const Chat = () => { 
    const {register, handleSubmit, reset} = useForm();
    const [messages, setMessages] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const [hasPermission, setHasPermission] = useState(true);
    const {localUser} = useAuth();
    const {params} = useRouteMatch();
    const createNewChat = async (externEmail, externUserName) => {
        if (externEmail !== 'Servidor' && localUser) {
            await db.collection('Permissions').add({
                chatID: permissions.length,
                emails: [localUser.email, externEmail],
                userNames: [localUser.email, externUserName]
            })
        }
    }
    const sendMessage = async (message) => {
        reset();
        await db.collection(params.id).add({
            text: message.text,
            userName: localUser.displayName ? localUser.displayName : localUser.email,
            CreatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            email: localUser.email
        })
    }
    const showMessages = (localUser && messages) ? messages.map(({id,text,userName,email}) => {
        return(
            <div key = {id + text + email}>
                <p key={'paragraph:'+id + text + email}><span key={'span:'+id + text + email} onClick={() => {
                    createNewChat(email, userName);
                    }} style = {localUser.email === email ? {color:'firebrick'}: {color:'black'}}>{userName}: </span>{text}</p>
            </div>
        )
    }) : [];
    const selectedChat = permissions.map((value, index) => {
        if (index === parseInt(params.id)) {
            return {backgroundColor:'firebrick'}
        }
        return {};
    });
    useEffect(() => {
        if (parseInt(params.id) === 0) {
            setHasPermission(true);
        } else if (parseInt(params.id) in permissions) {
            let bool = false;
            permissions[params.id].emails.forEach((value) => {
                if (value === localUser.email) {
                    bool = true;
                }
            })
            setHasPermission(bool);
        }
        db.collection(params.id).orderBy('CreatedAt').limit(50).onSnapshot(snapshot => {
            setMessages(snapshot.docs.map(doc => doc.data()));
        });
        db.collection('Permissions').orderBy('chatID').onSnapshot(snapshot => {
            setPermissions(snapshot.docs.map(doc => doc.data()));
        });
    }, [params.id])
    const permitedChats = permissions.map((permission) => {
        if (permission.chatID > 0 && localUser) {
            let isShowed = false;
            let showName = '#';
            for (let i = 0; i < permission.emails.length; i++) {
                if (localUser.email === permission.emails[i]) {
                    isShowed = true;
                }
                if (localUser.displayName !== permission.userNames[i]) {
                    showName = permission.userNames[i];
                }
            }
            if (isShowed) {
                return(
                    <li key={'chat:'+permission.chatID} style={selectedChat[permission.chatID]}><Link to={`/chat/${permission.chatID}`}>{showName}</Link></li>
                )
            }
        }
        return [];
    })
    return(
        <div>
            {localUser ? []: <Redirect to='/signin'/>}
            {hasPermission ? []: <Redirect to='/chat/0'/>}
            <div className = 'chats-list'>
                <ul>
                    <li style={selectedChat[0]}><Link to='/chat/0'>Global</Link></li>
                    {permitedChats}
                </ul>
            </div>
            <div className = 'chat'>
                <div className = 'msg-container'>{showMessages}</div>
                <form onSubmit = {handleSubmit( sendMessage )}>
                    <input type='text' placeholder='Escribe algo caliente...' {...register('text', {
                            required: true
                        } ) }/>
                    <button type='submit'>Enviar</button>
                </form>
            </div>
        </div>
    )
}

export default Chat;