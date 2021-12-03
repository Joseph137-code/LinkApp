import React, {useContext, useEffect} from 'react';
import Layout from "../components/Layout"
import Alerta from "../components/Alerta";
import Dropzone from "../components/Dropzone"
import Header from "../components/Header";
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";
import Link from "next/link";


const Index = () => {
  // Extraer el usuario autenticado del storage
  const AuthContext = useContext(authContext);
  const {usuarioAutenticado,  autenticado} = AuthContext;

  // Extraer el mensaje de error
  const AppContext = useContext(appContext);
  const {mensaje_archivo, url} = AppContext;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      usuarioAutenticado()
    }
    //usuarioAutenticado()
  }, []);

  return (
    <Layout>
      <Header />
      <div className="container" >
      {url ? (
        <div className="card text-center" >
            <span></span>
            <div className="card-body">
              <h5 className="card-title mt-4">tu Url es:</h5>
              <hr className="mt-3"/>
              <p className="mt-4">{`${process.env.frontendURL}enlaces/${url}`}</p>
              <hr className="mt-3"/>
              <Link href=""><a href="#!" className="btn " onClick= {()=> navigator.clipboard.writeText(`${process.env.frontendURL}/enlaces/${url}`) }>Copiar Enlace</a></Link>
            </div>
        </div>

      ): (
        <>
        {mensaje_archivo && <Alerta />}
            <div className="card text-center">
              <span></span>
              <div className="card-body">
                <h5 className="card-title">Comparte tus Archivos de forma Sencilla y Privada!</h5>
                <p className="card-text">La Aplicación te permite compartir archivos con cifrado de extremo a extremo y un archivo que es eliminado después de ser descargado. Así que puedes mantener lo que compartes en privado y que no permanezcan en linea por siempre.</p>
                <hr/>
                <p>Crea tu Cuenta para Mayores Beneficios!</p>
                <Link href="/crearCuenta"><a href="#" className="btn ">Crear Cuenta</a></Link>
              </div>
            </div>

          <div className="card text-center" >
            <span></span>
            <div className="card-body">
            <h5 className="card-title">Dropzone Aqui!!!</h5>
            <p className="card-text">Selecciona un Archivo y arrastralo Aquí</p>
            <Dropzone />
              
            </div>
          </div>
        </>
      )}
      </div>
      
    </Layout>
  );
}
 
export default Index;