import styles from "@/styles/Home.module.css";
import { useRouter } from 'next/router';
import { useState } from "react";
import Image from "next/image";

export default function Home() {

  const router = useRouter();

  const url = 'https://heathify-smoky.vercel.app'
  
  const [bookingid, setBookingid] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoader] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChangeInBookingId = (event) => {
    setBookingid(event.target.value);
  };

  const handleChangeInName = (event) => {
    setName(event.target.value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setLoader(true)
    document.getElementById("submit").disabled = true;
    setLoader('true')
    
    fetch(`${url}/api/hello?id=${bookingid}`).then((a)=>{
      setLoader(false)
      return a.json()
    }).then((parsed)=>{
      console.log(parsed[0]['customer_name'])
      if (parsed[0]['customer_name'].toLowerCase() == name.toLowerCase()){
        sessionStorage.setItem('userdata',JSON.stringify(parsed))
        router.push(`user/${bookingid}`);
      }
    }).catch((err)=>{
      console.log(err)
      setError("Please enter valid details")
    document.getElementById("submit").disabled = false;

    })
    
    
  };

  return (
    <>
    {loading ? <div className={styles.spinner}>
      <span className={styles.loader}></span>
    </div>:""
}
    <b><Image className={styles.image} src="/images/logo.webp" width={128} height={49.6} /></b>
    <div className={styles.login}>
      <div className={styles.img}>
        <img src="/images/image.png" layout="responsive"></img>
      </div>
      <div className={styles.form}>
      <div className={styles.formbox}>
        {error ? <div className={styles.errorbox}>{error}</div> : ""}
        <b><h1>Enter your details</h1></b>
        <form>
        <input type="text" value={bookingid}
          onChange={handleChangeInBookingId} placeholder="Enter your Booking id" ></input>
          <br></br><input type="text" value={name} 
          onChange={handleChangeInName} placeholder="Enter your name" ></input>
          <br></br><button id="submit" onClick={handleSubmit}>Submit</button>
          </form>
      </div>
      </div>
    </div>
    </>
  );
}