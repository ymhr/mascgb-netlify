import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "@/layout/layout"
import Image from "@/components/image"
import SEO from "@/layout/seo"
import Hero from "@/components/Hero"
import { Container, Row, Col } from "react-grid-system"

export default function AboutPage() {
  const headerImages = useStaticQuery(graphql`
    query {
      happy: file(relativePath: { eq: "happy-doggo.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      sullen: file(relativePath: { eq: "sullen-doggo.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 1024) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <SEO title="Home" />
      <Hero
        image={headerImages.happy}
        title="About us"
        text={{ __html: "About the club, etc etc" }}
        small
      />
      <Container>
        <Row>
          <Col>
            <h1>And I am content down here...</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec et
              vulputate sapien, quis interdum tortor.
            </p>
            <p>
              Donec vestibulum tortor sit amet velit cursus, id cursus velit
              mattis. Vivamus sollicitudin auctor urna. Integer faucibus diam
              sit amet lacus congue malesuada. Curabitur lacinia et lectus at
              consequat. Praesent lobortis eget urna ac consectetur. Sed odio
              justo, tristique nec ultrices pretium, tincidunt vel sapien.
              Integer quis elit iaculis, aliquet nulla et, malesuada nibh.
              Quisque ultrices lectus massa, nec euismod lacus sagittis non.
            </p>
            <p>
              Maecenas sodales, risus vel suscipit maximus, tortor mauris
              gravida arcu, vel luctus quam turpis id enim. Proin malesuada
              purus pellentesque est pretium, in viverra lorem fermentum.
            </p>
            <p>
              Curabitur efficitur nisl quam, id fringilla libero commodo ut.
              Mauris at neque sed metus interdum finibus. In urna quam, varius
              vitae iaculis eu, fringilla in dolor. Mauris dui ex, porttitor ut
              bibendum id, fermentum sit amet dolor. Mauris viverra fringilla
              quam.
            </p>

            <p>
              Donec commodo viverra lectus, a mollis lorem pretium non. Sed
              malesuada consequat dolor, quis varius nunc convallis at. Morbi
              dapibus nunc laoreet tortor consectetur, at ultrices diam aliquam.
              Phasellus blandit imperdiet lorem, vitae luctus enim rutrum
              ultricies. Aenean at lorem lacinia, posuere nisl quis, blandit
              eros.
            </p>
            <p>
              Maecenas non justo dignissim, interdum arcu accumsan, facilisis
              dolor. Maecenas sed massa mattis, commodo nisl et, elementum
              augue. In nisl dui, volutpat eget mauris et, finibus semper nisi.
              Vivamus mollis rutrum diam, et lobortis purus. Donec nec neque
              pharetra, efficitur augue ac, tincidunt justo. Duis imperdiet
              sapien sed eros eleifend, eu dignissim magna consectetur.
            </p>
            <p>
              Etiam varius est eget enim bibendum, nec laoreet massa lacinia.
              Quisque finibus metus eget orci condimentum volutpat. Morbi eget
              turpis augue. Vestibulum egestas tortor at scelerisque rhoncus.
            </p>
          </Col>
        </Row>
      </Container>
      {/* <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> */}
    </Layout>
  )
}
