import React from "react"
import styled, { keyframes } from "styled-components"
import useVibrant from "use-vibrant-hook"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import BackgroundImage from "gatsby-background-image"
import { Container, Row, Col } from "react-grid-system"

const bounce = keyframes`
	from {
		transform: translateY(0px);
	}
	to {
		transform: translateY(-10px);
	}
`

const Image = styled.div`
  /* background-image: url(${props => props.image}); */
  height: ${props => (props.small ? "40vh" : "100vh")};
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  top: -60px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: -60px;

  .scroll-icon {
    width: 100px;
    position: absolute;
    bottom: 20px;
    left: calc(50vw - 50px);
    opacity: 0.4;
    animation: ${bounce} 2s ease-in-out infinite alternate;
  }
`

const Overlay = styled.div`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    to bottom right,
    rgba(${props => props.dark.join(", ")}, 0.4),
    rgba(${props => props.light.join(", ")}, 0.7)
  );
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const Content = styled.div`
  color: #fff;
  /* width: 70vw; */
  position: relative;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 10px;
  text-shadow: 0px 0px 3px rgba(0, 0, 0, 0.5);

  @media only screen and (max-width: 600px) {
    width: 85vw;
  }

  h2 {
    font-size: 1.8em;
  }

  .text {
    font-size: 16px;
  }
`

export default function Hero({ title, text, image, small }) {
  const { colors, done } = useVibrant(image.childImageSharp.fluid.src)

  return (
    <>
      <Image small={small}>
        <BackgroundImage
          fluid={image.childImageSharp.fluid}
          style={{ width: "100%", height: "100%", position: "absolute" }}
        />
        {/* <Img
          fluid={image.childImageSharp.fluid}
          style={{ width: "100%", height: "100%" }}
        /> */}
        {done && (
          <Overlay dark={colors.DarkVibrant.rgb} light={colors.Vibrant.rgb} />
        )}
        <Container className="container" style={{ width: "100%" }}>
          <Row className="row">
            <Col className="col">
              <Content>
                <h2>{title}</h2>
                <div className="text" dangerouslySetInnerHTML={text} />
              </Content>
            </Col>
          </Row>
        </Container>
        {!small && (
          <FontAwesomeIcon
            icon={faChevronDown}
            size="4x"
            className="scroll-icon"
          />
        )}
      </Image>
    </>
  )
}
