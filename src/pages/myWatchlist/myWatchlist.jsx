import React, { useContext } from 'react'
import '../myWatchlist/myWatchlist.css'
import { ListContext } from '../../context/ListContext'
import Navbar from '../../components/Navbar/Navbar'
import { useNavigate } from 'react-router-dom'

const MyWatchlist = () => {

    const {myWatchlist,setMyWatchlist} = useContext(ListContext)
    const navigate = useNavigate()

  return (
    <div className='myWatchlist'>
        <Navbar />
        <div className='myWatchlist-container'>
            <div className='title'>
                <h1>Watchlist</h1>
            </div>
            <div className='movie-lists'>
                {myWatchlist.map((movie,i) => {
                    return(
                        <div onClick={() => navigate(`/player/${movie.id}`)} className='myWatchlist-cards' key={i}>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.posterPath}`} alt={movie.title} />
                            <p> {movie.title}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}

export default MyWatchlist
