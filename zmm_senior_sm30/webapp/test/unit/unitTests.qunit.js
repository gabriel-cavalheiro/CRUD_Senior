/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"zmm_senior_sm30/zmm_senior_sm30/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
