// import { connect } from "@/DBConfig/dbConfig";
// import NextAuth from "next-auth";
// import type { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

//       profile: (profile) => {
//         console.log(profile);

//         return {
//           id: profile.sub, // Using 'sub' property as the 'id'
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//           googleEmail: profile.email,
//         };
//       },
//     }),

//     // Add other providers here if needed
//   ],
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

//========================================================================================================================================
// import { connect } from "@/DBConfig/dbConfig";
// import NextAuth from "next-auth";
// import type { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import User from "@/models/user";

// connect();

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

//       profile: (profile) => {
//         console.log(profile);

//         return {
//           id: profile.sub, // Using 'sub' property as the 'id'
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//           googleEmail: profile.email,
//         };
//       },
//     }),

//     // Add other providers here if needed
//   ],

//   events: {
//     async createUser(profile) {
//       // Check if the user is signing in with Google
//       if (profile.googleEmail) {
//         // Check if a user with the same Google email already exists
//         const existingUser = await User.findOne({ email: profile.googleEmail });
//         if (existingUser) {
//           throw new Error("User with the same Google email already exists");
//         }

//         // Create the new user with the Google email
//         const newUser = new User({
//           username: profile.name,
//           email: profile.googleEmail, // Use the Google email as the registered email
//           isVerified: true, // Google email is already verified
//         });

//         try {
//           const savedUser = await newUser.save();
//           // You can send a verification email here as well, but since it's Google, it's already verified.
//           console.log("New user created:", savedUser);
//           return savedUser; // Return the new user object
//         } catch (error) {
//           console.error("User creation failed:", error);
//           throw new Error("User creation failed");
//         }
//       }

//       // If the user is not signing in with Google, you can handle regular signup logic here if needed

//       // Throw an error if no user is created (if this function is called for regular signups)
//       throw new Error("User creation failed");
//     },
//     // Other callback functions...
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

//=============================================================================================================================================
// import { connect } from "@/DBConfig/dbConfig";
// import NextAuth from "next-auth";
// import type { NextAuthOptions, Profile } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import User, { IUserDocument } from "@/models/user"; // Import your own User model

// connect();

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

//       profile: (profile) => {
//         console.log(profile);

//         return {
//           id: profile.sub, // Using 'sub' property as the 'id'
//           name: profile.name as string,
//           email: profile.email as string,
//           image: profile.picture,
//           googleEmail: profile.email as string,
//         };
//       },
//     }),

//     // Add other providers here if needed
//   ],

//   events: {
//     createUser: async (profile: Profile) => {
//       // Check if the user is signing in with Google
//       if (profile.googleEmail) {
//         // Check if a user with the same Google email already exists
//         const existingUser = await User.findOne({ email: profile.googleEmail });
//         if (existingUser) {
//           throw new Error("User with the same Google email already exists");
//         }

//         // Create the new user with the Google email
//         const newUser: IUserDocument = new User({
//           username: profile.name as string,
//           email: profile.googleEmail as string, // Use the Google email as the registered email
//           isVerified: true, // Google email is already verified
//         });

//         try {
//           const savedUser: IUserDocument = await newUser.save();
//           // You can send a verification email here as well, but since it's Google, it's already verified.
//           console.log("New user created:", savedUser);
//           return savedUser; // Return the new user object
//         } catch (error) {
//           console.error("User creation failed:", error);
//           throw new Error("User creation failed");
//         }
//       }

//       // If the user is not signing in with Google, you can handle regular signup logic here if needed

//       // Throw an error if no user is created (if this function is called for regular signups)
//       throw new Error("User creation failed");
//     },
//     // Other callback functions...
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

//==================================================================================================================================
// import { connect } from "@/DBConfig/dbConfig";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import User, { IUserDocument } from "@/models/user"; // Import your own User model

// connect();

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,

//       profile: (profile) => {
//         console.log(profile);

//         return {
//           id: profile.sub, // Using 'sub' property as the 'id'
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//           googleEmail: profile.email,
//         };
//       },
//     }),

//     // Add other providers here if needed
//   ],

