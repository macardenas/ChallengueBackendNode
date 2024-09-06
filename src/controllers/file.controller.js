import { handleHttp } from "../utils/response.handle.js";
import { ListFiles, DownloadFiles } from "../services/file.service.js";

const getFiles = async (req, res) => {
    try {

        const response = await ListFiles();
        const downloadresponse = await DownloadFiles(response);
        handleHttp(res, 'SUCCESS',downloadresponse)
    } catch (error) {
        handleHttp(res, 'SERVER_ERROR', 'ERROR_GET_QUESTIONS');
    }
}


export { getFiles };