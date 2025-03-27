import { userUploadFileApi } from "@/api";
import { isObject, isString } from "@/utils/is";
export function useUpload() {
    // 上传图片的公共逻辑
    const uploadFiles = async (filePaths: string[]) => {
        try {
            let urlArr = await Promise.all(
                filePaths.map(async (filePath) => {
                    const res = await userUploadFileApi({
                        filePath: filePath,
                        name: "file",
                        formData: {
                            type: "10",
                        },
                    });
                    return res.body; 
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
            console.log("chooseImageRes", chooseImageRes);
            const tempFilePaths = chooseImageRes.tempFilePaths;
            return isString(tempFilePaths) ? [tempFilePaths as string] : (tempFilePaths as string[]);
        } catch (error) {
            throw new Error("选择图片失败");
        }
    };

    return { selectImage, uploadFiles };
}
