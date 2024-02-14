export interface ResponseInterface {
    status:number;
    data:any;
    error?:string;
    message?:string;
}

export const formatResponse = (status:number, message:string, data?:any):ResponseInterface => {
    const response:any = {
        status
    }
    if(status >= 400) {
        response.error = message
    } else {
        response.message = message
    }

    if (data){
        response.data = data
    }

    return response
}