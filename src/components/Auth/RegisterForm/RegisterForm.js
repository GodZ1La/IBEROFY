import React, { useState } from "react";
import { Form, Icon } from "semantic-ui-react";
import { useFormik } from "formik";
import { Auth } from "../../../api";
import { initialValues, validationSchema } from "./RegisterForm.data";
import "./RegisterForm.scss";

// Importa los módulos necesarios para la autenticación de Google desde el SDK de Firebase
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const auth = new Auth();
const googleProvider = new GoogleAuthProvider();

export function RegisterForm(props) {
  const { openLogin, goBack } = props;
  const [showPassword, setShowPassword] = useState(false);

  const onShowHidenPassword = () => setShowPassword((prevState) => !prevState);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValues) => {
      try {
        await auth.register(formValues.email, formValues.password);
      } catch (error) {
        console.error(error);
      }
    },
  });

  const signInWithGoogle = async () => {
    const authInstance = getAuth(); // Obtiene la instancia de autenticación de Firebase

    signInWithPopup(authInstance, googleProvider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log(user)
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
  };

  return (
    <div className="register-form">
      <h1>Empieza a escuchar con una cuenta de IBERO Music gratis</h1>

      <Form onSubmit={formik.handleSubmit}>
        <Form.Input
          name="email"
          type="text"
          placeholder="Correo electrónico"
          icon="mail outline"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        />
        <Form.Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Contraseña"
          icon={
            <Icon
              name={showPassword ? "eye slash" : "eye"}
              link
              onClick={onShowHidenPassword}
            />
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          error={formik.touched.password && formik.errors.password}
        />
        <Form.Input
          name="username"
          type="text"
          placeholder="¿Cómo deberíamos llamarte?"
          icon="user circle outline"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          error={formik.touched.username && formik.errors.username}
        />

        <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
          Continuar
        </Form.Button>

        {/* Agrega el botón para iniciar sesión con Google */}
        <Form.Button
          type="button"
          onClick={signInWithGoogle}
          primary
          fluid
          loading={formik.isSubmitting}
        >
          Continuar con Google
        </Form.Button>
      </Form>

      <div className="register-form__options">
        <p onClick={goBack}>Volver</p>
        <p>
          ¿Ya tienes IBERO Music? <span onClick={openLogin}>Iniciar sesión</span>
        </p>
      </div>
    </div>
  );
}
