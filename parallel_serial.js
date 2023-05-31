function waitASecond(message) {
    return new Promise((resolve) => {
        let request = search_api.concat("?", params); 
        const res = await fetch(request.concat("&offset=", offset,"&limit=",limit));
        let res_json = await res.json();
        if(res_json.data != undefined && res_json.data.length == 0){  break; }
        result_set = result_set.concat(res_json.data);
        resolve(message);
    })
}
const num = ["one", "two", "three", "four"]
const result = [];
const parallel = () => {
    
    for (var i in num) {
        result.push(waitASecond(num[i]));
    }
    result.forEach(async (a) => console.log(await a));
};
const serial = async () => {
    for (var i in num) {
        result.push(await waitASecond(num[i]));
    }
    result.forEach((a) => console.log(a));
};
process.on('exit', function (code) {
    console.timeEnd("four");
});
console.time("four");
if (process.env.P) {
    console.log("parallel");
    parallel();
} else {
    console.log("serial");
    serial();
}