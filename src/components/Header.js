import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import LogoWide from "@/images/logo-wide.png"
import LogoTall from "@/images/logo.png"
import MediaQuery from "react-responsive"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const NavBar = styled.nav`
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
  padding: 20px;
  position: absolute;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 2;
  color: #fff;
  width: 100vw;
  height: 60px;
  box-sizing: border-box;
  max-width: 100%;

  & h1 {
    margin: 0 20px 0 0;
    padding: 0;
    position: relative;
    top: 4px;

    .responsive-logo {
      width: 100px;
    }
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0;

    & li {
      display: inline-block;

      a {
        text-decoration: none;
        color: inherit;
        margin-right: 20px;
      }
    }
  }

  .logo {
    width: 300px;
    background-image: url(${LogoWide});
    height: 60px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  @media screen and (max-width: 600px) {
    .logo {
      width: 100px;
      background-image: url(${LogoTall});
      height: 60px;
    }
  }
`

export default function Header() {
  return (
    <div>
      <NavBar>
        <Link to="/">
          <h1>
            <div className="logo" />
          </h1>
        </Link>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about/">About</Link>
          </li>
        </ul>
      </NavBar>
    </div>
  )
}
