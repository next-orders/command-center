"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { CurrencyCode, LanguageCode, MainAPI } from "@next-orders/api-sdk";
import { COOKIES_ACCESS_TOKEN_KEY, COOKIES_LOCALE_KEY } from "@/lib/helpers";
import { Locale } from "@/dictionaries";
import { revalidateTag } from "next/cache";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "no-api-url-env";

const api = new MainAPI(API_URL, ""); // Public access only

const apiWithAccess = () => {
  const accessToken = cookies().get(COOKIES_ACCESS_TOKEN_KEY)?.value || "";
  return new MainAPI(API_URL, accessToken);
};

export const SetLocale = (locale: Locale) => {
  cookies().set(COOKIES_LOCALE_KEY, locale);
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

export const CreateChannelForm = async (prevState: any, formData: FormData) => {
  const slug = (formData.get("slug") as string) || "";
  const name = (formData.get("name") as string) || "";
  const description = (formData.get("description") as string) || "";
  const currencyCode = (formData.get("currencyCode") as CurrencyCode) || "";
  const languageCode = (formData.get("languageCode") as LanguageCode) || "";

  const create = await apiWithAccess().createChannel(
    { slug, name, description, currencyCode, languageCode },
    { next: { revalidate: 0 } },
  );
  if (create instanceof Error) {
    return {
      message: create.message,
    };
  }

  revalidateTag("channels");

  return { message: "OK" };
};

export const CreateMediaForm = async (prevState: any, formData: FormData) => {
  // alt, file
  const create = await apiWithAccess().uploadMedia(formData, {
    next: { revalidate: 0 },
  });
  if (create instanceof Error) {
    return {
      message: create.message,
    };
  }

  revalidateTag("media");

  return { message: "OK" };
};

export const CreateProductionForm = async (
  prevState: any,
  formData: FormData,
) => {
  const type = "PRODUCTION";
  const name = (formData.get("name") as string) || "";
  const description = (formData.get("description") as string) || "";

  const create = await apiWithAccess().createProduct(
    { type, name, description },
    { next: { revalidate: 0 } },
  );
  if (create instanceof Error) {
    return {
      message: create.message,
    };
  }

  revalidateTag("products");

  return { message: "OK" };
};
