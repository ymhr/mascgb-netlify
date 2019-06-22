{
	"extends": [
	  "config:base"
	],
	"rangeStrategy": "replace",
	"lockFileMaintenance": {
	  "enabled": true,
	  "extends": "schedule:weekly"
	},
	"packageRules": [
	  {
		"packageNames": ["netlify-cms-app"],
		"rangeStrategy": "bump"
	  }
	]
  }