import Image from "next/image";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

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
       {/* Izquierda || Imagen */}
      <div className="image profile-image">
        <Image
          src={user.rol === "cuidador" ? "/caretaker.png" : "/master.png"}
          alt={user.rol ? "Cuidador" : "Maestro"}
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
            <a href="criaturas/" className="boton sedan-sc-regular">
              Mis criaturas
            </a>
            <button className="boton mark sedan-sc-regular">
              Mi perfil
            </button>
            <form action="/api/auth/signout" method="post" style={{ display: "inline" }}>
              <button type="submit" className="boton sedan-sc-regular">Cerrar sesión</button>
            </form>
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
          <input
            type="text"
            value={user.rol}            
            className="input"
            disabled
          />

          <label className="label sedan-sc-regular">Descripción</label>
          <p className="input desc" >{user.descripcion || "Sin descripción."}</p>
        </form>
      </div>
    </div>
  );
}