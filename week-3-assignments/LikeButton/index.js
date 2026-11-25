import { useEffect, useRef, useState } from "react";
import './styles.css'

function fackAPi(action){
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if(Math.random()<0.5){return resolve ({message:`${action} resolved`})}
      else {reject({message:`unabled to ${action}. please try again.`})}
    },1000)
  })
}


const HeartIcon = () => (
  <svg className="heart" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <path
      d="M12 21s-7.5-4.6-9.6-9.3C.9 8.3 3 4.5 6.7 4.5c2 0 3.5 1.1 5.3 3 1.8-1.9 3.3-3 5.3-3 3.7 0 5.8 3.8 4.3 7.2C19.5 16.4 12 21 12 21z"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="spinner" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
    <circle cx="12" cy="12" r="9" fill="none" strokeWidth="3" strokeDasharray="42 100" strokeLinecap="round" />
  </svg>
);



function LikeButton(){
  const[liked,setLiked]=useState(false)
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState(null)
  const mounted=useRef(false)

  useEffect(()=>{
    mounted.current=true

    return ()=>{mounted.current=false}
  },[])

  const handleClick=async ()=>{
    if(loading) return
    setLoading(true)
    setError(null);
    try{
    await fackAPi(liked?'unLike':'like')
      if(mounted.current) setLiked(prev=> !prev)
    }
    catch(err){
      if(mounted.current) setError(err.message)
    }
  finally{
    if (mounted.current )setLoading(false)
  }
    
  }

   const stateClass = loading ? "is-loading" : liked ? "is-liked" : "is-default";

   return (
    <div className="like-wrapper">
      <button
        type="button"
        className={`like-btn ${stateClass}`}
        onClick={handleClick}
        disabled={loading}
        aria-pressed={liked}
        aria-busy={loading}
      >
        {loading ? <SpinnerIcon /> : <HeartIcon />}
        <span>{liked ? "Liked" : "Like"}</span>
      </button>
      {error && (
        <p className="like-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );

}

export default LikeButton