sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/model/odata/v2/ODataModel"
], function (UIComponent, ODataModel) {
    "use strict";

    return UIComponent.extend("com.girassol.zuizmmseniorestrategialib.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            UIComponent.prototype.init.apply(this, arguments);

            // Inicializa o roteador
           // this.getRouter().initialize();

            var oModel = new ODataModel("https://srvsaps4d.girassolagricola.com.br:50001/sap/opu/odata/sap/ZMM_SENIOR_PO_GW_SRV/", {
                json: true,
                useBatch: false
            });

            this.setModel(oModel);
            
            
        }
    });
});