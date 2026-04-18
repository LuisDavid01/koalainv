import { db } from "../server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { sendEmail } from "./email";

export const auth = betterAuth({
	user: {
		additionalFields: {
			isOnboarded: {
				type: "boolean",
				defaultValue: false,
				required: false,
				input: false,
			},
		},
	},
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
		sendResetPassword: async ({ user, url, token }, request) => {
			sendEmail(
				user.email,
				"Reset your password",
				`Click the link to reset your password: ${url}`,
			);
		},
		onPasswordReset: async ({ user }) => {
			sendEmail(
				user.email,
				"Password reset",
				`Su contraseña ha sido cambiada. verifique que hayas sido tu, si no contacta con nosotros.`,
			);
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	emailVerification: {
		sendVerificationEmail: async ({ user, url}) => {
			sendEmail(
				user.email,
				"Verify your email address",
				`Click the link to verify your email: ${url}`,
			);
		},
		sendOnSignUp: true,
	},
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	plugins: [tanstackStartCookies()]

});
