const keyName = "user";
function login(obj) {
console.log("Logged in successfully");
let str = JSON.stringify(obj);
localStorage.setItem(keyName, str);
}
function getUser() {
    let str =localStorage.getItem(keyName); 
    let obj = str ? JSON.parse(str) : null;
     return obj;
}
function logout() {
    localStorage.removeItem(keyName)
    }
export default{login,logout,getUser,}