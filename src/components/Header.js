import React from 'react';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import LogoWide from 'images/logo-wide.png';
import LogoTall from 'images/logo.png';
import posed, { PoseGroup } from 'react-pose';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faTimes,
  faCaretDown
} from '@fortawesome/free-solid-svg-icons';

const NavBar = styled.nav`
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0)
  );
  padding: 20px;
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  z-index: 2;
  color: #fff;
  width: 100vw;
  height: 60px;
  box-sizing: border-box;
  max-width: 100%;

  @media screen and (max-width: 600px) {
    justify-content: center;
  }

  & h1 {
    margin: 0 20px 0 0;
    padding: 0;
    position: relative;
    top: 4px;
  }

  .logo {
    width: 300px;
    background-image: url(${LogoWide});
    height: 60px;
    background-size: contain;
    background-repeat: no-repeat;

    @media screen and (max-width: 600px) {
      width: 100px;
      background-image: url(${LogoTall});
      height: 60px;
      margin: 0 auto;
    }
  }
`;

const NavLinksMobile = styled.div`
  display: block;
  visibility: visible;

  @media screen and (min-width: 600px) {
    display: none;
    visibility: hidden;
  }
`;
const NavLinksDesktop = styled.div`
  display: block;
  visibility: visible;

  @media screen and (max-width: 600px) {
    display: none;
    visibility: hidden;
  }
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    display: inline-block;

    a {
      text-decoration: none;
      color: inherit;
      margin-right: 20px;
      padding-bottom: 5px;

      &.active {
        border-bottom: 3px solid #fff;
      }
    }

    &:hover {
      .sub-nav {
        display: block;
        opacity: 1;
        visibility: visible;
      }
    }

    .sub-nav {
      transition: all 0.2s ease-in-out;
      transform: translateY(10px);
      visibility: hidden;
      opacity: 0;
      background-color: #fff;
      position: absolute;
      color: black;
      margin: 0;
      padding: 10px;
      list-style: none;
      border-radius: 5px;

      li {
        display: block;
        margin-bottom: 10px;

        a {
          &.active {
            font-weight: bold;
          }
        }
      }
    }
  }

  @media screen and (max-width: 600px) {
    li {
      display: block;
      border-bottom: 1px solid #ddd;

      a {
        margin-right: 0;
        padding-bottom: 0;
        display: block;
        padding: 20px;

        &.active {
          background-color: #ddd;
          border-bottom: 0;
        }
      }

      .sub-nav {
        transition: all 0.2s ease-in-out;
        transform: translateY(0);
        visibility: visible;
        opacity: 1;
        background-color: transparent;
        position: relative;
        color: black;
        margin: 0;
        padding: 10px;
        list-style: none;
        border-radius: 5px;
        li {
          &:last-child {
            border: none;
          }

          a {
            &.active {
              font-weight: normal;
            }
          }
        }
      }
    }
  }
`;

const Hamburger = styled.button`
  border: none;
  position: absolute;
  left: 10px;
  width: 40px;
  height: 40px;
  border-radius: 1000px;
  background-color: rgba(255, 255, 255, 0.5);

  display: block;
  visibility: visible;

  @media screen and (min-width: 600px) {
    display: none;
    visibilty: hidden;
  }
`;

const Sidebar = styled.nav`
  height: 100vh;
  width: 70vw;
  transition: all 0.1s ease-in;
  transform: translateX(${props => (props.open ? '0vh' : '-70vw')});
  position: fixed;
  top: 0;
  left: 0;
  background-color: #fff;
  z-index: 10;
  color: #000;
`;

const CloseButton = styled.button`
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 1000px;
  background-color: transparent;
`;

const OverlayPosed = posed.div({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});

const Overlay = styled(OverlayPosed)`
  background-color: rgba(0, 0, 0, 0.8);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
`;

function NavLinks() {
  const linkQuery = useStaticQuery(graphql`
    query PageLinks {
      allMarkdownRemark(
        filter: { frontmatter: { templateKey: { eq: "page" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
              appPath
              parent
            }
          }
        }
      }
    }
  `);

  const links = linkQuery.allMarkdownRemark.edges
    .map(({ node: page }) => {
      const url = page.frontmatter.parent
        ? `${page.frontmatter.parent}${page.frontmatter.appPath}`
        : page.frontmatter.appPath;
      return {
        url,
        label: page.frontmatter.title,
        parent: page.frontmatter.parent,
        children: []
      };
    })
    .sort((a, b) => (a.parent === null ? -1 : 1))
    .reduce((agg, link) => {
      if (link.parent) {
        const parentIndex = agg.findIndex(l => l.url === link.parent);
        if (parentIndex > -1) {
          const parent = agg[parentIndex];
          agg[parentIndex] = {
            ...parent,
            children: [...parent.children, link]
          };
        }
      } else {
        agg.push(link);
      }
      return agg;
    }, []);

  return (
    <NavList className="root-nav">
      {links.map(link => (
        <li key={link.url}>
          <Link to={link.url} exact activeClassName="active">
            {link.label}{' '}
            {!!link.children.length && <FontAwesomeIcon icon={faCaretDown} />}
          </Link>
          {!!link.children.length && (
            <ul className="sub-nav">
              {link.children.map(child => (
                <li key={child.url}>
                  <Link to={child.url} exact activeClassName="active">
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </NavList>
  );
}

export default function Header() {
  const [openSidebar, setOpenSidebar] = React.useState(false);

  function toggleSidebar() {
    setOpenSidebar(!openSidebar);
  }

  return (
    <NavBar>
      <Hamburger onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </Hamburger>
      <Link to="/">
        <h1>
          <div className="logo" />
        </h1>
      </Link>
      <NavLinksDesktop>
        <NavLinks />
      </NavLinksDesktop>
      <PoseGroup>
        {openSidebar && [<Overlay onClick={toggleSidebar} key="overlay" />]}
      </PoseGroup>
      <NavLinksMobile>
        <Sidebar open={openSidebar}>
          <CloseButton onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faTimes} />
          </CloseButton>
          <NavLinks />
        </Sidebar>
      </NavLinksMobile>
    </NavBar>
  );
}
