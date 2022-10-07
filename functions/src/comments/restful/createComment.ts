import db from "../../config/firestore.config";
import createRestuflFunction, { MethodEnum } from "../../utils/helpers";
import { createCommentRequest } from "../helpers/helpers";
// import { IComment } from "../models/models";
/* 
var badWords = [
  "pussy",
  "dick",
  "bastard",
  "fuck",
  "bitch",
  "fucking",
  "nigga",
  "fuck off",
]; */
const createComment = createRestuflFunction({
  method: MethodEnum.POST,
  callback: async (req, res) => {
    try {
      /* const body: IComment = req.body;
       var output = "";
      var wordsInComment = body.comment.split(" ");
      for (let i = 0; i < wordsInComment.length; i++) {
        if (i == 0) {
          output += badWords.includes(wordsInComment[i].toLowerCase())
            ? "***** "
            : `${wordsInComment[i]} `;
        } else {
          output += badWords.includes(wordsInComment[i].toLowerCase())
            ? " ***** "
            : ` ${wordsInComment[i]} `;
        }
      } */
      const comment = createCommentRequest({
        comment: req.body,
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
