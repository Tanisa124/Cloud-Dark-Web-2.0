import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolData = {
  UserPoolId: "us-east-1_XXXXXXXXX",
  ClientId: "",
};

export default new CognitoUserPool(userPoolData);
