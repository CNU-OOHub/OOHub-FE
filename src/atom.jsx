import { atom } from "recoil";

export const loginState = atom({ key: "login", default: true });

export const adminState = atom({ key: "admin", default: false });

export const adminCategoryModalVisibleState = atom({
  key: "adminCategoryModal",
  default: false,
});

export const adminPageState = atom({
  key: "adminPage",
  default: "Authorization Area",
});

export const fileShareState = atom({
  key: "fileShare",
  default: {
    available: false,
    fileName: "",
  },
});
