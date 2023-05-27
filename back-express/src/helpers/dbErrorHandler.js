const getError = err => {
    let mess = '';
    if (err.code){
        mess: "something is wrong"
        console.log(err)
    } else {
        console.log("else errors in if (err.code)")
    }
}
export default { getError };