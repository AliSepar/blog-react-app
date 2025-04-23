import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, SelectInput, RTE } from "../index";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues, reset } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  useEffect(() => {
    if (post) {
      reset({
        title: post.title || "",
        slug: post.$id || "",
        content: post.content || "",
        status: post.status || "active",
      });
    }
  }, [post, reset]);

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData); // the data will come from the state redux

  const submit = async (data) => {
    // if there is post which means it a edit - update
    if (post) {
      // first we will upload the file
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;

      if (file) {
        await appwriteService.deleteFile(post.featuredImage); // we have to wait until the file is delete
      }

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      // new post
      try {
        //   first update file
        const file =
          data.image[0] && data.image?.[0]?.size > 0
            ? await appwriteService.uploadFile(data.image[0])
            : null;
        // console.log("file from uploadFile:", file);
        if (file) {
          const fileId = file.$id;
          data.featuredImage = fileId;

          const dbPost = await appwriteService.createPost({
            ...data,
            featuredImage: file ? file.$id : undefined, // it's okay if it's undefined
            userId: userData.$id,
          });
          // if submit successful redirect user to the created post page
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      } catch (error) {
        console.error("Post creation failed:", error);
      }
    }
  };
  //   this function will cheng the space to (-)
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      // one way
      //   const slug = value.toLowerCase().replace(/ /g, "-");
      //   setValue("slug", slug);
      //   return slug;

      //   second way
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, []);

  // useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     if (name === "title") {
  //       setValue("slug", slugTransform(value.title), { shouldValidate: true });
  //     }
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [watch, slugTransform, setValue]);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const transformed = slugTransform(value?.title || "");
        setValue("slug", transformed, { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <Input
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          // readOnly={true}
          {...register("slug", { required: true })}
          // onInput={(e) => {
          //   setValue("slug", slugTransform(e.currentTarget.value), {
          //     shouldValidate: true,
          //   });
          // }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
          // onChange={(e) => {
          //   const fileList = e.target.files;
          //   if (fileList && fileList.length > 0) {
          //     setValue("image", fileList, { shouldValidate: true });
          //   }
          // }}
        />
        {post?.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <SelectInput
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full cursor-pointer"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
