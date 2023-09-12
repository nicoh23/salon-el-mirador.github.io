export function Alert({ message }) {
    return (
      <div role="alert">
        <span className="mensajeError">{message}</span>
      </div>
    );
  }
  