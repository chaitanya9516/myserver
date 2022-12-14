export default class APIService{
    // Insert an article
    static InsertArticle(url){
        return fetch(`http://localhost:5000/mnamesloc`,{
            'method':'GET',
             headers : {
            'Content-Type':'application/json'
      },
      url:JSON.stringify(url)
    })
    .then(response => response.json())
    .catch(error => console.log(error))
    }

}