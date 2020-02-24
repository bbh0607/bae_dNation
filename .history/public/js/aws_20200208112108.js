AWS.config.region = "us-east-1"; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: "us-east-1:393531d5-9ecb-4064-bfab-a747c14130b0"
});
