import { Request, response, Response } from "express";
import createUsersService from "../services/users/createUsers.service";
import { IUserRequest } from "../interfaces/users.interfaces";
import retriveUserService from "../services/users/retrieveUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import allUsersService from "../services/users/allUsers.service";
import updateUserService from "../services/users/updateUser.service";
import recoverUserService from "../services/users/recoverUser.service";
import profileUserService from "../services/users/profileUser.service";

const createUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userData: IUserRequest = request.body;

  const newUser = await createUsersService(userData);
  return response.status(201).json(newUser);
};

const allUsersController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const users = await allUsersService();

  return response.json(users);
};

const retrieveUserController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = parseInt(request.params.id);

  const user = await retriveUserService(userId);

  return response.json(user);
};

const userDeleteController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = parseInt(request.params.id);

  await deleteUserService(userId);

  return response.status(204).send();
};
const userRecoverController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = parseInt(request.params.id);

  const user = await recoverUserService(userId);

  return response.json(user);
};

const userUpdateeController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const userId: number = parseInt(request.params.id);

  const user = await updateUserService(userId, request.body);
  return response.json(user);
};

const userProfileController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  let token = response.locals.user.id;

  const users = await profileUserService(token);
  return response.json(users);
};

export {
  createUsersController,
  retrieveUserController,
  userDeleteController,
  allUsersController,
  userUpdateeController,
  userRecoverController,
  userProfileController,
};
