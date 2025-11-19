import { NextResponse } from "next/server";
import db from "@/lib/db";

// Mapa de errores: código -> { mensaje, status }
const ERRORS = {
  USER_NOT_FOUND: { message: "Usuario no encontrado", status: 404 },
  INVALID_PASSWORD: { message: "Contraseña incorrecta", status: 401 },
  INTERNAL_ERROR: { message: "Error interno", status: 500 },
};

export async function POST(req: Request) {
  try {
    const { email, pass } = await req.json();

    // Buscar usuario solo por email
    const [rows]: any = await db.query(
      "SELECT * FROM user WHERE email = ? LIMIT 1",
      [email]
    );

    // Validar si usuario existe
    let errorCode: keyof typeof ERRORS | null = null;

    if (rows.length === 0) {
      errorCode = "USER_NOT_FOUND";
    } else {
      const user = rows[0];
      // Validar contraseña
      if (user.pass !== pass) {
        errorCode = "INVALID_PASSWORD";
      }
    }

    // Devolver error si existe
    if (errorCode) {
      const error = ERRORS[errorCode];
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    // Login exitoso
    const user = rows[0];
    return NextResponse.json({
      message: "Login correcto",
      user: { id: user.id, name: user.name, email: user.email }
    });
    
  } catch (err) {
    console.error(err);
    const error = ERRORS.INTERNAL_ERROR;
    return NextResponse.json({ error: error.message }, { status: error.status });
  }
}

