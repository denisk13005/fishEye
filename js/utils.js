async function getData(url) {
  let resp = await fetch(url)
  .then(async(response)=>{
    if(!response.ok){
      throw new Error("error getting data");
    }
    return response.json().then((data)=>{
        return data.photographers;
    });
  })
  .catch((error) => { 
    console.log(error);
  });
  return resp;
}
export  { getData};

