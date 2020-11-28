sap.ui.define([
	'sap/ui/demo/cart/controller/BaseController',
	'sap/ui/demo/cart/model/cart',
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/Filter',
	'sap/ui/demo/cart/model/formatter'
], function (BaseController, cart, JSONModel, Filter, formatter) {
	"use strict";

	return BaseController.extend("sap.ui.demo.cart.controller.Welcome", {

		_iCarouselTimeout: 0, // a pointer to the current timeout
		_iCarouselLoopTime: 8000, // loop to next picture after 8 seconds

		formatter: formatter,

		onInit: function () {
			var oViewModel = new JSONModel({
				welcomeCarouselShipping: 'img/ShopCarouselShipping.jpg',
				welcomeCarouselInviteFriend: 'img/ShopCarouselInviteFriend.jpg',
				welcomeCarouselTablet: 'img/ShopCarouselTablet.jpg',
				welcomeCarouselCreditCard: 'img/ShopCarouselCreditCard.jpg',
				Promoted: [],
				Viewed: [],
				Favorite: [],
				Currency: "EUR"
			});
			this.getView().setModel(oViewModel, "view");
			this.getRouter().attachRouteMatched(this._onRouteMatched, this);
			this.getRouter().getTarget("welcome").attachDisplay(this._onRouteMatched, this);

			// select random carousel page at start
			var oWelcomeCarousel = this.byId("welcomeCarousel");
			var iRandomIndex = Math.floor(Math.abs(Math.random()) * oWelcomeCarousel.getPages().length);
			oWelcomeCarousel.setActivePage(oWelcomeCarousel.getPages()[iRandomIndex]);

			console.log("onInit");
		},

		onBeforeRendering: function () {
			console.log("onBefore");
		},

		/**
		 * lifecycle hook that will initialize the welcome carousel
		 */
		onAfterRendering: function () {
			this.onCarouselPageChanged();
			console.log("onAfterRendering");

			/* don't do this at home, just for illustration */
			// this will rerender the view indefinitely
			/*if (!this._iQuit || this._iQuit < 5) {
				if (!this._iQuit) {
					this._iQuit = 0;
				}
				this.getView().insertAggregation("content", new sap.m.Title({
					text: "Hello, i am a really important rendered by onAfterRendering",
					titleStyle: "H1",
					width: "100%",
					textAlign: "Center"
				}), 0, false);
				this._iQuit ++;
			}*/

			/* don't do this at home, just for illustration */
			/*
			// this will rerender the page indefinitely
			this.getView().getContent()[0].addEventDelegate({
				onAfterRendering: function () {
					if (!this._iQuit || this._iQuit < 5) {
						if (!this._iQuit) {
							this._iQuit = 0;
						}
						this.getView().getContent()[0].addContent(new sap.m.Title({
							text: "Hello, i am a really important rendered by onAfterRendering",
							titleStyle: "H1",
							width: "100%",
							textAlign: "Center"
						}), 0);
						this._iQuit ++;
					}
				}.bind(this)
			});*/
		},

		onExit: function () {
			console.log("onExit");
		},

		destroy: function () {
			console.log("destroy");
		},

		_onRouteMatched: function (oEvent) {
			/* don't do this at home, just for illustration */
			/*this.getView().getContent()[0].addContent(new sap.m.Title({
				text: "Hello, the current time is: " + new Date(),
				titleStyle: "H1",
				width: "100%",
				textAlign: "Center"
			}), 0);*/
			
			/* don't do this at home, just for illustration */
			// this won't work as the binding won't be updated properly
			var oTitle = this.getView().byId("title");
			/* oTitle.mProperties["text"] = "A new title"; */
			// this won't work as the title is bound
			/*oTitle.setTitle("A new title");*/
			// this works: unbind and set
			/*oTitle.unbindProperty("title");
			oTitle.setText("A new title");*/

			// we do not need to call this function if the url hash refers to product or cart product			
			if (oEvent.getParameter("name") !== "product" && oEvent.getParameter("name") !== "cartProduct") {
				var oModel = this.getModel();
					oModel.read("/ProductSet", {
						success: function (oData) {
							this.getModel("view").setProperty("/Promoted", oData.results);
								this._selectPromotedItems();
						}.bind(this)
					});
			}
		},

		/**
		 * clear previous animation and initialize the loop animation of the welcome carousel
		 */
		onCarouselPageChanged: function () {
			clearTimeout(this._iCarouselTimeout);
			this._iCarouselTimeout = setTimeout(function () {
				var oWelcomeCarousel = this.byId("welcomeCarousel");
				if (oWelcomeCarousel) {
					oWelcomeCarousel.next();
					this.onCarouselPageChanged();
				}
			}.bind(this), this._iCarouselLoopTime);
		},

		/**
		 * Event handler to determine which link the user has clicked
		 * @param {sap.ui.base.Event} oEvent the press event of the link
		 */
		onSelectProduct: function (oEvent) {
			var oContext = oEvent.getSource().getBindingContext("view");
			var sCategoryId = oContext.getProperty("SupplierID");
			var sProductId = oContext.getProperty("ProductID");
			this.getOwnerComponent().getRouter().navTo("product", {
				id: sCategoryId,
				productId: sProductId
			});
		},

		/**
		 * Navigates to the category page on phones
		 */
		onShowCategories: function () {
			this.getRouter().navTo("categories");
		},

		/**
		 * Opens a lightbox when clicking on the picture
		 * @param {sap.ui.base.Event} oEvent the press event of the image
		 */
		onPicturePress: function (oEvent) {
			var sPath = "view>" + oEvent.getSource().getBindingContext("view").getPath();
			this.byId("lightBox").bindElement({path: sPath});
			this.byId("lightBox").open();
		},

		/**
		 * Event handler to determine which button was clicked
		 * @param {sap.ui.base.Event} oEvent the button press event
		 */
		onAddButtonPress: function (oEvent) {
			var oResourceBundle = this.getModel("i18n").getResourceBundle();
			var oProduct = oEvent.getSource().getBindingContext("view").getObject();
			var oCartModel = this.getModel("cartProducts");
			cart.addToCart(oResourceBundle, oProduct, oCartModel);
		},

		/**
		 * Select fixed products
		 * @private
		 */
		_selectPromotedItems: function () {
			var aProducts = this.getView().getModel("view").getProperty("/Promoted");
			this.getModel("view").setProperty("/Promoted", [aProducts[1], aProducts[62]]);
			this.getModel("view").setProperty("/Viewed", [aProducts[114], aProducts[102], aProducts[96], aProducts[119]]);
			this.getModel("view").setProperty("/Favorite", [aProducts[109], aProducts[95], aProducts[97], aProducts[18]]);
		}
	});
});