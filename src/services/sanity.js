import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
export const client = createClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
  dataset: process.env.REACT_APP_SANITY_DATASET || "production",
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
export async function createUser(body) {
  const user = {
    _type: "user",
    name: body.get("name"),
    email: body.get("email"),
    telephone: body.get("telephone"),
    image: body.get("image"),
  };

  const createdUser = await client.create(user, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SANITY_TOKEN}`,
    },
  });

  return createdUser;
}

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  if (source) {
    return builder.image(source).url().toString();
  } else {
    return null;
  }
}
