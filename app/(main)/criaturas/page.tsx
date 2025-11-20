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
            <a href="criaturas/" className="boton mark sedan-sc-regular">
              Mis criaturas
            </a>
             <a href="perfil/" className="boton sedan-sc-regular">
              Mi perfil
            </a>
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
            placeholder="Radaget el jardinero"
            className="input"
            disabled
          />

          <label className="label sedan-sc-regular">Correo mágico</label>
          <input
            type="email"
            placeholder="radjar@santuario.com"
            className="input"
            disabled
          />

          <label className="label sedan-sc-regular">Rol</label>
          <select className="input rol" disabled defaultValue="">
            <option value="" selected hidden>(Tu rol)</option>
            <option value="maestro">Maestro</option>
            <option value="cuidador">Cuidador</option>
          </select>

          <label className="label sedan-sc-regular">Descripción</label>
          <p className="input desc" >
          Soy un guardian del bosque y protector de criaturas mágicas. Soy un tanto
          excentrico, dedico mi vida a cuidar de una vasta variedad de seres fantásticos, desde
          majestuosos dragones hasta diminutas hadas. Poseo un vasto conocimiento de las 
          artes curativas y la magia antigua, lo que me permite sanar y proteger a las criaturas
          que encuentro en mis viajes.
          Tambien me pasa a veces que Lorem ipsum dolor sit amet consectetur, adipisicing elit. Illo quo doloremque
          </p>
        </form>
      </div>
    </div>
  );
}