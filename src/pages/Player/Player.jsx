import React, { useContext, useEffect, useRef, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

import { ListContext } from '../../context/ListContext'
import { ToastContainer,toast } from 'react-toastify'
import TitleCards from '../../components/TitleCards/TitleCards'

const Player = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const btnRef = useRef()

  const {myWatchlist,setMyWatchlist} = useContext(ListContext)

  const [inWlist,setInWlist] = useState(false)

  const [apiData,setApiData] = useState({
    id: '',
    title: '',
    videoKey: '',
    releaseDate: '',
    posterPath: '',
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOTdkMzRlYzNiMzQ5OTM0MjQwNzkxY2E3YWNhNjgzNyIsIm5iZiI6MTc2MDAxODYzNC44NTY5OTk5LCJzdWIiOiI2OGU3YzBjYTZmMmQyMTZhMjY3M2RhMWIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.8b6_UEgEjHAvx1_4wclqcVWZqQOue2frZ1r9Mb1bvF0'
    }
  };

  // check if already in watchlist
  useEffect(() => {
    const exists = myWatchlist.some(movie => movie.id === apiData.id)
    setInWlist(exists)
  },[myWatchlist,apiData])

   // Fetch trailer
   useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then((res) => { 
        const data = res.results?.[0]  // safe access
        setApiData((prev) => ({
          ...prev,
          id: id,
          videoKey: data?.key || '', // fallback empty string
          title: data?.name || prev.title, // fallback to real movie title
          releaseDate: data?.published_at || prev.releaseDate
        }))
      })
      .catch(err => console.error(err))
  }, [id])
  

  // Fetch actual movie details (to get real movie title)
useEffect(() => {
  fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
    .then(res => res.json())
    .then(res => {
      setApiData((prev) => ({
        ...prev,
        title: res.original_title,      
        releaseDate: res.release_date,  
        posterPath: res.backdrop_path   
      }))
    })
    .catch(err => console.error(err))
}, [id])

  // save to localstorage
  useEffect(() => {
    localStorage.setItem('myWatchlist',JSON.stringify(myWatchlist))
  },[inWlist])

  const toggleWatchlist = () => {
    if(inWlist){
      setMyWatchlist(prev => prev.filter(movie => movie.id !== apiData.id))
      toast.info("Removed form Watchlist")
    }else{
      setMyWatchlist(prev => [...prev,apiData])
      toast.success("Added to Watchlist")
    }
    setInWlist(!inWlist)
  }

  return (
    <>

      <div className='player'>
          <div className="trailer-container">
            <img src={back_arrow_icon} alt="" onClick={() => navigate('/')} />
            <iframe width="90%" height="90%" 
            src= {`https://www.youtube.com/embed/${apiData.videoKey}`}
            title='trailer' frameBorder='0' allowFullScreen></iframe>
          </div>
      </div>

      <div className="details-container">

        <div className="title-actions">
          <h1>{apiData.title}</h1>
          <div className="actions">
            <button id='watchlistBtn' ref={btnRef} className={` ${inWlist?'added':''} btn watchlist-btn`} onClick={toggleWatchlist}>
              {inWlist ? (
                <>
                  <svg fill="currentColor" viewBox="0 0 24 24" style={{ width: 20, height: 20, marginRight: 8 }}>
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                  Remove from Watchlist
                </>
              ):(
                <>
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ width: 20, height: 20, marginRight: 8 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Add to Watchlist
                </>
              )}
            </button>
          </div>
        </div>

        <div className="metadata">
          <span className="match">96% Match</span>
          <span>{apiData.releaseDate.slice(0,10)}</span>
          <span>g</span>
          <span className="rating">PG-13</span>
          <span>HD</span>
        </div>

        <p className="description">
          A gripping tale of adventure and mystery unfolds as a group of unlikely heroes embark on a quest to uncover a hidden truth that could change the world forever. Packed with action, drama, and heart, this film is a must-watch.
        </p>

        <div className="details-grid">
          <div>
            <p><span>Cast:</span> Actor 1, Actor 2, Actor 3</p>
            <p><span>Genres:</span> Action, Adventure, Drama</p>
            <p><span>This movie is:</span> Exciting, Suspenseful</p>
          </div>
          <div>
            <p><span>Director:</span> Director Name</p>
            <p><span>Writers:</span> Writer 1, Writer 2</p>
          </div>
        </div>

      </div>

      <TitleCards title={"Top Picks for You"} category={"now_playing"}/>

    </>
  )
}

export default Player
