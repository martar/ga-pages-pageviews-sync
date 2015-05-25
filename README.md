


HOW TO:
=======

npm install
create the config.js file based on the config.example.js
take care of GA authentication (In order to obtain key.pem (following https://github.com/bsphere/node-gapitoken):

1) Login to Google API Console, and under "API Access" create a "service account" for your project.
1.1) Add Google Analytics API permission
2) Download the .p12 private key file
3) Convert the .p12 file to .pem: openssl pkcs12 -in key.p12 -out key.pem -nocerts
NOTE: You must set a passphrase for the .pem file
4) Remove the passphrase from the .pem file: openssl rsa -in key.pem -out key.pem

run the code

ex. node index MY_GA_PROPERTY_NICKNAME
