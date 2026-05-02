export const aboutPath = "/about";

export const postsPath = "/posts";

export const editPostPath = (id: string | number) => `${postsPath}/${id}/edit`;

export const singlePostPath = (id: string | number) => `${postsPath}/${id}`;

export const signUpPath = "/auth/sign-up";
export const signInPath = "/auth/sign-in";
export const forgotPasswordPath = "/forgot-password";
