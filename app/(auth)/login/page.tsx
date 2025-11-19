import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      {/* Izquierda || Imagen */}
      <div className="image login-image">
        <Image
          src="/login.png"
          alt="Criatura mágica"
          fill
          priority
          className="image-cover"
        />
      </div>

      {/* Derecha || Formulario */}
      <div className="form">
        <h1 className="titulo sedan-sc-regular">Inicia sesión</h1>

        <p className="descripcion">
          Para acceder a la colección de criaturas mágicas. Sólo los maestros y
          los cuidadores reconocidos pueden entrar
        </p>

        <form className="formulario">
          <label className="label sedan-sc-regular">Correo mágico</label>
          <input
            type="email"
            placeholder="tunombre@santuario.com"
            className="input"
          />

          <label className="label sedan-sc-regular">Palabra mágica</label>
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            className="input"
          />

          <button type="submit" className="boton sedan-sc-regular">
            Acceder al santuario
          </button>
          <p className="registro">
          ¿No tienes cuenta? <a href="registro/">Regístrate</a> como maestro o cuidador
          </p>
        </form>
      </div>
    </div>
  );
}