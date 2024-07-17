//import HeroSection from './components/HeroSection';
import styled from 'styled-components';
import { useProductContext } from './context/Productcontext';
import { NavLink } from 'react-router-dom';
import { Button } from './styles/Button';

const About = () => {

  const { myName } = useProductContext();

  return (
    <>
      { myName }
      <Wrapper>
        <div className="container">
            <div className="grid grid-two-column">
                <div className="hero-section-data">
                    <p className='intro-data'>Welcome to</p>
                    <h1>Shoppingo E-commerce</h1>
                    <p> Shoppingo is dedicated to bringing you the latest and greatest in technology. 
                      Founded in 2020, our mission is to offer high-quality tech gadgets at affordable prices, 
                      coupled with exceptional customer service. Whether you're a tech enthusiast or searching for the perfect gift, 
                      we have a wide range of products to meet your needs. 
                      Learn more about our journey and discover the values that drive us. 
                      At Shoppingo, we're not just about selling products—we're about enhancing your tech lifestyle.
                    </p>
                    <NavLink>
                        <Button>show more</Button>
                    </NavLink>
                </div>

                {/*our heropage img*/}
                <div className="hero-section-image">
            <figure>
              <img
                src="images/hero1.jpg"
                alt="hero-section"
                className="img-style"
              />
            </figure>
          </div>
        </div>
        </div>
    </Wrapper>
    </> 
  );
};

const Wrapper = styled.section`
  padding: 9rem 0;

    img {
        min-width: 10rem;
        height: 10rem;
    }

    .hero-section-data{
        p{
            margin:2rem 0;
        }
        
        h1{
            text-transform: capitalize;
            fony-weight: bold;
        }
        
        .intro-data {
            margin-bottom: 0;
        }
    }

    .hero-section-image {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    figure{
        position: relative;
        
        &::after {
            content: "";
            width: 60%;
            height: 80%;
            background-color: rgba(81, 56, 238, 0.4);
            position: absolute;
            left: 50%;
            top: -5rem;
            z-index: -1;
        }
    }

    .img-style {
        width: 100%;
        height: auto;
    }

    @media (max-width: ${({ theme }) => theme.media.mobile}){
        .grid {
            gap: 10rem;
        }
        
        figure::after {
            content: "";
            width: 50%;
            height: 100%;
            left: 0;
            top: 10%;
            /*background-color: rgba(81, 56, 238, 0.4);*/
            background-color: #fab0eb;
            }
        }
`;

export default About;