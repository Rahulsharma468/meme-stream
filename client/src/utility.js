// The "callback" argument is called with either true or false
// depending on whether the image at "url" exists or not.
export const imageExists = (url, callback) => {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
}

// export const serverUrl = `http://ec2-13-58-184-139.us-east-2.compute.amazonaws.com:3000`;
export const serverUrl = `https://cors-anywhere.herokuapp.com/http://ec2-13-58-184-139.us-east-2.compute.amazonaws.com:3000`;
// export const serverUrl = `http://localhost:5000`;