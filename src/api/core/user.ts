import { unInstance } from "@/service";

export function ceshiApi(repo: string) {
    return unInstance.post<any>("/posts", { postId: 5 });
}