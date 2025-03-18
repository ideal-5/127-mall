// import { uploadImg as fetchUploadImg } from "@/api/login";
import { isObject, isString } from "@/utils/is";
export function useUpload() {
    // 上传图片的公共逻辑
    const uploadFiles = async (filePaths: string[]) => {
        try {
            let urlArr = await Promise.all(
                filePaths.map(async (filePath) => {
                    // 调接口
                    // const jsonRes = await fetchUploadImg({ filePath });
                    // const res = JSON.parse(jsonRes);
                    // return res.data; // 假设返回的数据结构为 { data: 'url' }
                })
            );
            return urlArr;
        } catch (error) {
            console.error("上传图片失败", error);
            throw error; // 可以根据需求决定是否需要继续抛出错误
        }
    };
    // 选择图片
    const selectImage = async (count: number | UniApp.ChooseImageOptions = 9): Promise<string[]> => {
        let params = isObject(count) ? count : { count };
        try {
            const chooseImageRes = await uni.chooseImage(params as UniApp.ChooseImageOptions);
            const tempFilePaths = chooseImageRes.tempFilePaths;
            return isString(tempFilePaths) ? [tempFilePaths as string] : (tempFilePaths as string[]);
        } catch (error) {
            throw new Error("选择图片失败");
        }
    };

    return { selectImage, uploadFiles };
}