//   events: {
//     createUser: async ({ id, name, googleEmail }) => {
//       console.log("THIS IS A USER OF GOOGLE", user);

//       // Check if the user is signing in with Google
//       if (googleEmail) {
//         // Check if a user with the same Google email already exists
//         const existingUser = await User.findOne({ email: googleEmail });

//         if (existingUser) {
//           throw new Error("User with the same Google email already exists");
//         }

//         // Create the new user with the Google email
//         const newUser = new User({
//           username: name,
//           email: googleEmail, // Use the Google email as the registered email
//           isVerified: true, // Google email is already verified
//         });

//         try {
//           const savedUser = await newUser.save();
//           // You can send a verification email here as well, but since it's Google, it's already verified.
//           console.log("New user created:", savedUser);
//           return savedUser; // Return the new user object
//         } catch (error) {
//           console.error("User creation failed:", error);
//           throw new Error("User creation failed");
//         }
//       }

//       // If the user is not signing in with Google, you can handle regular signup logic here if needed

//       // Throw an error if no user is created (if this function is called for regular signups)
//       throw new Error("User creation failed");
//     },
//     // Other callback functions...
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

//============================================================================================================================================
// import { connect } from "@/DBConfig/dbConfig";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import User, { IUserDocument } from "@/models/user"; // Import your own User model

// connect();

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,

//       profile: (profile) => {
//         console.log(profile);

//         return {
//           id: profile.sub, // Using 'sub' property as the 'id'
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//           googleEmail: profile.email,
//         };
//       },
//     }),

//     // Add other providers here if needed
//   ],

//   callbacks: {
//     async createUser({ user }) {
//       console.log("THIS IS A USER OF GOOGLE", user);

//       // Check if the user is signing in with Google
//       if (user.googleEmail) {
//         // Check if a user with the same Google email already exists
//         const existingUser = await User.findOne({ email: user.googleEmail });

//         if (existingUser) {
//           throw new Error("User with the same Google email already exists");
//         }

//         // Create the new user with the Google email
//         const newUser = new User({
//           username: user.name,
//           email: user.googleEmail, // Use the Google email as the registered email
//           isVerified: true, // Google email is already verified
//         });

//         try {
//           const savedUser = await newUser.save();
//           // You can send a verification email here as well, but since it's Google, it's already verified.
//           console.log("New user created:", savedUser);
//           return savedUser; // Return the new user object
//         } catch (error) {
//           console.error("User creation failed:", error);
//           throw new Error("User creation failed");
//         }
//       }

//       // If the user is not signing in with Google, you can handle regular signup logic here if needed

//       // Throw an error if no user is created (if this function is called for regular signups)
//       throw new Error("User creation failed");
//     },
//     // Other callback functions...
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

//=============================================================================================================================================
// import { connect } from "@/DBConfig/dbConfig";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import User from "@/models/user"; // Import your own User model

// connect();

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,

//       profile: (profile) => {
//         console.log(profile);

//         return {
//           id: profile.sub, // Using 'sub' property as the 'id'
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//           googleEmail: profile.email,
//         };
//       },
//     }),

//     // Add other providers here if needed
//   ],

//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account.provider === "google") {
//         // Check if a user with the same Google email already exists
//         const existingUser = await User.findOne({ email: profile.googleEmail });
//         if (existingUser) {
//           return true; // User already exists, allow sign-in
//         }

//         // Create the new user with the Google email
//         const newUser = new User({
//           username: profile.name,
//           email: profile.googleEmail, // Use the Google email as the registered email
//           password: "googleuser", // Set a default password for Google users
//           isVerified: true, // Since there's no email verification, consider the user as verified
//         });

//         try {
//           const savedUser = await newUser.save();
//           // You can send a verification email here as well, but since there's no email verification, the user is considered verified.
//           console.log("New user created:", savedUser);
//           return true; // Allow sign-in for the newly created user
//         } catch (error) {
//           console.error("User creation failed:", error);
//           return false; // Deny sign-in if user creation failed
//         }
//       }

//       // For other providers, allow sign-in by default
//       return true;
//     },
//     // Other callback functions...
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

