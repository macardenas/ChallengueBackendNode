import { handleHttp } from "../utils/response.handle.js";
import { ListFiles, DownloadFiles, fetchDataParams } from "../services/file.service.js";

const getFiles = async (req, res) => {
    try {

        const response = await ListFiles();
        const downloadresponse = await DownloadFiles(response);
        handleHttp(res, 'SUCCESS',downloadresponse)
    } catch (error) {
        handleHttp(res, 'SERVER_ERROR', 'ERROR_GET_QUESTIONS');
    }
}

const ListFilesC = async (req, res) => {
    try {

        const response = await ListFiles();
        handleHttp(res, 'SUCCESS',response)
    } catch (error) {
        handleHttp(res, 'SERVER_ERROR', 'ERROR_GET_QUESTIONS');
    }
}


const SearchFile = async (req, res) => {
    try {
        const response = await fetchDataParams(req.params.namefile);
        if(response.length == 0) return handleHttp(res, 'NOT_FOUND',response)
        handleHttp(res, 'SUCCESS',response)
    } catch (error) {
        handleHttp(res, 'SERVER_ERROR', 'ERROR_GET_QUESTIONS');
    }
}


export { getFiles, ListFilesC, SearchFile };