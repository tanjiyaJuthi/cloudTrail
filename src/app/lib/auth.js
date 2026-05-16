import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { generateSlug } from "./helper/helper";
import { jwt } from "better-auth/plugins"

const client = new MongoClient(process.env.MONGO_URI);
const db = client.db('wanderlust');

const googleId = process.env.GOOGLE_CLIENT_ID;
const googleSecret = process.env.GOOGLE_CLIENT_SECRET;

export const auth = betterAuth({
    user: {
        additionalFields: {
            wanderLustRole: {
                type: "string",
                defaultValue: "user",
            },
            slug: {
                type: "string",
            },
        },
    },
    emailAndPassword: { 
        enabled: true, 
    },
    database: mongodbAdapter(db, {
        client
    }),
    socialProviders: {
        google: {
            prompt: "select_account", 
            clientId: googleId, 
            clientSecret: googleSecret,  
        }, 
    },
    databaseHooks: {
        user: {
            create: {
                before: async (user) => {
                    return {
                        data: {
                            ...user,
                            slug: generateSlug(user.name),
                        },
                    };
                },
            },
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: "jwt",
            maxAge: 7 * 24 * 60 * 60 // 7days
        },
    },
    plugins: [
        jwt(),
    ],
});