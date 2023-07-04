import PropTypes from 'prop-types'; 

const ImageHooks = () => {

    function isBase64Image(str) {
        // Check if the string starts with "data:image" and contains ";base64,"
        return /^data:image\/\w+;base64,/.test(str);
    }

    return {isBase64Image}
}

function HandleFileChange(evt, setImage) {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        setImage(reader.result);
    }
}

HandleFileChange.propTypes = {
    setImages: PropTypes.func, 
}

function AttachImagesToArray(evt, setImage) {
    const files = evt.target.files;
    var images = null;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        //Create FileReader
        //This is how you can access the necessary file resources of an image 
        const reader = new FileReader();
        reader.readAsDataURL(file)

        //Everytime the reader is loaded with something, add the necessary resources into the images array
        reader.onload = () => {
            images = {
                file: file,
                base64: reader.result,
            };
            setImage(prev => [...prev, images])
        }
    }
}

AttachImagesToArray.propTypes = {
    setImages: PropTypes.func,
}

const Base64Hooks = () => {
    //converts the buffer data of an images to base64
    function toBase64(arr) {
        try {
            return btoa(
                arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        } catch (e) {
            console.log("Error in function toBase64: ", e);
        }
    }

    //checks if a string is base64
    function isBase64Image(str) {
        // Check if the string starts with "data:image" and contains ";base64,"
        return /^data:image\/\w+;base64,/.test(str);
    }

    //This function "convertArrayToBase64" is neccessary because the images retrieved from the server comes in the following format:
    /**
     * imageArr = [
     * {data: {
     *  data: <non-base64 data or blob>
     * },
     *  contentType: <contentType>,     
     * }] 
     * */
    function convertArrayToBase64(arr) {
        try {
            var base64arr = arr;
            base64arr.forEach(image => {
                if(image.data)
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
    function convertObjToBase64(obj) {
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

//converts an image to a file format
const formatExistingImageArray = (imgArr) => {
    var formatted = []
    imgArr.forEach(img => {
        const reader = new FileReader() 
        const imgblob = new Blob([img.data], {type: img.contentType});

        reader.readAsDataURL(imgblob);
        reader.onload = () => {
            var images = {
                file: img,
                base64: reader.result,
            };
            formatted.push(images); 
        }
    })
    return formatted 
}

const convertImageToFile = (image) => {
    try {
        var byteString = atob(image.data);
        var mimeType = image.contentType; // or 'image/png' or 'image/gif', depending on the image format
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var uint8Array = new Uint8Array(arrayBuffer);

        // Fill the ArrayBuffer with the binary data
        for (var i = 0; i < byteString.length; i++) {
            uint8Array[i] = byteString.charCodeAt(i);
        }

        // Create a new Blob object from the ArrayBuffer
        var blob = new Blob([arrayBuffer], { type: mimeType });

        // Create a new File object from the Blob
        var file = new File([blob], 'filename.jpg', { type: mimeType });
        return file; 
    } catch (e) {
        console.log("convertImageToFile error: ", e)
    }
}

export {
    ImageHooks,
    HandleFileChange,
    AttachImagesToArray,
    Base64Hooks,
    formatExistingImageArray,
    convertImageToFile, 
}