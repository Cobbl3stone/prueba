// app/api/auth/[...nextauth]/route.ts

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { query } from "@/lib/db";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const rows = await query(
          "SELECT id, name, pass, email, rol, descripcion FROM user WHERE email = ?",
          [credentials.email]
        );

        const user = Array.isArray(rows) && rows.length ? rows[0] : null;
        if (!user) return null;

        // comprobar contraseña encriptada
        const ok = await compare(credentials.password, user.pass).catch(() => false);

        // Si tu DB no está hasheada:
        // const ok = credentials.password === user.pass;

        if (!ok) return null;

        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
          rol: user.rol,
          descripcion: user.descripcion,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.rol = user.rol;
        token.descripcion = user.descripcion;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        rol: token.rol,
        descripcion: token.descripcion,
      };
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

// IMPORTANTE: export GET y POST
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
