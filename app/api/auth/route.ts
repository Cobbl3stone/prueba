import { cookies } from "next/headers";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function requireUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;

  if (!session) redirect("/login");

  const [rows]: any = await db.query(
    "SELECT id, name, email, rol, descripcion FROM user WHERE id = ? LIMIT 1",
    [session]
  );

  if (!rows || rows.length === 0) redirect("/login");

  return rows[0];
}
