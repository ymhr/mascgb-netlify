import React from 'react';
import Layout from '@/layout/layout';
import SEO from '@/layout/seo';
import Hero from '@/components/Hero';
import { Container, Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import rehypeReact from 'rehype-react';
import cl from '@/utils/cloudinary';

function CenteredImage({ src, className, alt, title }) {
  const imageParts = src.split('/');
  const imageId = imageParts[imageParts.length - 1];

  const imageUrl = cl.url(imageId, {
    width: '600',
    crop: 'fill',
    quality: '50',
    fetch_format: 'auto'
  });

  return (
    <div className={className}>
      <a href={src} target="_blank" rel="noopener noreferrer">
        <img src={imageUrl} alt={alt} title={title} />
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
