// app/api/register/route.ts
import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { query } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const { name, email, rol, pass } = await req.json();

    if (!name || !email || !rol || !pass) {
      return NextResponse.json({ error: "Faltan campos" }, { status: 400 });
    }

    const hashed = await hash(pass, 10);

    await query(
      "INSERT INTO user (name, pass, email, rol) VALUES (?, ?, ?, ?)",
      [name, hashed, email, rol]
    );

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err: any) {
    if (err?.code === "ER_DUP_ENTRY") {
      return NextResponse.json({ error: "Email ya registrado" }, { status: 409 });
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
