import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

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
})