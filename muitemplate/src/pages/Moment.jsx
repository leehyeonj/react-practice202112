
import moment from 'moment';
import { AiFillBug } from "react-icons/ai";

const Moment = () => {
    const nowTime = moment().format('YYYY-MM-DD HH:mm:ss')
    return (
        <div>
            <p>{nowTime}</p>
            <AiFillBug size={30}/>
        </div>
    )
}

export default Moment;