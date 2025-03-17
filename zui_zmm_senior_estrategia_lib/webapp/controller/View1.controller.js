sap.ui.define(
    [
      "sap/ui/core/mvc/Controller",
      "sap/m/MessageToast",
      "sap/ui/model/Filter",
      "sap/ui/model/FilterOperator"
    ],
    function (Controller, MessageToast, Filter, FilterOperator) {
      "use strict";
  
      return Controller.extend("com.girassol.zuizmmseniorestrategialib.controller.View1", {
        onInit: function () {
          var oModel = this.getOwnerComponent().getModel();
          this.getView().setModel(oModel);
        },
  
        onSearch: function (oEvent) {
          var sQuery = oEvent.getParameter("newValue").toUpperCase();
          var oTable = this.byId("tableTypePo");
          var oBinding = oTable.getBinding("items");
  
          if (sQuery) {
            var oFilter = new Filter({
              path: "Bsart",
              operator: FilterOperator.Contains,
              value1: sQuery
            });
            oBinding.filter([oFilter]);
          } else {
            oBinding.filter([]);
          }
        },
  
        onSave: function () {
          var oModel = this.getView().getModel();
  
          var sBsart = this.byId("inp1").getValue();
          var sEkorg = this.byId("inp2").getValue();
          var sEkgrp = this.byId("inp3").getValue();
          var sZzcodapr = this.byId("inp4").getValue();
  
          var oEntry = {
            Bsart: sBsart.toUpperCase(),
            Ekorg: sEkorg.toUpperCase(),
            Ekgrp: sEkgrp.toUpperCase(),
            Zzcodapr: sZzcodapr.toUpperCase()
          };
  
          var sPath = "/ZMMT_SENIOR_POSet('" + sBsart + "')";
  
          oModel.read(sPath, {
            success: function () {
              oModel.update(sPath, oEntry, {
                success: function () {
                  MessageToast.show("Registro atualizado com sucesso!");
                  oModel.refresh(true);
                },
                error: function (oError) {
                  MessageToast.show("Erro ao atualizar registro.");
                }
              });
            },
            error: function () {
              oModel.create("/ZMMT_SENIOR_POSet", oEntry, {
                success: function () {
                  MessageToast.show("Novo registro criado com sucesso!");
                  oModel.refresh(true);
                },
                error: function (oError) {
                  if (oEntry.Bsart.length > 4) {
                    MessageToast.show("Campo Tipo de Pedido aceita no máximo 4 caracteres.");
                  } else if (oEntry.Ekorg.length > 4) {
                    MessageToast.show("Campo Organização de Compras aceita no máximo 4 caracteres.");
                  } else if (oEntry.Ekgrp.length > 3) {
                    MessageToast.show("Campo Grupo de Compras aceita no máximo 3 caracteres.");
                  } else if (oEntry.Zzcodapr.length > 4) {
                    MessageToast.show("Campo Código do Aprovador aceita no máximo 4 caracteres.");
                  } else {
                    MessageToast.show("Erro ao criar registro.");
                  }
                }
              });
            }
          });
        },
  
        onSelectItem: function (oEvent) {
          var oSelectedItem = oEvent.getSource().getSelectedItem();
          if (!oSelectedItem) return;
  
          var oContext = oSelectedItem.getBindingContext();
          var oData = oContext.getObject();
  
          this.byId("inp1").setValue(oData.Bsart);
          this.byId("inp2").setValue(oData.Ekorg);
          this.byId("inp3").setValue(oData.Ekgrp);
          this.byId("inp4").setValue(oData.Zzcodapr);
        },
  
        onDelete: function () {
          var oModel = this.getView().getModel();
          var sBsart = this.byId("inp1").getValue().toUpperCase();
  
          if (!sBsart) {
            MessageToast.show("Selecione um item antes de deletar.");
            return;
          }
  
          var sPath = "/ZMMT_SENIOR_POSet('" + sBsart + "')";
  
          oModel.remove(sPath, {
            success: function () {
              MessageToast.show("Registro deletado com sucesso!");
              oModel.refresh(true);
  
              this.byId("inp1").setValue("");
              this.byId("inp2").setValue("");
              this.byId("inp3").setValue("");
              this.byId("inp4").setValue("");
            }.bind(this),
            error: function (oError) {
              MessageToast.show("Erro ao deletar registro.");
            }
          });
        }
      });
    }
  );
  