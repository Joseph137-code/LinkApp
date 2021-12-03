import React, {useReducer} from 'react';
import authContext from "./authContext";
import authReducer from "./authReducer";
import {    REGISTRO_EXITOSO, 
            REGISTRO_ERROR, 
            LIMPIAR_ALERTA, 
            LOGIN_EXITOSO,
            LOGIN_ERROR,
            USUARIO_AUTENTICADO,
            CERRAR_SESION
        } from "../../types/index"
import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = ({ children }) => {
    // Definir un state inicial
    const initialState = {
        token: typeof window !== 'undefined' ? localStorage.getItem('token') : '',
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: null
    }

    // Definir el reducer
    const [state, dispatch] = useReducer(authReducer, initialState);

    //Registrar Nueevos usuarios
    const registrarUsuario = async datos =>{
        try {
            const respuesta = await clienteAxios.post(`/api/usuario`, datos)
            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data.message
            });
        } catch (error) {
            dispatch({
                type: REGISTRO_ERROR,
                payload: error.response.data.message
            });
        }
        //Limpiar la alerta
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 4000);
    }

    const iniciarSesion = async datos => {
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos);
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data.token
            })
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.msg
            })
        }
        // Limpia la alerta después de 3 segundos
        setTimeout(() => {
            dispatch({
                type: LIMPIAR_ALERTA
            })
        }, 3000);

    }

 // Retorne el Usuario autenticado en base al JWT
 const usuarioAutenticado = async () => {
     const token = localStorage.getItem("token");
     if (token){
         tokenAuth(token)
     }

     try {
        const respuesta = await clienteAxios.get("/api/auth");
        //console.log(respuesta.data.user)
        if(respuesta.data.user){
            dispatch({
                type: USUARIO_AUTENTICADO,
                payload: respuesta.data.user
            });
        }
        
     } catch (error) {
        dispatch({
            type: LOGIN_ERROR,
            payload: error.response.data.msg
        })
     }
    
}
    // Cerrar la sesión
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                usuarioAutenticado,
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
            >
            {children}
        </authContext.Provider>

    )
   

}

export default AuthState;