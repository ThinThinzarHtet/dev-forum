import { ZodError } from "zod";

export interface ActionState {
  message: string;
  payload: FormData;
}

export const actionStateFilter = (
  error: unknown,
  formData: FormData,
): ActionState => {
  if (error instanceof ZodError || error instanceof Error) {
    console.log("error", error);
    console.log("error message", error.message);
    return {
      message: error.message,
      payload: formData,
    };
  } else {
    return {
      message: "An unknown error occurred",
      payload: formData,
    };
  }
};
