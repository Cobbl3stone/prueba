"use client";

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('Login');

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password: pass,
    })

    if (res?.error) {
      setError("Login error")
      return
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
        <h1 className="titulo sedan-sc-regular">{t('login_title')}</h1>

        <p className="descripcion">
         {t('login_description')}
        </p>

        <form className="formulario" onSubmit={handleSubmit}>
          <label className="label sedan-sc-regular">{t('email_label')}</label>
          <input
            type="email"
            placeholder={t('email_placeholder')}
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label sedan-sc-regular">{t('password_label')}</label>
          <input
            type="password"
            placeholder={t('password_placeholder')}
            className="input"
            value={pass}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="boton sedan-sc-regular">
           {t('login_button')}
          </button>

          <p className="registro">
            {t('register_question')} <a href="registro/">{t('register_link')}</a> {t('login_close')}
          </p>
        </form>
      </div>
    </div>
  );
}
