import React, {useState, useContext} from 'react';
import appContext from "../context/app/appContext";

const Formulario = () => {
    // Context de la app
    const AppContext = useContext(appContext);
    const { agregarPassword, agregarDescargas } = AppContext;
    const [tienePassword, setTienePassword ]= useState(false);

    return (
        <div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Descargas</label>
                </div>
                <select 
                    onChange={ e => agregarDescargas( parseInt(e.target.value))}
                    className="custom-select" 
                >
                    <option selected>Selecciona...</option>
                    <option value="1">1 Descarga</option>
                    <option value="5">5 Descargas</option>
                    <option value="10">10 Descargas</option>
                    <option value="20">20 Descargas</option>
                </select>
            </div>
            <div className="form-check">
                <input 
                    className="form-check-input" 
                    type="checkbox" 
                    value="" 
                    id="flexCheckDefault"
                    onChange= {()=> setTienePassword(!tienePassword)}
                    />
                <label className="form-check-label" for="flexRadioDefault1">
                    Protege con Contraseña
                </label>
            </div>
            {tienePassword ? (
                <input 
                type="password" 
                onChange= {e => agregarPassword(e.target.value)}
                className="form-control" 
                placeholder="Password" required 
            />
            
               ): null}
               
        </div>
    );
}
 
export default Formulario;