import React, { useState } from 'react'
import './css/YoutubeDownloader.css'
import { FaYoutube } from 'react-icons/fa';
// import axios from 'axios';

// import APIService from './APIServices';

// getting error to download utube video is in this file, which is getting url variable.

function Downloader() {
  const highlight = {padding:'800px'}
  const [url, setURL] = useState('');

//   function InsertArticle(body){
//     debugger;
//     return fetch(`http://localhost:5000/utubelink`,{
//         'method':'POST',
//          headers : {
//         'Content-Type':'application/json'
//   },
//   body:JSON.stringify(body)
// })
// .then(response => response.json())
// .catch(error => console.log(error))
// }

function handleClick() {
    debugger;
  // Send data to the backend via POST
  fetch('http://localhost:5000/utubelink', {  // Enter your IP address here

    method: 'POST', 
    mode: 'cors', 
    body: JSON.stringify(url) // body data type must match "Content-Type" header

  })
  
}


//   function handlePostQuery(query)
//   {

//     var myParams = {
//         data: url
//     }

//     if (query !== "") 
//     {
//       debugger;
//       axios.post('http://localhost:5000/utubelink', myParams).then(function(response)
//       {
//                 console.log(response);
//        //Perform action based on response
//       }).catch(function(error)
//       {
//             console.log(error);
//        //Perform action based on error
//       });
//     } 
//     else 
//     {
//         alert("The search query cannot be empty")
//     }
// }

  // async function createUser(url) {
  //   debugger;
  //   const response = await fetch('http://localhost:5000/utubelink', {
  //     method: 'POST',
  //     body: JSON.stringify(url),
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8"
  //     }
  //   });
  // }

  // const insertArticle = ({url}) =>{
  //   debugger;
  //     return fetch(`http://localhost:5000/utubelink`,{
  //         'method':'POST',
  //          headers : {'Content-Type':'application/json'},
  //         //  url:JSON.stringify({url})
  //          body:{"url": url}
  // })
  // .then(response => response.json())
  // .catch(error => console.log(error))
  // }
    // console.log({url} + "from insertArticle function")
    // APIService.InsertArticle({url})
    // .then((response) => props.insertedArticle(response))
    // .catch(error => console.log('error',error))
    // console.log({url})
  

  return (
    <div className='d-lg-flex p-2'>
        <FaYoutube color='red' width="100px" height="100px" padding="0px" x="200" y="200" className={highlight} />
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" onChange = {(event) => { console.log('change', setURL(event.target.value)); }}  placeholder="Paste your youtube url" aria-label="Search" />
          <button className="btn btn-outline-danger" type="submit" onClick={() => handleClick()}>Search</button>
        </form>
  </div>
  );
}
// onInput={e => setURL(e.target.value)}
// onChange = {(event) => { console.log('change', setURL(event.target.value)); }} check the line for how to console.log.
// i have to add local host address to json file to hit the jsonserver"proxy":localhost address

export default Downloader;
