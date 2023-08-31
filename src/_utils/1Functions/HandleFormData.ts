export function createFormData(data:any){
    var formData = new FormData();
    Object.keys(data).forEach((key) => {
        formData.append(key, data[key])
    })
    return formData

}