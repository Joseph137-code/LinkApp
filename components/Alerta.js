import React, {useContext} from 'react';
import authContext from "../context/auth/authContext";
import appContext from "../context/app/appContext";


const Alerta = () => {
    const AuthContext = useContext(authContext);
    const { mensaje } = AuthContext;

    // Extraer el mensaje de error
    const AppContext = useContext(appContext);
    const {mensaje_archivo} = AppContext;
    return (
        <div className="alert alert-dark" role="alert">
            <h4 className="alert-heading">Mensaje:</h4>
            <strong>{mensaje || mensaje_archivo}</strong>
            <hr/>
        </div>
    );
}


export default Alerta;
