import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "./Alert";
import { ProtectedRoute } from "./ProtectedRouter";
import logoGoogle from '../assets/img/logo-google.png'
import '../assets/css/login.css'

export function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const { login, loginWithGoogle, resetPassword } = useAuth();
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Iniciar sesion
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(user.email, user.password);
            navigate("/");
            console.log('LISTO')
        } catch (error) {
            setError('Error al iniciar sesion. Intenta nuevamente.');
        }
    };

    const handleChange = ({ target: { value, name } }) =>
        setUser({ ...user, [name]: value });

    // Iniciar sesion con Google
    const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle();
            navigate("/");
        } catch (error) {
            setError('Error al iniciar sesion. Intenta nuevamente.');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (!user.email) return setError("Ingresa tu email y luego click en Recuperar.");
        try {
            await resetPassword(user.email);
            setError('Verifica tu correo y segui las instrucciones.')
        } catch (error) {
            setError('Por favor Ingresa un email valido.');
        }
    };

    return (
        <div className="container__login">  
            <h2>El Mirador Salon de Te</h2>

            {error && <Alert message={error} />}

            <form className="form text-center" onSubmit={handleSubmit}>
                <div className="form__email d-flex justify-space-between">
                    <label className="" htmlFor="email"><i className="bi bi-people-fill"></i> Email</label>
                    <input type="email" name="email" id="email" onChange={handleChange} required placeholder="salon.de.te@gmail.com" />
                </div>

                <div className="form__password d-flex justify-space-between">
                    <label className="" htmlFor="password"><i className="bi bi-shield-lock"></i> Password</label>
                    <input type="password" name="password" id="password" onChange={handleChange} placeholder="*************" />
                </div>

                <div className="form__iniciarSesion text-center">
                    <button className="btn btn-outline-primary text-white" type="submit">Iniciar Sesion</button>
                </div>

                <div>
                    <a className="links-form" href="#!" onClick={handleResetPassword}>Olvidaste la Contraseña? <span className="span">Recuperar</span></a>
                </div>
            </form>

            <div className="text-center mt-3 form__iniciarConGoogle">
                <button className="btn btn-primary mt-2 mb-3" onClick={handleGoogleSignin}><img className="logo-google" src={logoGoogle} alt="" /> Iniciar con Google</button>
                <p>Aun no soy cliente. <Link to="/register"><span className="span links-form">Registrarme</span></Link></p>
            </div>
        </div>
    );
}
