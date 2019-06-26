import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import Layout from '@/layout/layout';
import SEO from '@/layout/seo';
import Hero from '@/components/Hero';
import { Container, Row, Col } from 'react-grid-system';
import styled from 'styled-components';
import rehypeReact from 'rehype-react';
import { Image, Transformation } from 'cloudinary-react';
// import Image from '@/components/Image';

// function StyledImage({ src, class: classes, alt, title }) {
//   return <Image src={src} className={classes} alt={alt} title={title} />;
// }

const renderAst = new rehypeReact({
  createElement: React.createElement
  // components: { 'styled-image': StyledImage }
}).Compiler;

const ContentWrapper = styled.main`
  img {
    margin: 0 auto;
  }
`;

export default function PageTemplate({ pageContext }) {
  // const headerImages = useStaticQuery(graphql`
  //   query AllImages {
  //     allFile(filter: { internal: { mediaType: { regex: "/^image/" } } }) {
  //       edges {
  //         node {
  //           relativePath
  //           childImageSharp {
  //             fluid(maxWidth: 2048) {
  //               ...GatsbyImageSharpFluid_withWebp
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);

  // const { node: headerImage } = headerImages.allFile.edges.find(
  //   ({ node: image }) => image.relativePath === pageContext.headerImage
  // );

  return (
    <Layout>
      <SEO title={pageContext.title} />
      <Image publicId="img_9189_eub7ol.png">
        <Transformation width="150" height="150" />
      </Image>
      {/* <Hero
        image={pageContext.headerImage}
        headerImageAlignment={pageContext.headerImageAlignment}
        title={pageContext.heading}
        text={{ __html: pageContext.blurb }}
        small={pageContext.smallHeader}
      /> */}
      <Container>
        <Row>
          <Col>
            {/* <ContentWrapper
              dangerouslySetInnerHTML={{ __html: pageContext.html }}
            /> */}
            <ContentWrapper>{renderAst(pageContext.htmlAst)}</ContentWrapper>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}
