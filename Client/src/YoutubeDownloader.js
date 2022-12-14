import React, { useState } from 'react'
import './css/YoutubeDownloader.css'
import { FaYoutube } from 'react-icons/fa';

function Downloader() {
  const highlight = {padding:'800px'}
  const [url, setUrl] = useState('');

      function componentDidMount() {
          fetch("http://localhost:5000/mnamesloc")
          .then(res => res.json())
          .then(
          (result) => { console.log(result)});
          debugger;
        }

  return (
    <div className='d-lg-flex p-2'>
        <FaYoutube color='red' width="100px" height="100px" padding="0px" x="200" y="200" className={highlight} />
        <form className="d-flex" role="search">
          {/* <input className="form-control me-2" type="search" onChange = {(event) => { console.log('change', setUrl(event.target.value)); }}  placeholder="Paste your youtube url" aria-label="Search" /> */}
          <button className="btn btn-outline-danger" type="submit" onClick={() => componentDidMount()}>Download</button>
        </form>
  </div>
  );
}
// onInput={e => setURL(e.target.value)}
// onChange = {(event) => { console.log('change', setURL(event.target.value)); }} check the line for how to console.log.
// i have to add local host address to json file to hit the jsonserver"proxy":localhost address

export default Downloader
