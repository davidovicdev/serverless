import db from "../../config/firestore.config";
import createRestuflFunction, { MethodEnum } from "../../utils/helpers";

const updateComment = createRestuflFunction({
  method: MethodEnum.PATCH,
  callback: async (req, res) => {
    try {
      const docId = req.params["0"];
      const comment = req.body["comment"];
      const query = db.collection("comments").doc(docId);
      await query.set({ comment });
      const snap = await query.get();

      res.status(200).json({
        message: "Comment updated",
        data: {
          id: docId,
          comment: snap.data(),
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

export default updateComment;
