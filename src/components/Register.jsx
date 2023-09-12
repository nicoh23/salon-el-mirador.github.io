import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Alert } from "./Alert";

export function Register() {
    const { signup } = useAuth();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signup(user.email, user.password);
            navigate("/");
        } catch (error) {
            if (error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
                setError('La contraseña debe tener al menos 6 caracteres.');
            } else if (error.message == 'Firebase: Error (auth/email-already-in-use).') {
                setError('Este email ya se encuentra registrado.')
            }
            console.log(error.message)
        }
    };

    return (
        <div className="container__register text-center">
            <h2>El Mirador Salon de Te</h2>

            {error && <Alert message={error} />}

            <form onSubmit={handleSubmit} className="form text-center">
                <div className="form__email d-flex justify-space-between">
                    <label htmlFor="email"><i className="bi bi-people-fill"></i> Email</label>
                    <input type="email" onChange={(e) => setUser({ ...user, email: e.target.value })} required placeholder="salon.de.te@gmail.com" />
                </div>

                <div className="form__password d-flex justify-space-between">
                    <label htmlFor="password"><i className="bi bi-shield-lock"></i> Password</label>
                    <input type="password" onChange={(e) => setUser({ ...user, password: e.target.value })} required placeholder="*************" />
                </div>

                <div>
                    <button className="btn btn-outline-primary text-white btn-registrar">Registrar</button>
                </div>
            </form>
            <p className="mt-4 mb-0">Ya tengo una cuenta.<Link to="/login"> <span className="span links-form">Iniciar Sesion</span></Link></p>
        </div>
    );
}
