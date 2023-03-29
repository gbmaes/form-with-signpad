sap.ui.define([
	'sap/ui/core/mvc/Controller',
	"sap/ui/model/json/JSONModel",
],
	function (Controller, JSONModel) {
		"use strict";
		return Controller.extend("opensap.myapp.controller.main", {

			checkDone: function (oEvent) {
				var check = oEvent.getParameter("selected");
				this.getView().byId("labelVon").setVisible(check);
				this.getView().byId("DTP3").setVisible(check);
				this.getView().byId("labelBis").setVisible(check);
				this.getView().byId("DTP4").setVisible(check);
				this.getView().byId("labelKost").setVisible(check);
				this.getView().byId("inputNumber2").setVisible(check);
			},
			checkDone2: function (oEvent) {
				var check = oEvent.getParameter("selected");
				//this.getView().byId("labelVon2").setVisible(check);
				this.getView().byId("DTP6").setVisible(check);
				//this.getView().byId("labelBis2").setVisible(check);
				this.getView().byId("DTP7").setVisible(check);
				this.getView().byId("idHBoxDate").setVisible(this.byId("ch2").getSelected());
			},
			handleChange: function () {
				var startDate = this.getView().byId("DTP6").getDateValue();
				var endDate = this.getView().byId("DTP7").getDateValue();

				const diffTime = Math.abs(endDate - startDate);
				const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

				var dateM = [];
				var i = 0;
                var that = this;
				while (i <= diffDays) {
					dateM.push({
						date: that.addDays(startDate, i)
					});
					i++;
				}

				this.getView().setModel(new JSONModel(dateM), "dateum");
				this.getView().byId("idHBoxDate").setVisible(this.byId("ch2").getSelected());
			},

			 addDays: function(date, days) {
				var result = new Date(date);
				result.setDate(result.getDate() + days);
				return result;
			  },

			onSign: function () {
				var that = this;
				// if (!this.oSignDialog) {
				// 	this.oSignDialog = sap.ui.xmlfragment("opensap.myapp.view.Signature", this);
				// 	this.getView().addDependent(this.oSignDialog);
				// }
				// this.oSignDialog.open();

				if (!this.pDialog) {
					this.pDialog = this.loadFragment({
						name: "opensap.myapp.view.Signature"
					});
				}
				this.pDialog.then(function (oDialog) {
					oDialog.open();
					var oHTML = new sap.ui.core.HTML({
						content: "<canvas id='Canvas' width='550' height='300'></canvas>",
						afterRendering: function () {
							var canvas = document.getElementById("Canvas");
							that.signaturePad = new SignaturePad(canvas);
						}
					});

					var oLayout = that.getView().byId("idVLayoutSign");
					oLayout.addContent(oHTML);
				});

			},
			onCancelSignDialog: function () {
				this.pDialog.then(function (d) { d.close(); });
			},

			onPressSign: function () {
				var signedImage = this.signaturePad.toDataURL();
				//store the signature
			}

		});
	});