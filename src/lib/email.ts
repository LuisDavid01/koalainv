import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.SMTP_HOST as string,
		pass: process.env.SMTP_PASS as string,
	},
})


export function sendEmail(to: string, subject: string, text: string) {
	try {
		 transporter.sendMail({
			from: process.env.SMTP_HOST as string,
			to: to,
			subject: subject,
			text: text,
		})
	} catch (e) {
		console.log(e)
	}
}
