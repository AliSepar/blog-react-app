import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";

function AllPost() {
  const [posts, setPost] = useState([]);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPost(posts.documents);
        setIsError(false);
      } else {
        setIsError(true);
      }
    });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {isError ? (
            <p className="text-red-500">Post Error</p>
          ) : (
            posts.map((post) => (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard key={post.$id} {...post} />
              </div>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
