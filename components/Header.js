import React, {useContext, useEffect, useReducer} from 'react';
import Link from "next/link";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import {useRouter} from "next/router"


  

const Header = () => {
  const router = useRouter();
    
    // Extraer el usuario autenticado del storage
    const AuthContext = useContext(authContext);
    const { usuarioAutenticado, usuario, cerrarSesion } = AuthContext;

    //context de la aplicacion
    const AppContext = useContext(appContext);
    const {limpiarState} = AppContext;

    useEffect(() => {
        usuarioAutenticado()
    }, []);

    const redireccionar = () => {
      router.push("/")
      limpiarState();
    }
    
  return (
    <nav className="navbar">
      <a className="navbar-brand" href="/">
        <img
          onClick={() => redireccionar()}
          src="https://promocionmusical.es/wp-content/uploads/2018/10/enviar-archivos-pesados-herramientas-gratuitas-para-enviar-archivos.png" alt="" width="50" height="34" className="d-inline-block align-top" />
              Tus Enlaces
            </a>
      {
        usuario ? (
          <>
            <div className="alert alert-primary" role="alert">
              <strong>Usuario Conectado:</strong>  {usuario.nombre}
            </div>
            <button type="buttonn" className="btn" onClick={() => cerrarSesion()}><a href="/" className="btn ">Cerrar Sesión</a></button>
          </>
        ) : (
            <>
              <form className="d-flex">
                <Link href="/login"><button className="btn  my-2 my-sm-0 " type="submit"><a href="#" className="btn ">Iniciar Sesión</a></button></Link>
                <Link href="/crearCuenta"><button className="btn my-2 my-sm-0" type="submit"><a href="#" className="btn ">Crear Cuenta</a></button></Link>
              </form>

            </>
          )
      }
    </nav>

  );
}
 
export default Header;