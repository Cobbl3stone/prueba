"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, pass }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    // Redirige tras login correcto
    router.push("perfil/");
  };

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

        <form className="formulario" onSubmit={handleSubmit}>
          <label className="label sedan-sc-regular">Correo mágico</label>
          <input
            type="email"
            placeholder="tunombre@santuario.com"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label sedan-sc-regular">Palabra mágica</label>
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            className="input"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="boton sedan-sc-regular">
            Acceder al santuario
          </button>

          <p className="registro">
            ¿No tienes cuenta? <a href="registro/">Regístrate</a> como maestro o cuidador.
          </p>
        </form>
      </div>
    </div>
  );
}
