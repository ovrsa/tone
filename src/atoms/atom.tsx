import { atom, RecoilState } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export type User = {
  email: string;
  uid: string;
};
export const postsState = atom({
  key: "posts",
  default: [
    {
      create: "",
      id: "",
      text: "",
      title: "",
      start: "",
      share: ""
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

// userの情報を保持
export const userItemState: RecoilState<User> = atom({
  key: 'user',
  default: {},
  effects_UNSTABLE: [persistAtom]
});