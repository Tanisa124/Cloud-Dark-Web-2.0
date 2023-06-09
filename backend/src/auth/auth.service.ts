/* eslint-disable prefer-const */
import { Injectable, BadRequestException } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { ConfigService } from '@nestjs/config';
import { RegisterRequestDto } from './dto/register.request.dto';
import { AuthenticateRequestDto } from './dto/authenticate.requests.dto';
import { Model } from 'mongoose';
import { Users } from 'src/schemas/users.schema';
import { LoginResponseDto } from './dto/loginResponse.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  private userPool: CognitoUserPool;

  constructor(private configService: ConfigService, @InjectModel(Users.name) private userModel : Model<Users>) {
    this.userPool = new CognitoUserPool({
      UserPoolId: this.configService.get<string>('AWS_COGNITO_USER_POOL_ID'),
      ClientId: this.configService.get<string>('AWS_COGNITO_CLIENT_ID'),
    });
  }

  async addUser(dto: CreateUserDto){
    const createUser = new this.userModel(dto);
    return await createUser.save();
  }

  async findUserByUsername(username: string){
    const searchDbResult = await this.userModel.findOne({username: username})
    if (searchDbResult == null){
      throw new BadRequestException('no user in mongodb');
    }
    return searchDbResult
  }

  async updateUserByUsername(username: string, new_balance: number){
    const updateUser = await this.userModel.updateOne(
      { username: username },
      { $set: { balance: new_balance } },
      { new: true }
    )
    return updateUser;
  }
  

  async register(authRegisterRequest: RegisterRequestDto) {
    const { username, email, password } = authRegisterRequest;
    return new Promise((resolve, reject) => {
      return this.userPool.signUp(
        username,
        password,
        [new CognitoUserAttribute({ Name: 'email', Value: email })],
        null,
        (err, result) => {
          if (!result) {
            reject(err);
          } else {
            resolve(result.user),
            this.addUser({
              username: username,
              balance: 1000,
              email: email
            })
          }
        },
      );
    });
  }

  confirmUser(user: { username: string; confirmationCode: string }) {
    const { username, confirmationCode } = user;

    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      cognitoUser.confirmRegistration(
        confirmationCode,
        true,
        function (err, result) {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve(result);
          }
        },
      );
    });
  }

  LoginResponse(dto: LoginResponseDto){
    const response = dto
    return response
  }

  async authenticate(user: AuthenticateRequestDto) {
    const { username, password } = user;
    const userInfo = JSON.parse(
      JSON.stringify(await this.findUserByUsername(username))
      )
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });
    const userData = {
      Username: username,
      Pool: this.userPool,
    };

    const newUser = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      newUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    })
    .then((result) => {
      const email = userInfo['email']
      const balance = userInfo['balance']
      const accessToken = result['accessToken']['jwtToken']
      const refreshToken = result['refreshToken']['token']
      return this.LoginResponse({
        user: {username: username, email: email },
        balance: balance,
        accessToken: accessToken,
        refreshToken: refreshToken,
      })

    })
    .catch((err) => {
      console.error('Promise rejected with:', err);
    });
  
  }
}
