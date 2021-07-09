import React, { useEffect, useState } from 'react'
import { API_URL,API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage';
import MovieInfo from './Section/MovieInfo';
import { Row } from 'antd';
import GridCards from '../commons/GridCards';
import Favorite from './Section/Favorite';
function MovieDetail(props) {


    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`

        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
        .then(response => response.json())
        .then(response => {
            setMovie(response)
        })

        fetch(endpointCrew)
        .then(response => response.json())
        .then(response => {
            setCasts(response.cast)
        })

    }, [])

    const toggleActorView = ()=>{
        setActorToggle(!ActorToggle)
    }

    return (
        <div>
            {/* Header 
            {!LoadingForMovie ?
            */}
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
                :
                <div>loading...</div>
            
            


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite  movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>


                {/* Movie Info 
                {!LoadingForMovie ?*/}
                    <MovieInfo movie={Movie} />
                    :
                    <div>loading...</div>
                
            

                <br />
                {/* Actors Grid*/}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>Toggle Actor View </button>
                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {Casts ? Casts.map((cast, index) => (
                                cast.profile_path &&
                                <GridCards
                                    image={cast.profile_path ?
                                        `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                                    movieId={cast.id}
                                    characterName={cast.name}
                                />)) :
                                <div>loading...</div>
                        }
                    </Row>
                }   
                {/**} 
                <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                */}


                {/* Comments 
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />
                */}

            </div>

        </div>
    )
}

export default MovieDetail