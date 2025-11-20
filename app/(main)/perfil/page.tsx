import Image from "next/image";
import { requireUser } from "@/app/api/auth/route";

export default async function Home() {
  const user = await requireUser();

  return (
    <div className="container">
      {/* Izquierda || Imagen */}
      <div className="image profile-image">
        if ({user.rol} == "Cuidador") {
          <Image
          src="/caretaker.png"
          alt="Cuidador"
          fill
          priority
          className="image-cover"
          />
        } else {
          <Image
          src="/master.png"
          alt="Maestro"
          fill
          priority
          className="image-cover"
        />
        }
      </div>

      {/* Derecha || Formulario */}
      <div className="form">
        <div className="menu">
          <h1 className="titulo sedan-sc-regular">El santuario</h1>
          <div className="menu-options">
            <a href="criaturas/" className="boton sedan-sc-regular">
              Mis criaturas
            </a>
            <button className="boton mark sedan-sc-regular">
              Mi perfil
            </button>
            <button type="submit" className="boton sedan-sc-regular">
              Cerrar sesión
            </button>
          </div>
        </div>
        <h2 className="titulo sub sedan-sc-regular">Mi perfil</h2>

        <p className="descripcion">
          Este es el lugar donde podrás gesitionar, actualizar y personalizar la información de tu perfil.
        </p>

        <form className="formulario perfl">
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
        </form>
      </div>
    </div>
  );
}