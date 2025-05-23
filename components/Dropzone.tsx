"use client";
import { cn } from "@/lib/utils";
import DropzoneComponent from "react-dropzone";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import {storage} from "@/firebase";
import {  getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

const Dropzone = () => {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");

      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };
  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if(!user) return;
    setLoading(true);
    const toastId = toast.loading("Uploading...");

    //do what needs to be done
    //addDoc -> users/user123/files
    const docRef = await addDoc(collection(db,"users",user.id,"files"),{
        userId: user.id,
        fileName: selectedFile.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        timeStamp: serverTimestamp(),
        type: selectedFile.type,
        size: selectedFile.size,
    })
    const imageRef = ref(storage, `users/${user.id}/files/${docRef.id}`);
    uploadBytes(imageRef,selectedFile).then(async(snapshot)=>{
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db,"users",user.id,"files",docRef.id),{
        downloadURL: downloadURL,
      });
    });
    toast.success("Uploaded Successfully",{
      id: toastId,
    });

    setLoading(false);
  };
  
  // max file size 20MB
  const MAX_FILE_SIZE = 2091520;
  return (
    <DropzoneComponent
      minSize={0}
      maxSize={MAX_FILE_SIZE}
      onDrop={onDrop}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 &&
          fileRejections[0].file.size > MAX_FILE_SIZE;
        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center cursor-pointer",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/70 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload!"}
              {isDragActive && !isDragReject && "Drop to upload this file!"}
              {isDragReject && "File type not accepted"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too Large</div>

              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
};

export default Dropzone;
