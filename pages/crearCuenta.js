import React, {useContext} from 'react';
import Layout from "../components/Layout"
import Header from "../components/Header";
import {useFormik} from "formik";
import * as Yup from 'yup';
import authContext from "../context/auth/authContext";
import Alerta from '../components/Alerta';
import Link from "next/link";




const CrearCuenta = () => {

     // Acceder al state
  const AuthContext = useContext(authContext);
  const { mensaje, registrarUsuario } = AuthContext;

  // Formulario y validación con formik y Yup
  const formik = useFormik({
      initialValues: {
        nombre: '',
        email: '',
        password: ''
      },
      validationSchema: Yup.object({
          nombre: Yup.string()
                    .required('El Nombre es Obligatorio'),
          email: Yup.string()
                    .email('El email no es válido')
                    .required('El Email es Obligatorio'),
          password: Yup.string()
                    .required('Ingrese su contraseña')
                    .min(6, 'El password debe contener al menos 6 caracteres')
      }),
      onSubmit: valores => {
          registrarUsuario(valores)
      }
  });
    
    return (
        <Layout>
            <Header />
            <div className="container" >
                <div className="card text-center" >
                    <span></span>
                    <div className="card-body">
                        <h5 className="card-title mt-4 ">Crear Cuenta</h5>
                        <hr className="mt-1" />
                        <form onSubmit={formik.handleSubmit} className="form-signin">
                        <img className="mb-2" src="https://aksharachits.com/home/assets/images/login_img.png" alt="" width="130" height="70" />
                            {mensaje && <Alerta />}
                            {formik.touched.nombre && formik.errors.nombre ? (
                                <div className="alert alert-danger" role="alert">
                                    <h4 className="alert-heading">Error!</h4>
                                    <p>{formik.errors.nombre} </p>
                                </div>
                            ) : null}
                            <label htmlFor="inputEmail" className="sr-only">Nombre</label>
                            <input
                                type="text"
                                id="nombre"
                                className="form-control"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Nombre del usuario" required autofocus />
                            {formik.touched.email && formik.errors.email ? (
                                <div className="alert alert-danger" role="alert">
                                    <h4 className="alert-heading">Error!</h4>
                                    <p>{formik.errors.email} </p>
                                </div>
                            ) : null}
                            <label htmlFor="inputEmail" className="sr-only">Email address</label>
                            <input
                                type="email"
                                id="email"
                                className="form-control"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Email address" required autofocus />

                            {formik.touched.password && formik.errors.password ? (
                                <div className="alert alert-danger" role="alert">
                                    <h4 className="alert-heading">Error!</h4>
                                    <p>{formik.errors.password} </p>
                                </div>
                            ) : null}
                            <label htmlFor="inputPassword" className="sr-only">Password</label>
                            <input
                                type="password"
                                id="password"
                                className="form-control"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Password" required />
                            <button className="btn btn-lg btn-primary btn-block mt-3" type="submit">Registrame</button>
                            <p className="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
 
export default CrearCuenta;