import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type User = {
  email: string;
  uid: string;
};

// posts:
export const postsState = atom({
  key: "posts",
  default: [
    {
      create: "",
      id: "",
      text: "",
      title: "",
      start: "",
      share: "",
      priority: "",
    }
  ],
  effects_UNSTABLE: [persistAtom],
});

// ログイン状態の保持
export const isLoginState = atom({
  key: 'isLoginState',
  default: false,
  effects_UNSTABLE: [persistAtom]
});

// userItem:user情報
export const userItemState: RecoilState<User> = atom({
  key: 'user',
  default: {},
  effects_UNSTABLE: [persistAtom]
});

export const filteredPostsLengthState = atom({
  key: "length",
  default: {
    All: 0,
    Today: 0,
    Tomorrow: 0,
    Next7Days: 0,
    Completed: 0,
  },
  effects_UNSTABLE: [persistAtom]
});