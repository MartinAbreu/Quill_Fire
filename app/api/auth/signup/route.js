import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export const POST = async (req, res) => {
  if (req.method === "POST") {
    const newUser = await req.json();

    const doesUserExist = async (email, username) => {
      const [userByEmail, userByUsername] = await Promise.all([
        User.findOne({ email }),
        User.findOne({ username }),
      ]);

      return {
        emailExists: !!userByEmail,
        usernameExists: !!userByUsername,
      };
    };

    const { emailExists, usernameExists } = await doesUserExist(
      newUser.email,
      newUser.username,
    );

    if (emailExists) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "A user with the same email already exists!",
          userExists: true,
        }),
        { status: 400 },
      );
    }
    if (usernameExists) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "This username already exists",
          userExists: true,
        }),
        { status: 400 },
      );
    }

    try {
      const storeUser = new User(newUser);
      await storeUser.save();
      console.log(storeUser);
      return new Response(
        JSON.stringify({ success: true, message: "User has been created" }),
        { status: 200 },
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid method" }),
        { status: 400 },
      );
    }
  }
};
