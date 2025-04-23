import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

// its appwrite thing that need $ in the id variable
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            // the featuredImage is the id of image which is stored in the post table so to get the image we
            // the getFilePreview to give the path of the image stored in storage
            alt={title}
            className="rounded-xl"
          />
        </div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
