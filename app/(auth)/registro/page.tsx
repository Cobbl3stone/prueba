import Image from "next/image";

export default function Home() {
  return (
    <div className="container">
      {/* Izquierda || Imagen */}
      <div className="image register-image">
        <Image
          src="/reg.png"
          alt="Criatura mágica"
          fill
          priority
          className="image-cover"
        />
      </div>

      {/* Derecha || Formulario */}
      <div className="form">
        <h1 className="titulo sedan-sc-regular">Únete al santuario</h1>

        <p className="descripcion">
          Elige si serás un cuidador o maestro de criaturas.
          Completa los detalles para empezar
        </p>

        <form className="formulario">

          <label className="label sedan-sc-regular">Nombre mágico</label>
          <input
            type="text"
            placeholder="Introduce tu nombre mágico"
            className="input"
          />

          <label className="label sedan-sc-regular">Correo mágico</label>
          <input
            type="email"
            placeholder="tunombre@santuario.com"
            className="input"
          />
          
          <label className="label sedan-sc-regular">Rol</label>
          <select className="input rol">
            <option value="maestro">Maestro</option>
            <option value="cuidador">Cuidador</option>
          </select>

          <label className="label sedan-sc-regular">Palabra mágica</label>
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            className="input"
          />

          <button type="submit" className="boton sedan-sc-regular">
            Registrarme en el santuario
          </button>
           <p className="registro">
          ¿Tienes cuenta? <a href="login/">Inicia sesión</a> en el refugio
          </p>
        </form>
      </div>
    </div>
  );
}