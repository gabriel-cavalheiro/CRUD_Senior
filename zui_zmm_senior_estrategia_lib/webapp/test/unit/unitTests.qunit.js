/* global QUnit */
// https://api.qunitjs.com/config/autostart/
QUnit.config.autostart = false;

sap.ui.require([
	"comgirassol/zui_zmm_senior_estrategia_lib/test/unit/AllTests"
], function (Controller) {
	"use strict";
	QUnit.start();
});