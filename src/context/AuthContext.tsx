import * as SecureStore from 'expo-secure-store'
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface User{
    id: number;
    name: string;
    email: string;
    profissao?: string;
    image?: string;
}

interface AuthProps{
    loggedState?:{user: User};
    authState?: {token: string | null; authenticated: boolean | null, user: User | null};
    onRegister?: (name: string, email: string, password: string, profissao: string, image?: string) => Promise<any>;
    onLogin?: (email: string, password: string ) => Promise<any>;
    onLogout?: () => Promise<any>;
}

const TOKEN_KEY = 'my-jwt'
export const API_URL = 'http://192.168.15.6:3001'
const AuthContext = createContext<AuthProps>({})

export const useAuth = () =>{
    return useContext(AuthContext)
}
export const AuthProvider = ({children}: any) =>{
    const [authState, setAuthState] = useState<{
        user: User | null;
        token: string | null;
        authenticated: boolean | null;
    }>({user: null, token: null, authenticated: null})

    useEffect(() =>{
        const loadToken = async ()=>{
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            if(token){
                if(token){
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                    const userResponse = await axios.get(`${API_URL}/profile`)
                    const userLogged = userResponse.data;
                    console.log('usuario logado: ', userLogged)
                    setAuthState({
                        user: userLogged,
                        token: token,
                        authenticated: true
                    })
                }
            }
        }
        loadToken()
    },[])
    const onProfile = async () =>{
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const userResponse = await axios.get(`${API_URL}/profile`)
            const userLogged = userResponse.data;
            console.log('usuario logado: ', userLogged)
            setAuthState({
                user: userLogged,
                token: token,
                authenticated: true
            })
        }
    }
    const register = async(name: string, email:string, password: string, profissao: string,) =>{
        try{
            return await axios.post(`${API_URL}/user`, {name, email, password, profissao})
        }catch(e){
            return{error: true, msg: (e as any).response.data.msg}
        }
    }

    const login = async(email:string, password: string) =>{
        try {
            const result = await axios.post(`${API_URL}/login`, { email, password });
            if (result && result.data && result.data.token) {
              setAuthState({
                user: result.data.user,
                token: result.data.token,
                authenticated: true,
              });
        
              axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;
        
              await SecureStore.setItemAsync(TOKEN_KEY, result.data.token,);
        
              return result;
            } else {
              console.error('Resposta inválida:', result);
              return { error: true, msg: 'Resposta inválida do servidor' };
            }
          } catch (e: any) {
              console.error('Erro na resposta do servidor:', e.response.data);
              return { error: true, msg: e.response.data.msg || 'Erro na resposta do servidor' };
          }
    }
    const logout = async () =>{
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        axios.defaults.headers.common['Authorization'] = ''
        setAuthState({
            user: null,
            token: null,
            authenticated: false
        })
    }

    const value = {
        onRegister: register,
        onLogin: login,
        onLogout: logout,
        authState
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}