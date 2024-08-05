const dotenv = require('dotenv');
async function globalSetup() {
	try {
		dotenv.config({
			path: '.env',
			override: true,
		});
	} catch (error) {
		console.error('Error in loading environment variables', error);
	}
}
export default globalSetup;
