sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], (Controller,MessageBox) => {
    "use strict";

    return Controller.extend("project1.controller.View1", {
        onInit() {
            //  this.getView().bindElement("/Categories/0");
        var oDataModel = this.getOwnerComponent().getModel();
        var oJsonModel = new sap.ui.model.json.JSONModel();
        var oFilter = new sap.ui.model.Filter({
           path: 'EmployeeID',
           operator: "EQ",
           value1: '2',
        //    value2: '10'
        });
        var oBsyDialog = new sap.m.BusyDialog({
            title : "request is in process",
            text : "please be wait",
            customIcon : "./css/loading.png"
        });
         oBsyDialog.open();
            oDataModel.read("/Employees",{
                   filters :[oFilter],
                   urlParameters : {
                    // "$top": 0,
                    // "$skip": 1,
                    "$expand" : "Employees1"
                   },
                success: function(oResponse){
                  oJsonModel.setProperty("/NWCat",oResponse.results);
        
                  this.getView().setModel(oJsonModel,"JSONData");  
                  oBsyDialog.close();
                }.bind(this),
                error : function(oerror){

                }.bind(this)
            })
        },
        ondeletepress: function(odeleteentry){
            var oContext = odeleteentry.getSource().getBindingContext("JSONData").getObject();
            MessageBox.confirm("do you want to delete the selected entry",{
                title:"confirm",
                onClose:function(saction){
                    if(saction==='OK'){
                        this.onDeleteSpecificRecord(oContext);
                    }
                }.bind(this),
                actions: [ sap.m.MessageBox.Action.OK,
                           sap.m.MessageBox.Action.CANCEL ],         
         emphasizedAction: sap.m.MessageBox.Action.OK, 
            });

        },
        onDeleteSpecificRecord : function(){
 debugger;
        }
    });
});