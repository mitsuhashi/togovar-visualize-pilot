# Gene report / Variant

## Parameters

* `search_api` Search endpoint
  * default: https://togovar-stg.biosciencedbc.jp/search
*  `params` parameters
  * default: gnomad_genomes-gemj-BRCA2  
* `limit` Number of max records returned per request
  * default: 500

## Endpoint
{{ ep }}

## `search`
```javascript
async ({search_api, params, limit}) => {  
  let result_set = [];
  const MAX_ROWS = 10000;

  if(params == "gnomad_genomes-gemj-BRCA2"){
    params = "dataset%5Bjga_ngs%5D=0&dataset%5Bjga_snp%5D=0&dataset%5Btommo%5D=0&dataset%5Bhgvd%5D=0&dataset%5Bgnomad_exomes%5D=0&dataset%5Bclinvar%5D=0&frequency%5Bmatch%5D=all&quality=0&term=BRCA2";
  }else if("gnomad_genomes-gemj-chr1-1000000-1500000"){
    params = "dataset%5Bjga_ngs%5D=0&dataset%5Bjga_snp%5D=0&dataset%5Btommo%5D=0&dataset%5Bhgvd%5D=0&dataset%5Bgnomad_exomes%5D=0&dataset%5Bclinvar%5D=0&frequency%5Bmatch%5D=all&quality=0&term=1:1000000-1500000"
  }else if("gnomad_genomes-gemj-chr1-1000000-2000000"){
    params = "dataset%5Bjga_ngs%5D=0&dataset%5Bjga_snp%5D=0&dataset%5Btommo%5D=0&dataset%5Bhgvd%5D=0&dataset%5Bgnomad_exomes%5D=0&dataset%5Bclinvar%5D=0&frequency%5Bmatch%5D=all&quality=0&term=1:1000000-2000000"
  }else{
    return "";
  }

  let request = search_api.concat("?", params); 

  function waitASecond(message) {
    return new Promise((resolve) => {
       const res = await fetch(request.concat("&offset=", offset,"&limit=", limit)
      const res = await fetch(request.concat("&offset=", offset,"&limit=",limit));
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


  for(let offset = 0; offset < MAX_ROWS; offset += Number(limit)){
    const res = await fetch(request.concat("&offset=", offset,"&limit=", limit));
    let res_json = await res.json();
    if(res_json.data != undefined && res_json.data.length == 0){  break; }
    result_set = result_set.concat(res_json.data);
  }

  let tree = [];

  result_set.forEach(d => {
    let line = [];
    let gem_j_wga = undefined;
    let gnomad_genomes = undefined;

    if(d.frequencies != undefined){
       for(const f of d.frequencies){
         const source = f.source;
         const frequency = f.allele.frequency;
         if(source == "gem_j_wga"){ gem_j_wga = frequency; }
         else if(source == "gnomad_genomes"){ gnomad_genomes = frequency; }
       };
      if(gem_j_wga != undefined || gnomad_genomes != undefined){
        tree.push({
          gem_j_wga: gem_j_wga,
          gnomad_genomes: gnomad_genomes
        });
      }
    }
  });

  return tree;
};
```