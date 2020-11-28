# Shopping Cart ES5 Demo
A copy of the UI5 shopping cart demo app connected to the SAP Gateway demo system ES5.
It can be used for demostrations and education as needed.

## Create an account on ES5

1. Go to the [ES5 Signup page](https://gatewaytestdd27584c4.us2.hana.ondemand.com/SUPSignForms/) and fill out the form to create a new account:
2. Change the initial password by logging into the system once as described in the E-Mail confirmation
3. If you are interested in more details about the SAP Gateway demo system ES5, check this [blog post](https://blogs.sap.com/2017/12/05/new-sap-gateway-demo-system-available/)

## Create a destination inside your SAP Hana Cloud Platform account

1. Log into your [hanatrial account](https://account.hanatrial.ondemand.com/) (create one for free if you don't have one yet)
2. Go to "Connectivity > Destinations"
3. Press the link "Import Destination"
4. Import the file [ES5](./ES5) from this repository
5. (Optional) Edit the destination and add your ES5 credentials
  1. Select the Authentication "BasicAuthentication"
  2. Enter the username and password for your ES5 demo account

## Running the project in SAP Web IDE

1. Open the [SAP Web IDE Full-Stack](https://webidecp-<youraccountname>trial.dispatcher.hanatrial.ondemand.com/) (adjust the url with your account number). If the URL didn't work, you have to activate the Web IDE full stack service:

  * Go to [SAP Cloud Cockpit](https://account.hanatrial.ondemand.com/cockpit#/home/overview).

  * At the bottom of the page, select the button with the text "trail"

  * click on your account number

  * Under the services at the left side, search for Web IDE Full-Stack and enable it.

2. Clone this repository by selected "File > Git > Clone Repository" and inserting the following URL:
```
https://github.com/Michadelic/ShoppingCartES5Demo.git
```


3. Open the app in preview mode by pressing the "Run" button

Choose on of the following entry points:

| Path | Description |
| ------------- |:-------------:|
| index.html  | for connecting to the live service on SAP Gateway demo system ES5 |
| test/mockServer.html | for a local version of the app with mock data|
| test/integration/opaTests*.qunit.html | integration tests written in OPA and Gherkin |
| test/unit/unitTests.qunit.html | unit tests implemented in QUnit |

> Note: If you havent entered your credentials in the destinaction ES5, you have to enter them manually once per session when the app starts