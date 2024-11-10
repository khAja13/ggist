import { getUser } from "@/util/session";
import { atom, selector } from "recoil";

// export interface Gists {
//     id: string;
//     createdAt: string;
//     title: string;
//     content: string;
//     updatedAt: string;
//     user: string;
//   }

//   export interface UserState {
//     id: string;
//     createdAt: string;
//     email: string;
//     picture: string;
//     name: string;
//     gists: Gists[];
//   }

export const userState = atom({
    key: "user",
    default: [],
});

export const gistState = atom({
    key: "gist",
    default: [],
});

export const usersSelector = selector({
    key: "usersSelector",
    get: async ({ get }) => {
        const users = get(userState);

        if (users.length > 0) {
            return users;
        }

        try {
            const response = await getUser();

            if (!response) {
                throw new Error("Failed to fetch users");
            }

            return response;
        } catch (error) {
            console.log("Error fetching users", error);
        }
    },
});
