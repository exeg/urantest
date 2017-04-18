									#Test Landing Page

	This app is built on famous free bootstrap template 
	[Backyard High Converting Landing Page](https://shapebootstrap.net/item/1524948-backyard-high-converting-landing-page-template).
	For translation is used popular node module [i18n](https://www.npmjs.com/package/i18n). You can change language with the help of your browsers user agent or site menu or url query ?lang=en or ?lang=ru. Translation data is transfered from MongoDb to files in ./locale directory. 
	There are two configuration files in /config directory, 
	default.json is for development and production.json for production.

	For installation please clone or download app from repository and run npm install.
	To download translated content please create Mongo database urantest and upload 
	data.json file into Content Collection.

	Evgeniy Grabelsky