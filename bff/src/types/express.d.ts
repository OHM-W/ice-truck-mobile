import type { Request as ExpressRequest, Response as ExpressResponse, NextFunction as ExpressNextFunction, Router as ExpressRouter } from "express";

declare module "express" {
  export type Request = ExpressRequest;
  export type Response = ExpressResponse;
  export type NextFunction = ExpressNextFunction;
  export type Router = ExpressRouter;

  export interface IError extends Error {
    status?: number;
    publicMessage?: string;
  }
}