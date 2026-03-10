import { storage } from "../config/firebaseConfig.js";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 } from "uuid";
export const uploadWebContentMiddleware = (file, folder) =>
  new Promise((resolve, reject) => {
    const storageRef = ref(storage, `${folder}/${file.originalname}`);
    const uploadTask = uploadBytesResumable(storageRef, file.buffer, {
      contentType: file.mimetype,
    });
    uploadTask.on(
      "state_changed",
      (snap) => {
        const pct = (snap.bytesTransferred / snap.totalBytes) * 100;
        console.log(`Upload ${pct.toFixed(0)} %`);
      },
      reject,
      async () => {
        try {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(url);
        } catch (err) {
          reject(err);
        }
      }
    );
  });
