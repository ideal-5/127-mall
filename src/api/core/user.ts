import { unInstance } from "@/service";

export function ceshiApi(repo: string) {
    return unInstance.post<any>("/posts789", { postId: 5 });
}