import db from "../../config/firestore.config";
import createRestuflFunction, { MethodEnum } from "../../utils/helpers";

const getAllBadWords = createRestuflFunction({
  method: MethodEnum.GET,
  callback: async (req, res) => {
    try {
      const query = db.collection("bad_words");
      const querySnapshot = await query.get();
      const data: { badWord: FirebaseFirestore.DocumentData }[] = [];
      querySnapshot.forEach((doc) =>
        data.push({
          badWord: doc.data()["name"],
        })
      );
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

export default getAllBadWords;
