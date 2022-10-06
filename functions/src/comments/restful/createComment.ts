// import db from "@nodelib/config/firestore.config";
import db from "../../config/firestore.config";
import createRestuflFunction, { MethodEnum } from "../../utils/helpers";
import { createCommentRequest } from "../helpers/helpers";
import { ICreateCommentRequest } from "../models/models";

const createComment = createRestuflFunction({
  method: MethodEnum.POST,
  callback: async (req, res) => {
    try {
      const body: ICreateCommentRequest = req.body;

      const comment = createCommentRequest({
        comment: body.comment,
      });

      const ref = await db.collection("comments").add(comment);
      const doc = await ref.get();

      res.status(200).json({
        message: "Comment created",
        data: {
          id: doc.id,
          comment: doc.data(),
        },
      });
    } catch (err) {
      res.status(500).json({
        message: "Error",
        err,
      });
    }
  },
});

export default createComment;
