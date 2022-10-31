import { atom } from "recoil";
import { FOLDER } from "./constants";

export const loginState = atom({ key: "login", default: false });

export const adminState = atom({ key: "admin", default: false });

export const adminCategoryModalVisibleState = atom({
  key: "adminCategoryModal",
  default: false,
});

export const adminPageState = atom({
  key: "adminPage",
  default: { pageName: "Authorization Area", visible: false },
});

// 한 파일에 대한 공유 싱태/\
export const fileShareState = atom({
  key: "fileShare",
  default: {
    available: false,
    fileName: "",
    groupName: "",
  },
});

export const sideMenuState = atom({
  key: "sideMenu",
  default: FOLDER,
});
