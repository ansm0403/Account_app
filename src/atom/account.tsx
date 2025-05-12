import { atom } from "recoil";
import { AccountSnapshot } from "@/remote/account";

export const accountState = atom<AccountSnapshot[] | null | undefined>({
    key : "account",
    default : null,
})