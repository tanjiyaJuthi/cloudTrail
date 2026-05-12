import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

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
});