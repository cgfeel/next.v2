"use server";

export const submitAction = async () => {
  console.log("form:", Date.now(), '-action-1');
};

export const linkAction = async () => {
  console.log("link:", Date.now(), '-action');
};
