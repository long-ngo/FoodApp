import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  getStorage
} from 'firebase/storage';
import { loadXHR } from '../convert/imageToBlob';

function uploadImage(imageSource, refURL) {
  const storage = getStorage();
  return new Promise(async (resolve, reject) => {
    try {
      const imageRef = ref(storage, refURL);
      const imageXHR = await loadXHR(imageSource);
      const uploadTask = uploadBytesResumable(imageRef, imageXHR, {
        contentType: 'image/png'
      });

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              //console.log('Upload is paused');
              break;
            case 'running':
              // console.log('Upload is running');
              break;
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

export { uploadImage };
