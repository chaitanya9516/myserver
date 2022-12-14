import React from 'react'
import{Link} from 'react-router-dom'
import { FaYoutube, FaFilm } from 'react-icons/fa';

function Home() {
  return (
    <div className='d-lg-flex p-2 sections'>
    <Link exact="true" to='/Downloader'>
    <FaYoutube color='white' size='10rem'/>
    </Link>
    <Link exact="true" to='/Downloader'>
    <FaFilm color='white' style={{border: '200px'}} size='10rem'/>
    </Link>
    </div>
  )
}

export default Home