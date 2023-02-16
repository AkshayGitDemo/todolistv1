
exports.getDate= function () {

let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
let today = new Date();
let day = today.toLocaleDateString("hi-IN", options);
return day;

};
exports.getDay= function () {

    let options = {
        weekday: 'long',
    };
    let today = new Date();
    let day = today.toLocaleDateString("hi-IN", options);
    return day;
    
    };