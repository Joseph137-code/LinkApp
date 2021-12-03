import React, { useCallback, useContext } from 'react';
import { useDropzone } from "react-dropzone";
import clienteAxios from "../config/axios";
import appContext from "../context/app/appContext";
import authContext from "../context/auth/authContext";
import Formulario from "../components/Formulario";

const Dropzone = () => {
    // Context de la app
    const AppContext = useContext(appContext);
    const { cargando, mostrarAlerta, subirArchivo, crearEnlace } = AppContext;

    // context de autenticacion
    const AuthContext = useContext(authContext);
    const { usuario, autenticado } = AuthContext;


    const onDropRejected = () => {
        mostrarAlerta('No se pudo subir, el Limite es 1MB, obten una cuenta gratis para subir archivos más grandes');
    }

    const onDropAccepted = useCallback(async (acceptedFiles) => {
        // Crear un form Data
        const formData = new FormData();
        formData.append('archivo', acceptedFiles[0])
        subirArchivo(formData, acceptedFiles[0].path);
    }, []);

    const maxSize = autenticado ? 1000000000000 : 1000000;

    //Extraer Contenido de Dropzone
    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize });

    const archivos = acceptedFiles.map(archivo => (
        <div key={archivo.lastModified} classNameName=" border-primary rounded">
            <p classNameName=" lead font-bold text-xl ">{archivo.path}</p>
            <p classNameName="text-sm text-gray-500">{(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
        </div>
    ));




    return (
        <div className="text-center">
            <div className="blog-post">
                {acceptedFiles.length > 0 ? (
                    <div>
                        <p className="card-title">{archivos}</p>

                        {cargando ?
                            <div className="spinner-grow text-success" role="status">
                                <span className="sr-only">Loading...</span>
                            </div> : (
                                <button type="button" className="btn btn-success mt-3 " onClick={() => crearEnlace()}>Crear Enlace</button>
                            )}

                    </div>
                ) : (
                        <div {...getRootProps({ className: "dropzone" })}>
                            <input {...getInputProps()} />
                            {isDragActive ? <a  className="btn ">Suelta el Archivo</a> :
                                <div className="text-center">
                                    <hr/>
                                    <a  className="btn ">Seleccionar Archivo para Subir</a>
                                </div>
                            }
                        </div>
                    )}

            </div>
            {
                autenticado ? 
                    <div className="p-4 mt-3  rounded">
                        <h4 className="font-italic text-center">Eliminar luego de:</h4>
                        <Formulario />
                    </div>
        

                    : ""
            }

        </div>


    );
}

    export default Dropzone;