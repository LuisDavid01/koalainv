import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_SECRET as string);

export const auth = betterAuth({
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			resend.emails.send({
				from: 'Acme <onboarding@resend.dev>',
				to: user.email,
				subject: "Reset your password",
				text: `Click the link to reset your password: ${url}`,
			});
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			resend.emails.send({
				from: 'Acme <onboarding@resend.dev>',
				to: user.email,
				subject: "Verify your email address",
				text: `Click the link to verify your email: ${url}`,
			});
		},
		sendOnSignUp: true,
	},
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	plugins: [tanstackStartCookies()]

});
