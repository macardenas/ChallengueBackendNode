import assert from 'assert'
import * as chai from 'chai'
import { DownloadFiles, FormatFile, ListFiles } from '../src/services/file.service.js'
import { getFiles } from '../src/controllers/file.controller.js'


const expect = chai.expect; 

describe('File Service',() =>{
    it('List Files',(done) =>{
        ListFiles()
        .then((response)=>{
            expect(response).to.have.property('files').with.lengthOf(9);
            expect(response).to.be.a('object');
            done();
        })
        .catch((done))
    })

    it('Download File CSV',(done) =>{
        DownloadFiles({ files:[ 'test1.csv', 'test2.csv']})
        .then((response)=>{
            expect(response).to.be.a('array');
            done();
        })
        .catch((done))
    })

    it('Download File Within CSV',(done) =>{
        DownloadFiles()
        .then((response)=>{
            expect(response).to.eq("Debe proporcionar datos para proporcionar tu solicitud")
            done();
        })
        .catch((done))
    })

    it('Download File Within Estructure',(done) =>{
        DownloadFiles({ filess:[]})
        .then((response)=>{
            expect(response).to.eq("Debe proporcionar datos para proporcionar tu solicitud")
            done();
        })
        .catch((done))
    })

})