import {NextAuthOptions} from "next-auth"
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions ={
    // secret: "2D4A614E645267556B58703273357638792F423F4428472B4B6250655368566D",
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        // Choose how you want to save the user session.
        // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
        // If you use an `adapter` however, we default it to `"database"` instead.
        // You can still force a JWT session by explicitly defining `"jwt"`.
        // When using `"database"`, the session cookie will only contain a `sessionToken` value,
        // which is used to look up the session in the database.
        strategy: "jwt",

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours

        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            // `credentials` is used to generate a form on the sign in page.
            // You can specify which fields should be submitted, by adding keys to the `credentials` object.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Add logic here to look up the user from the credentials supplied
                const res = await fetch("http://localhost:8080/api/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: credentials?.username,
                        password: credentials?.password
                    })
                });
                if (!res.ok) {
                    console.log("Failed to fetch data");
                }
                if (res.status == 403) {
                    console.log("Invalid userame or password");
                    return;
                }

                const response = await res.json();

                return response.user;
            }
        })
    ]
    , callbacks: {
        async jwt({token, user}) {
            // Add access_token to the token right after signin
            return { ...token, ...user };
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            //@ts-ignore
            session.user = token;
            session.accessToken = token.accessToken as string;
            return session;
        }
    }
}

export default NextAuth(authOptions)