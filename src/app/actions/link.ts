"use server";

import dbConnect from "@/db";
import { default as Link } from "@/models/link.model";
import { createRandomKey } from "@/utils/create-key.utils";
import { currentUser } from "@clerk/nextjs/server";

export const addLink = async (link: string) => {
  const user = await currentUser();
  const userEmail =
    user?.emailAddresses?.[0]?.emailAddress ?? "defaultEmail@gmail.com";
  const key = createRandomKey();
  try {
    await dbConnect();

    const newLink = new Link({
      link,
      key,
      userEmail,
    });

    const data = await newLink.save();

    const result = {
      id: data._id.toString(),
      link: data.link,
      key: data.key,
      userEmail: data.userEmail,
    };

    return result;
  } catch (error) {
    console.error("Error details:", error);
    throw new Error("Error while adding link");
  }
};

export const getAllLinks = async () => {
  const user = await currentUser();
  const userEmail = user?.emailAddresses?.[0]?.emailAddress;

  try {
    await dbConnect();
    const data = await Link.find({ userEmail });

    const result = data.map((item) => ({
      id: item._id.toString(),
      link: item.link,
      key: item.key,
      userEmail: item.userEmail,
    }));

    return result;
  } catch (error) {
    console.error("Error details:", error);
    throw new Error("Error while getting all links");
  }
};

export const deleteLink = async (id: string) => {
  try {
    await dbConnect();
    const result = await Link.findByIdAndDelete(id);
    console.log(result);
  } catch (error) {
    console.error("Error details:", error);
    throw new Error("Error while deleting link");
  }
};
