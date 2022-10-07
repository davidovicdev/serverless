import db from "../../config/firestore.config";
import createRestuflFunction, { MethodEnum } from "../../utils/helpers";

const getComment = createRestuflFunction({
  method: MethodEnum.GET,
  callback: async (req, res) => {
    try {
      /* const query = db.collection("comments");
      const querySnapshot = await query.get(); */
      const docId = req.params["0"];

      const query = db.collection("comments").doc(docId);
      const querySnapshot = await query.get();
      const data: {
        id: string;
        comment: FirebaseFirestore.DocumentData | undefined;
      }[] = [];
      data.push({
        id: docId,
        comment: querySnapshot.data(),
      });
      /*   querySnapshot.forEach((doc) =>
        data.push({
          id: doc.id,
          comment: doc.data(),
        })
      ); */
      res.status(200).json({
        data,
      });
    } catch (err) {
      res.status(500).json({
        message: "Error",
        err,
      });
    }
  },
});

export default getComment;
