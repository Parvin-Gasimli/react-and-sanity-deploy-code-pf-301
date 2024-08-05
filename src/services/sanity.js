import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2023-05-03",
  token: process.env.REACT_APP_SANITY_TOKEN,
});

export async function getPosts() {
  const posts = await client.fetch(
    '*[_type == "blog"]{_id,slug,desc,image,name,date}'
  );
  return posts;
}
export async function getUsers() {
  const posts = await client.fetch(
    '*[_type == "user"]{_id,name,email,telephone,image}'
  );
  return posts;
}

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  if (source) {
    return builder.image(source).url().toString();
  } else {
    return null;
  }
}
