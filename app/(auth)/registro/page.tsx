"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rol, setRol] = useState("maestro");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, rol, pass }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    // Registro correcto → enviar a login
    router.push("login/");
  };

  return (
    <div className="container">
      <div className="image register-image">
        <Image
          src="/reg.png"
          alt="Criatura mágica"
          fill
          priority
          className="image-cover"
        />
      </div>

      <div className="form">
        <h1 className="titulo sedan-sc-regular">Únete al santuario</h1>

        <p className="descripcion">
          Elige si serás un cuidador o maestro de criaturas.
          Completa los detalles para empezar
        </p>

        <form className="formulario" onSubmit={handleSubmit}>

          <label className="label sedan-sc-regular">Nombre mágico</label>
          <input
            type="text"
            placeholder="Introduce tu nombre mágico"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label sedan-sc-regular">Correo mágico</label>
          <input
            type="email"
            placeholder="tunombre@santuario.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label sedan-sc-regular">Rol</label>
          <select
            className="input rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="maestro">Maestro</option>
            <option value="cuidador">Cuidador</option>
          </select>

          <label className="label sedan-sc-regular">Palabra mágica</label>
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            className="input"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

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
