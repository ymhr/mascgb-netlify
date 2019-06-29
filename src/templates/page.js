import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '@/layout/layout';
import SEO from '@/layout/seo';
import Hero from '@/components/Hero';
import { Container, Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import rehypeReact from 'rehype-react';

function CenteredImage({ src, className }) {
  return (
    <div className={className}>
      <a href={src} target="_blank">
        <img src={src} />
      </a>
    </div>
  );
}

const StyledCenteredImage = styled(CenteredImage)`
  width: 100%;
  display: flex;
  justify-content: center;

  a {
    display: block;
  }

  img {
    max-width: 600px;

    @media screen and (max-width: 600px) {
      max-width: 100%;
    }
  }
`;

const renderAst = new rehypeReact({
  createElement: React.createElement,
  components: { img: StyledCenteredImage }
  // components: { 'styled-image': StyledImage }
}).Compiler;

export default function PageTemplate({ pageContext }) {
  return (
    <Layout>
      <SEO title={pageContext.title} />
      <Hero
        image={pageContext.headerImage}
        headerImageAlignment={pageContext.headerImageAlignment}
        title={pageContext.heading}
        text={{ __html: pageContext.blurb }}
        small={pageContext.smallHeader}
      />
      <Container>
        <Row>
          <Col>{renderAst(pageContext.htmlAst)}</Col>
        </Row>
      </Container>
    </Layout>
  );
}
