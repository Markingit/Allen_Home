import React, { FC, useRef, ChangeEvent, useState } from "react"
import axios from 'axios'

import Button, { ButtonType } from '../Button/button'
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any
}


export interface UploadProps {
    action: string,
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgress?: (percentage: number, file: File) => void
    onSuccess?: (data: any, file: File) => void
    onError?: (err: any, file: File) => void
    onChange?: (file: File) => void
}

export const Upload: FC<UploadProps>=(props) => {
    const {
        action,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        children
    } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [ fileList, setFileList ] = useState<UploadFile[]>([])
    const handleClick = () => {
        if(fileInput.current) {
            fileInput.current.click()
        }
    }

    const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList(prevList => {
          return prevList.map(file => {
            if (file.uid === updateFile.uid) {
              return { ...file, ...updateObj }
            } else {
              return file
            }
          })
        })
      }

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if(!files) {
            return
        }
        uploadFiles(files)
        if (fileInput.current) {
            fileInput.current.value = ''
        }
    }
    const uploadFiles = (files: FileList) => {
        let postFile = Array.from(files)
        postFile.forEach(file => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then(processedFile => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
            
        }) 
    }

    const post = (file: File) => {
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFileList([_file, ...fileList])
        const formData = new FormData()
            formData.append(file.name, file)
            axios.post(action, formData, {
                headers: {
                    'Content-type': 'multipart/form-data'
                },
                onUploadProgress: (e) => {
                    let percentage = Math.round((e.loaded * 100) / e.total) || 0;
                    if (percentage < 100) {
                        updateFileList(_file, { percent: percentage, status: 'uploading'})
                        if (onProgress) {
                          onProgress(percentage, file)
                        }
                      }
                }
            }).then(res => {
                updateFileList(_file, {status: 'success', response: res.data})
                console.log(res)
                if (onSuccess) {
                    onSuccess(res.data, file)
                }
                if (onChange) {
                    onChange(file)
                }
            }).catch(err => {
                updateFileList(_file, { status: 'error', error: err})
                console.log(err)
                if (onError) {
                    onError(err, file)
                }
                if (onChange) {
                    onChange(file)
                }
            })
    }
    console.log(fileList)
     return (
         <div
            className="viking-upload-component"
         >

            {/* <Button 
                btnType={ButtonType.Primary}
                onClick={handleClick}
            >
                Upload File
            </Button> */}
            <div 
                className="viking-upload-input"
                style={{display: 'inline-block'}}
                onClick={handleClick}>
          {/* {drag ? 
            <Dragger onFile={(files) => {uploadFiles(files)}}>
              {children}
            </Dragger>:
            children
          } */}
          {children}
            <input
                className="viking-file-input" 
                style={{display: 'none'}}
                ref={fileInput}
                onChange={handleFileChange}
                type="file"
            />
            </div>
         </div>
     )
 }

 export default Upload