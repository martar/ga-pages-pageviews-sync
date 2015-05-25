WHAT IT DOES
============

* The script connects to Google Anlytics, fetches the pageviews of the pages whose url matches regex provided in the config.
* URL must have at least two segments. ex. /question/[0-9]+;
* The script continues fetching until the last fetched item have less pageviews that configured threshold.
* The scripts outputs to the standard output, data in the format
 > SECOND_SEGMENT_OF_THE_PAGEPATH, NUM_OF_PAGEVIEWS


HOW TO:
=======

* npm install
* create the config.js file based on the config.example.js
* take care of GA authentication (In order to obtain key.pem (following https://github.com/bsphere/node-gapitoken):

  -  Login to Google API Console, and under "API Access" create a "service account" for your project.
  -  Add Google Analytics API permission
  -  Download the .p12 private key file
  - Convert the .p12 file to .pem: openssl pkcs12 -in key.p12 -out key.pem -nocerts
  - NOTE: You must set a passphrase for the .pem file
  - Remove the passphrase from the .pem file: openssl rsa -in key.pem -out key.pem

* run the code ex. node index MY_GA_PROPERTY_NICKNAME
