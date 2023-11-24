import NavBar from "../../components/NavBar/NavBar";
import styled from "styled-components";
import landingPageImg from "../../assets/landingpage_image.png";

const HomeContainer = styled.section`
  background-image: url(${landingPageImg});
  height: 103vh;
  margin-top: -1rem;
  padding: 25px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    margin-top: 8rem;
    font-size: 40px;
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <NavBar />
      <h1>Make your life sorted 📋</h1>
    </HomeContainer>
  );
};

export default Home;
