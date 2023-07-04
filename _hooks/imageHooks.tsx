const Base64Hooks = () => {
    //converts the buffer data of an images to base64
    function toBase64(arr : Array<any>) {
        try {
            return btoa(
                arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        } catch (e) {
            console.log("Error in function toBase64: ", e);
        }
    }

    //checks if a string is base64
    function isBase64Image(str : string) {
        // Check if the string starts with "data:image" and contains ";base64,"
        return /^data:image\/\w+;base64,/.test(str);
    }

    function convertArrayToBase64(arr : Array<any>) {
        try {
            var base64arr = arr;
            base64arr.forEach(image => {
                if (image.data)
                    image.data = toBase64(image.data.data)
                if (image.base64)
                    image.data = toBase64(image.base64)
            })
            return base64arr
        } catch (e) {
            console.log("convertArrayToBase64 error: ", e)
        }
    }

    //The function "convertObjToBase64" is similar to the function "convertArrayToBase64", but it formats an image obj instead
    interface objContext {
        data: {
            data: Array<any>,
        }
        contentType: string, 
    }
    function convertObjToBase64(obj : objContext) {
        try {
            if (obj.data) {
                return {
                    data: toBase64(obj.data.data),
                    contentType: obj.contentType
                }
            }
            return obj;
        }
        catch (e) {
            console.log("convertObjToBase64 error: ", e)
        }
    }

    return {
        toBase64,
        isBase64Image,
        convertArrayToBase64,
        convertObjToBase64
    }
}

export {
    Base64Hooks, 
}