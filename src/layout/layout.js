/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';

import '@/layout/layout.css';
import Header from '@/components/Header';
import Helmet from 'react-helmet';
const dom = require('@fortawesome/fontawesome-svg-core').dom;

const Layout = ({ children }) => {
  return (
    <>
      <Helmet>
        <style>{dom.css()}</style>
      </Helmet>
      <Header />
      <div>
        <main>{children}</main>
        <footer></footer>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
