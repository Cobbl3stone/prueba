"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('Register');

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
        <h1 className="titulo sedan-sc-regular">{t('register_title')}</h1>

        <p className="descripcion">
         {t('register_description')}
        </p>

        <form className="formulario" onSubmit={handleSubmit}>

          <label className="label sedan-sc-regular">{t('name_label')}</label>
          <input
            type="text"
            placeholder={t('name_placeholder')}
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className="label sedan-sc-regular">{t('email_label')}</label>
          <input
            type="email"
            placeholder={t('email_placeholder')}
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label sedan-sc-regular">{t('role_label')}</label>
          <select
            className="input rol"
            value={rol}
            onChange={(e) => setRol(e.target.value)}
          >
            <option value="maestro">{t('maestro')}</option>
            <option value="cuidador">{t('cuidador')}</option>
          </select>

          <label className="label sedan-sc-regular">{t('password_label')}</label>
          <input
            type="password"
            placeholder={t('password_placeholder')}
            className="input"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="boton sedan-sc-regular">
            {t('register_button')}
          </button>

          <p className="registro">
            {t('login_question')} <a href="login/">{t('login_link')}</a> {t('login_close')}
          </p>
        </form>
      </div>
    </div>
  );
}
