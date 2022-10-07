import { IComment } from "../models/models";

export const createCommentRequest = (comment: IComment): IComment => {
  return { ...comment };
};
