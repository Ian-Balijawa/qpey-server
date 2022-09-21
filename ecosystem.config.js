module.exports = {
	apps: [
		{
			script: './build/index.js',
			watch: '.',
		},
		{
			script: './service-worker/',
			watch: ['./service-worker'],
		},
	],
	env_development: {
		NODE_ENV: 'development',
	},
	env_staging: {
		NODE_ENV: 'staging',
	},
	env_production: {
		NODE_ENV: 'production',
	},

	deploy: {
		production: {
			user: 'ianbalijawa16@gmail.com',
			host: 'SSH_HOSTMACHINE',
			ref: 'origin/main',
			repo: 'GIT_REPOSITORY',
			path: 'DESTINATION_PATH',
			'pre-deploy-local': '',
			'post-deploy':
				'npm install && pm2 reload ecosystem.config.js --env production',
			'pre-setup': '',
		},
	},
};
