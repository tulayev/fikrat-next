import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import YouTube from 'react-youtube'

export default function YouTubePage() {
    const [stream, setStream] = useState(null)

    useEffect(() => {
        const getLiveStream = async () => {
            try {
                const { data } = await axios.get(
                    'https://www.googleapis.com/youtube/v3/search',
                    {
                        params: {
                            part: 'snippet',
                            eventType: 'live',
                            channelId: 'UCFzJjgVicCtFxJ5B0P_ei8A', 
                            type: 'video',
                            key: 'AIzaSyAsNjsvBj5VLWtWjDVHi530JUF8vnviZ60',
                            maxResults: '1',
                            order: 'date'
                        }
                    }
                )
    
                const stream = {
                    videoId: data.items[0].id.videoId,
                    title: data.items[0].snippet.title,
                    description: data.items[0].snippet.description,
                    thumbnail: data.items[0].snippet.thumbnails.default.url
                }
    
                setStream(stream)
            } catch (error) {
                toast.error(error.response.data.error.errors[0].message)
            }
        }
        
        getLiveStream()
    }, [stream])

    const options = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
            origin:'https://thitsarparami.org/'
        }
    }

    const _onReady = (e) => {
        // access to player in all event handlers via event.target
        e.target.pauseVideo()
    }

    return (
        <div>
            <div className="flex flex-col my-5 items-center">
                { stream &&
                    <>
                        <div className="flex-1 px-2 mx-2">
                            <div className="text-lg font-bold">
                                { stream.title }
                            </div>
                        </div>
                        <div className="flex-1 px-2 mx-2 my-5">
                            <div className="text-sm font-bold">
                                { stream.description }
                            </div>
                        </div>
                        <YouTube 
                            videoId={ stream.videoId } 
                            opts={ options } 
                            onReady={ _onReady } 
                        />
                    </>
                }
            </div>
        </div>
    )
}