const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000"
    : "https://domain.com";

export const api = {
  posts: {
    list: `${baseURL}/api/posts/`,
    retrieve: (postSlug) => `${baseURL}/api/posts/${postSlug}/`,
    create: `${baseURL}/api/posts/create/`,
  },
};
