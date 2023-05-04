# Cloud-Dark-Web-2.0


## **Run in local**

### Frontend ( Next JS )
- Setup an enviroment
- create a .env file in ./frontend with this content
    ```
    NEXT_PUBLIC_BASE_URL=http://localhost:8080
    NEXTAUTH_SECRET=darkwebsecret
    ```
- Install dependencies
  
  ```
  yarn install
  ```
- Run

  ```
  yarn dev
  ```

### Backend ( Nest JS )
- Setup an enviroment
- create a .env file in ./backend with this content
   ```
    DB_URI=
    OPENAI_ORG_iD=
    OPENAI_API_KEY=
    GOOGLE_SEARCH_API_KEY=
    AWS_COGNITO_USER_POOL_ID=
    AWS_COGNITO_CLIENT_ID=
    AWS_COGNITO_REGION=
    STMP_USER=
    STMP_PASSWORD=
    FROM_EMAIL=
    STMP_HOST=
    STMP_PORT=
    ```
-  Register to MongoDB Atlas, create a cluster and put the connection URI in DB_URI
-  Register to OpenAI on https://openai.com/blog/openai-api , get the Organiztion id and API key and put it in OPENAI_ORG_iD and OPENAI_API_KEY respectively.
-  Register to https://serper.dev/, get the API key and put it in GOOGLE_SEARCH_API_KEY
-  Create pool in AWS Cognito to get "AWS_COGNITO_USER_POOL_ID" & "AWS_COGNITO_CLIENT_ID"
-  Create IAM account from AWS SES to get "STMP_USER" & "STMP_PASSWORD"
-  "FROM_EMAIL" = Email that register in SES
-  "STMP_HOST" = email-smtp.<AWS SES Region>.amazonaws.com
-  "STMP_PORT" = 587

- Install dependencies
  
  ```
  yarn install
  ```
- Run

    ```
    yarn start:dev
    ```

## **Deploy on AWS App Runner**
- You have to create both frontend and backend service.

### In backend service
1. Create a aws app runner service.
2. Choose a source code repository as a repository type.
3. Link to this repository: https://github.com/aof18794/Cloud-Dark-Web-2.0.
4. Select "Automatic" as deployment trigger.
5. Select "Configure all settings here" in configure build.
6. Choose "Nodejs 16" as a runtime.
7. Put this command in build command
   
   ```
   mv ./backend/* .; rm -r frontend; yarn install; yarn build
   ```
8. Put this command in start command
   
    ```
    yarn start
    ```
9.  Change port to 8080
10. Create a service name and add all environment variables with the names and values from backend local's .env file.
11. Wait for creating a service

### In frontend service
1. Create a aws app runner service.
2. Choose a source code repository as a repository type.
3. Link to this repository: https://github.com/aof18794/Cloud-Dark-Web-2.0.
4. Select "Automatic" as deployment trigger.
5. Select "Configure all settings here" in configure build.
6. Choose "Nodejs 16" as a runtime.
7. Put this command in build command
   
   ```
   mv ./frontend/* .; rm -r backend; yarn install; yarn build
   ```
8. Put this command in start command
   
    ```
    yarn start:prod
    ```
9.  Change port to 3000
10. Create a service name and add all environment variables with the names and values from frontend local's .env file.

    ** NEXT_PUBLIC_BASE_URL => Use a deployment url from a backend service
11. Wait for creating a service


