import { atom } from "recoil";

export const loginState = atom({ key: "login", default: true });

export const adminState = atom({key: "admin", default: true})