import React, {useContext, useEffect, useState} from 'react';
import Layout from "../../components/Layout"
import clienteAxios from '../../config/axios';
import Alerta from "../../components/Alerta";
import Header from "../../components/Header";
import appContext from "../../context/app/appContext";

export async function getServerSideProps({params}) {
    const { enlace } = params;
    // console.log(enlace)
   const resultado = await clienteAxios.get(`/api/enlaces/${enlace}`);
        console.log(resultado);

    return {
        props: {
            enlace: resultado.data
        }
    }
}

export async function getServerSidePaths() {
    const enlaces = await clienteAxios.get('/api/enlaces');
    return {
        paths: enlaces.data.enlaces.map( enlace => ( {
            params: { enlace : enlace.url }
        })),
        fallback: false
    }
}


export default ({enlace}) => {

    // Context de la app
    const AppContext = useContext(appContext);
    const {  mostrarAlerta, mensaje_archivo, url } = AppContext;
    
    const [ tienePassword, setTienePassword ] = useState(enlace.password);
    const [ password, setPassword ] = useState('');
    console.log(tienePassword)

    //console.log(enlace);

    const verificarPassword = async e => {
        e.preventDefault();

        const data = {password}
        try {
            const resultado = await clienteAxios.post(`/api/enlaces/${enlace.enlace}`, data);
            //console.log(resultado.data.password)
            setTienePassword(resultado.data.password);
        } catch (error) {
            mostrarAlerta(error.response.data.msg);
        }
    }

    return (
        <Layout>
            <Header />
            {tienePassword ? (
                <>
                    <div className="container">
                        <body className="text-center">
                            {mensaje_archivo && <Alerta />}
                            <form onSubmit={e => verificarPassword(e)} className="form-signin">
                                <img className="mb-4" src="https://image.flaticon.com/icons/png/512/2058/2058182.png" alt="" width="72" height="72" />
                                <h1 className="h3 mb-3 font-weight-normal">Este enlace está Protegido</h1>
                                <label htmlFor="inputPassword" className="sr-only">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className="form-control autoFocus"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                />
                                <button className="btn btn-lg btn-primary btn-block" value="Validar Password" type="submit">Validar Contraseña</button>

                            </form>
                        </body>
                    </div>
                </>

            ) : (
                    <>
                        <div className="container">
                            <div className="card text-center" >
                                <span></span>
                                <div className="card-body">
                                    <h5 className="card-title mt-3 mt-3">Descarga Tu Archivo</h5>
                                    <a
                                        href={`${process.env.backendURL}/api/archivos/${enlace.archivo}`}
                                        className="btn btn-lg mt-4"
                                        download
                                    >Descargar</a>
                                </div>
                            </div>
                        </div>
                    </>
                )}

        </Layout>
    )
}