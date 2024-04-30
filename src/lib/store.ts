import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer, { setUser } from "./features/userSlice";
import { getUser } from "@/util/session";

export const fetchInitialUserData =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch) => {
    try {
      const response = await getUser();

      if (!response) {
        // console.log("Failed to fetch user data");
        return;
      }

      dispatch(
        //@ts-ignore
        setUser({ ...response, createdAt: response.createdAt.toISOString() })
      );
    } catch (error) {
      console.error("Error fetching initial user data:", error);
    }
  };

export type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// store.dispatch(fetchInitialUserData());
