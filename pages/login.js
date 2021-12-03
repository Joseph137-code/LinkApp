import React, {useContext, useEffect} from 'react';
import Layout from "../components/Layout"
import Header from "../components/Header";
import {useFormik} from "formik";
import * as Yup from 'yup';
import authContext from "../context/auth/authContext";
import Alerta from '../components/Alerta';
import {useRouter} from "next/router";



const Login = () => {
  // Acceder al state
   const AuthContext = useContext(authContext);
   const { autenticado, mensaje, iniciarSesion} = AuthContext;

  // next router
  const router = useRouter();
  useEffect(() => {
    if(autenticado){
      router.push("/")
    }
  }, [autenticado])

  // Formulario y validación con formik y Yup
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
        email: Yup.string()
                  .email('El email no es válido')
                  .required('El Email es Obligatorio'),
        password: Yup.string()
                  .required('Ingrese su contraseña')
                  .min(6, 'El password debe contener al menos 6 caracteres')
    }),
    onSubmit: valores => {
      iniciarSesion(valores)
    }
});
  return (
    <Layout>
      <Header />
        <div className="container" >
          <div className="card text-center" >
            <span></span>
            <div className="card-body">
              <h5 className="card-title">Login</h5>
              <hr className="mt-3" />
              <form onSubmit={formik.handleSubmit} className="form-signin">
                <img className="" src="https://borlabs.io/wp-content/uploads/2019/09/blog-wp-login.png" alt="" width="280" height="90" />

              {mensaje && <Alerta />}
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
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
              <p className="mt-5 mb-3 text-muted">&copy; 2020-2021</p>
            </form>
            </div>
          </div>
        </div>
    </Layout>
  );
}
 
export default Login;