import {fetchFailedEvents} from "../Admin/services/orderService.tsx";
import {fetchDislike, fetchLike, fetchSessionStart} from "./swipeService.tsx";
import {useState} from "react";

interface GameProps {
    
}

function Game({}: GameProps) {
    const [data, setData] = useState(null);

    const handleClick = async (setData) => {
        try {
            const data = await fetchSessionStart()
            setData(data)
        } catch (e) {
            console.error(e)
        }
    }

    const handleLike = async (setData) => {
        try {
            const data = await fetchLike('1', '2')
            setData(data)
        } catch (e) {
            console.error(e)
        }
    }

    const handleDislike = async (setData) => {
        try {
            const data = await fetchDislike()
            setData(data)
        } catch (e) {
            console.error(e)
        }
    }

    console.log(data)
    return <div>
        <div onClick={() => handleClick(setData)}>start</div>
        <div onClick={() => handleLike(setData)}>like</div>
        <div onClick={() => handleDislike(setData)}>dislike</div>
    </div>
}

export default Game