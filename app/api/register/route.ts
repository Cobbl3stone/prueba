import { NextResponse } from "next/server";
import db from "@/lib/db";

const ERRORS = {
  USERNAME_EXISTS: { message: "El nombre de usuario ya está en uso", status: 400 },
  EMAIL_EXISTS: { message: "El correo ya está registrado", status: 400 },
  INTERNAL_ERROR: { message: "Error interno", status: 500 },
};

export async function POST(req: Request) {
  try {
    const { name, email, rol, pass } = await req.json();

    // Comprobar si ya existe el nombre de usuario
    const [nameRows]: any = await db.query(
      "SELECT id FROM user WHERE name = ? LIMIT 1",
      [name]
    );

    if (nameRows.length > 0) {
      const err = ERRORS.USERNAME_EXISTS;
      return NextResponse.json({ error: err.message }, { status: err.status });
    }

    // Comprobar si ya existe el email
    const [emailRows]: any = await db.query(
      "SELECT id FROM user WHERE email = ? LIMIT 1",
      [email]
    );

    if (emailRows.length > 0) {
      const err = ERRORS.EMAIL_EXISTS;
      return NextResponse.json({ error: err.message }, { status: err.status });
    }

    //Insertar usuario
    await db.query(
      "INSERT INTO user (name, email, rol, pass) VALUES (?, ?, ?, ?)",
      [name, email, rol, pass]
    );

    return NextResponse.json({ message: "Registro exitoso" });

  } catch (err) {
    console.error(err);
    const error = ERRORS.INTERNAL_ERROR;
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
}
