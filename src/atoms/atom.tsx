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
      title: ""
    }
  ],
  effects_UNSTABLE: [persistAtom],
});
