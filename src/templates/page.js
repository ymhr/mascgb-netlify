import React from "react"
import { useStaticQuery } from "gatsby"

import Layout from "@/layout/layout"
import SEO from "@/layout/seo"
import Hero from "@/components/Hero"
import { Container, Row, Col } from "react-grid-system"

export default function PageTemplate({ pageContext }) {
  const headerImages = useStaticQuery(graphql`
    query AllImages {
      allFile(filter: { internal: { mediaType: { regex: "/^image/" } } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              fluid(maxWidth: 1024) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `)

  const { node: headerImage } = headerImages.allFile.edges.find(
    ({ node: image }) => image.relativePath === pageContext.headerImage
  )

  return (
    <Layout>
      <SEO title="Home" />
      <Hero
        image={headerImage}
        title={pageContext.heading}
        text={{ __html: pageContext.blurb }}
        small={pageContext.smallHeader}
      />
      <Container>
        <Row>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: pageContext.html }} />
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}
