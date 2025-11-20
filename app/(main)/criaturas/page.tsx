import Image from "next/image";
import { requireUser } from "@/app/api/auth/route";

export default async function Home() {
  const user = await requireUser();

  return (
    <div className="container">
      {/* Izquierda || Imagen */}
      <div className="image profile-image">
        <Image
          src={user.rol === "Cuidador" ? "/caretaker.png" : "/master.png"}
          alt={user.rol}
          fill
          priority
          className="image-cover"
        />
      </div>

      {/* Derecha || Formulario */}
      <div className="form">
        <div className="menu">
          <h1 className="titulo sedan-sc-regular">El santuario</h1>
          <div className="menu-options">
            <a className="boton mark sedan-sc-regular">
              Mis criaturas
            </a>
            <a href="perfil/" className="boton sedan-sc-regular">
              Mi perfil
            </a>
            <form action="/api/logout" method="post" style={{ display: "inline" }}>
              <button type="submit" className="boton sedan-sc-regular">
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
        <h2 className="titulo sub sedan-sc-regular">Mis criaturas</h2>

        <p className="descripcion">
          Explora y gestiona todas las criaturas mágicas que has recolectado. Cada una tiene habilidades Únicas y características especiales
        </p>

        {/* <form className="formulario perfl">
          <label className="label sedan-sc-regular">Nombre mágico</label>
          <input
            type="text"
            value={user.name}
            className="input"
            disabled
          />

          <label className="label sedan-sc-regular">Correo mágico</label>
          <input
            type="email"
            value={user.email}
            className="input"
            disabled
          />

          <label className="label sedan-sc-regular">Rol</label>
          <select className="input rol" disabled defaultValue="">
            <option value="" selected hidden>{user.rol}</option>
            <option value="maestro">Maestro</option>
            <option value="cuidador">Cuidador</option>
          </select>

          <label className="label sedan-sc-regular">Descripción</label>
          <p className="input desc" >{user.descripcion || "Sin descripción."}</p>
        </form> */}
      </div>
    </div>
  );
}