import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Home() {
  const { logout, user } = useAuth();
  const arrobaIndex = user.email.indexOf('@')
  const nombreEmail = user.email.substring(0, arrobaIndex)

  console.log(user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Redirigir a Reservas
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     setError("");
  //     try {
  //         await signup(user.email, user.password);
  //         navigate("/");
  //     } catch (error) {
  //         if(error.message == 'Firebase: Password should be at least 6 characters (auth/weak-password).'){
  //             setError('La contraseña debe tener al menos 6 caracteres.');
  //         }else if (error.message == 'Firebase: Error (auth/email-already-in-use).'){
  //             setError('Este email ya se encuentra registrado.')
  //         }
  //         console.log(error.message)
  //     }
  // };

  return (
    <div className="seccion-home">
      <nav className="navbar navbar-expand-lg bg-body-tertiary p-3" id="menu">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"><span className="text-primary fw-bold">Bienvenid@ {user.displayName || nombreEmail}</span></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item me-3"><Link to="/reservas">Reservas</Link></li>  {/* link a Seccion de Reserva de mesas */}
              <li className="nav-item me-3"><Link to="/">Promociones</Link></li>
              <li className="nav-item me-3"><Link to="/">Pedidos</Link></li>
              <li className="nav-item me-3"><Link to="/">Rendimiento</Link></li>
              {/* <li className="nav-item"><a className="nav-link active" aria-current="page" href="#">Gestion</a></li> */}
            </ul>
          </div>
        </div>

        <div>
          <button className="btn btn-outline-primary" handleLogout={handleLogout} onClick={handleLogout}>Logout</button>
        </div>
      </nav>
    </div>
  );
}
