"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { MainAPI } from "@next-orders/api-sdk";
import { COOKIES_ACCESS_TOKEN_KEY } from "@/lib/helpers";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "no-api-url-env";

const api = new MainAPI(API_URL, ""); // Public access only

const apiWithAccess = () => {
  const accessToken = cookies().get(COOKIES_ACCESS_TOKEN_KEY)?.value || "";
  return new MainAPI(API_URL, accessToken);
};

export const SignInForm = async (prevState: any, formData: FormData) => {
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

  const employee = await api.signInEmployeeByEmail(
    { email, password },
    { next: { revalidate: 0 } },
  );
  if (employee instanceof Error) {
    return { message: "Data is not correct" };
  }

  // Valid data
  if (employee.result.access_token) {
    // Set Access Token in Cookie
    cookies().set(COOKIES_ACCESS_TOKEN_KEY, employee.result.access_token);
  }

  redirect("/dashboard");
};

export const SignOut = () => {
  cookies().delete(COOKIES_ACCESS_TOKEN_KEY);
  redirect("/auth/login");
};

export const GetEmployeeAccessPayload = async () => {
  const accessToken = cookies().get(COOKIES_ACCESS_TOKEN_KEY)?.value || "";
  const payload = await apiWithAccess().verifyToken(accessToken, {
    next: { revalidate: 60, tags: ["all", "token"] },
  });
  if (payload instanceof Error) {
    if (payload.message.includes("400")) {
      throw new Error("Access Token is not valid");
    }
    throw new Error("Unknown");
  }

  return payload;
};

export const CreateShopForm = async (prevState: any, formData: FormData) => {
  const name = (formData.get("name") as string) || "";
  const description = (formData.get("description") as string) || "";

  const create = await api.createShop(
    { name, description },
    { next: { revalidate: 0 } },
  );
  if (create instanceof Error) {
    return { message: "Data is not correct" };
  }

  redirect("/dashboard");
};
