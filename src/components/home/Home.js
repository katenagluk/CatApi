import "./Home.css";
import "../gallery/Gallery.css";
import cats from "./caat.jpg";

const Home = () => {
  return (
    <>
      <h1 className="home_main_text">Home</h1>
      <div className="home_text">
        <p>Welcome to the cat gallery!</p>
        <p>You can upload, store and rate photos of your favorite cats!</p>
      </div>
      <div className="home_cats">
        <img className="grey" src={cats} alt="cats"/>
      </div>
    </>
  );
};

export default Home;
