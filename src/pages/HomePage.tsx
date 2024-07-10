import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const navigate = useNavigate()
  return (
    //test onClick
    <div onClick={() => { navigate('/voiceroom') }}> HomePage</div >
  )
}

export default HomePage