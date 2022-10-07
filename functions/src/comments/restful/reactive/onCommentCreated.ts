import * as functions from "firebase-functions";

import { IComment } from "../../models/models";

var censure = [
  "pussy",
  "penis",
  "dick",
  "tits",
  "tit",
  "loncar",
  "asshole",
  "fucking",
  "fuck",
  "bitch",
  "bbc",
  "niggas",
  "nigga",
];

const onCommentCreated = functions.firestore

  .document("comments/{commentId}")

  .onCreate(async (snapshot, context) => {
    const comment = <IComment>snapshot.data();
    var comment2: any = comment.comment;
    var comment3: string = comment2.comment;

    censure.forEach((word) => {
      if (comment3.includes(word.toLocaleLowerCase())) {
        var newWord = "";

        for (let i = 0; i < word.length; i++) {
          newWord += "*";
        }

        comment3 = comment3.replace(new RegExp(word, "g"), newWord);

        console.log(comment3);

        return snapshot.ref.update({ comment: comment3 });
      }

      return null;
    });

    return null;
  });

export default onCommentCreated;
