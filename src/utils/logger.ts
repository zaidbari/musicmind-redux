import { Native } from 'sentry-expo'

export const logger = {
	log: (message: any, ...rest: any) => {
		if (process.env.NODE_ENV !== 'development') return
		if (message.code === 'ERR_CANCELED' || message === 'Player is not loaded') return
		console.log(message, ...rest)
	},
	sentry(error: any, ...rest: any) {
		if (error.code === 'ERR_CANCELED' || error === 'Player is not loaded') return
		if (process.env.NODE_ENV === 'development') {
			console.log(error, ...rest)
			return
		}
		Native.captureException(error, ...rest)
	}
}
