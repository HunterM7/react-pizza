import { RecaptchaVerifier } from 'firebase/auth'
import { auth } from './firebaseConfig'

declare global {
	interface Window {
		recaptchaVerifier: RecaptchaVerifier
	}
}

// Function that generate captcha
export const generateRecaptcha = () => {
	window.recaptchaVerifier = new RecaptchaVerifier(
		'recaptcha-container',
		{
			size: 'invisible',
			callback: (
				// response
				) => {
				// reCAPTCHA solved, allow signInWithPhoneNumber.
			},
		},
		auth,
	)
}
