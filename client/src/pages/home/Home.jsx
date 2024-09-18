import "./home.css"
import Navbar from '../../components/navbar/Navbar'
import JobTable from "../../components/table/JobTable"
import Footer from "../../components/footer/Footer"
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"

const Home = () => {
    const navigate = useNavigate()
    const [text,setText] = useState("")
    const textRef = useRef()
    const handleSubmit = (e) => {
        e.preventDefault()
        setText(textRef.current.value)
    }
    return (
        <div className='home'>
            <Navbar />
            <form className="search" onSubmit={handleSubmit}>
                <input ref={textRef} className="search-input" type="text" placeholder="Search by Client Name or ID" />
                <button type="submit" className="search-btn">Search</button>
            </form>
            <button onClick={() => navigate("/new")} className="new-job-btn">New Job Sheet</button>
            <JobTable text={text} />
            <Footer />
        </div>
    )
}

export default Home