//==========================================================================================================================================
// import { connect } from "@/DBConfig/dbConfig";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import User from "@/models/user"; // Import your own User model
// import { randomBytes } from "crypto";
// import bcrypt from "bcryptjs";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,

//       profile: (profile) => {
//         console.log(profile);

//         return {
//           id: profile.sub, // Using 'sub' property as the 'id'
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//           googleEmail: profile.email,
//         };
//       },
//     }),

//     // Add other providers here if needed
//   ],

//   callbacks: {
//     async signIn({ profile }) {
//       try {
//         await connect();
//         // Check if the user exists, if not create
//         const existingUser = await User.findOne({ email: profile.email });
//         if (!existingUser) {
//           // Generate a random password for Google users
//           const randomPassword = randomBytes(8).toString("hex");

//           // Create the new user with the Google email and random password
//           const newUser = new User({
//             username: profile.email,
//             email: profile.email,
//             password: randomPassword,
//             isVerified: true,
//             provider: "google",
//           });

//           try {
//             const savedUser = await newUser.save();
//             // You can send a verification email here as well, but since there's no email verification, the user is considered verified.
//             console.log("New user created:", savedUser);
//           } catch (error) {
//             console.error("User creation failed:", error);
//           }
//         }
//         return true; // Allow sign-in for all users
//       } catch (error) {
//         console.error("Sign-in error:", error);
//         return false; // Deny sign-in on error
//       }
//     },
//     // Other callback functions...
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

//=====================================================================================================================================
// import { connect } from "@/DBConfig/dbConfig";
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import User, { IUserDocument } from "@/models/user"; // Import your own User model

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,

//       profile: (profile) => {
//         console.log(profile);

//         return {
//           id: profile.sub, // Using 'sub' property as the 'id'
//           name: profile.name,
//           email: profile.email,
//           image: profile.picture,
//           googleEmail: profile.email,
//         };
//       },
//     }),

//     // Add other providers here if needed
//   ],

//   callbacks: {
//     async signIn({ profile, email, password }) {
//       try {
//         await connect();
//         // Check if the user exists
//         const existingUser = await User.findOne({ email: profile.email });
//         if (existingUser) {
//           // User found, compare the password
//           if (existingUser.password === password) {
//             // Password is correct, allow sign-in
//             return true;
//           } else {
//             // Password is incorrect, deny sign-in
//             return false;
//           }
//         } else {
//           // User not found, create the user (same as before)
//           const newUser = new User({
//             username: profile.email,
//             email: profile.email,
//             password: password,
//             isVerified: true,
//             provider: "google",
//           });
//           try {
//             const savedUser = await newUser.save();
//             console.log("New user created:", savedUser);
//             return true;
//           } catch (error) {
//             console.error("User creation failed:", error);
//             return false;
//           }
//         }
//       } catch (error) {
//         console.error("Sign-in error:", error);
//         return false; // Deny sign-in on error
//       }
//     },
//     // Other callback functions...
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

//=======================================================================================
import { connect } from "@/DBConfig/dbConfig";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User, { IUserDocument } from "@/models/user"; // Import your own User model

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      profile: (profile) => {
        console.log(profile);

        return {
          id: profile.sub, // Using 'sub' property as the 'id'
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          googleEmail: profile.email,
        };
      },
    }),

    // Add other providers here if needed
  ],

  callbacks: {
    async signIn({ profile }) {
      try {
        await connect();
        // Check if the user exists
        const existingUser = await User.findOne({ email: profile.email });
        if (existingUser) {
          // User found, allow sign-in
          return true;
        } else {
          // User not found, create the user
          const newUser = new User({
            username: profile.email,
            email: profile.email,
            isVerified: true,
            provider: "google",
          });
          try {
            const savedUser = await newUser.save();
            console.log("New user created:", savedUser);
            return true;
          } catch (error) {
            console.error("User creation failed:", error);
            return false;
          }
        }
      } catch (error) {
        console.error("Sign-in error:", error);
        return false; // Deny sign-in on error
      }
    },
    // Other callback functions...
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
