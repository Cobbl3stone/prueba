import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {getTranslations} from 'next-intl/server';

export default async function Home() {
  const session = await getServerSession(authOptions);

  const t = await getTranslations('Profile');

  if (!session || !session.user) {
    redirect("login/");
  }

  // ahora session.user existe (guard)
  const user = session.user as {
    name?: string;
    email?: string;
    rol?: string;
    descripcion?: string;
  };

  return (
    <div className="container">
      <div className="image profile-image">
        <Image
          src={user.rol === "cuidador" ? "/caretaker.png" : "/master.png"}
          alt={user.rol ? t("role_caretaker") : t("role_master")}
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