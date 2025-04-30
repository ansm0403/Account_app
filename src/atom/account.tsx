import { atom } from "recoil";
import { AccountSnapshot } from "@/remote/account";

export const accountState = atom<AccountSnapshot[] | null>({
    key : "account",
    default : null,
})