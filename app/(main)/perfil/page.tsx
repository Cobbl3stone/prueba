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

      <div className="form">
        <div className="menu">
          <h1 className="titulo sedan-sc-regular">{t("menu_title")}</h1>
          <div className="menu-options">
            <a href="criaturas/" className="boton sedan-sc-regular">
              {t("menu_my_creatures")}
            </a>
            <button className="boton mark sedan-sc-regular">{t("menu_my_profile")}</button>
            <form action="/api/auth/signout" method="post" style={{ display: "inline" }}>
              <button type="submit" className="boton sedan-sc-regular">{t("menu_logout")}</button>
            </form>
          </div>
        </div>

        <h2 className="titulo sub sedan-sc-regular">{t("profile_title")}</h2>
        <p className="descripcion">{t("profile_description")}</p>

        <form className="formulario perfl">
          <label className="label sedan-sc-regular">{t("name_label")}</label>
          <input type="text" value={user.name} className="input" disabled />

          <label className="label sedan-sc-regular">{t("email_label")}</label>
          <input type="email" value={user.email} className="input" disabled />

          <label className="label sedan-sc-regular">{t("role_label")}</label>
          <input type="text" value={user.rol} className="input" disabled />

          <label className="label sedan-sc-regular">{t("description_label")}</label>
          <p className="input desc">{user.descripcion || t("no_description")}</p>
        </form>
      </div>
    </div>
  );
}