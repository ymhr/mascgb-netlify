import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';
import Img from 'gatsby-image';

export default function Image({src}) {
	const images = useStaticQuery(graphql`
	query Images {
		allFile(filter: { internal: { mediaType: { regex: "/^image/" } } }) {
			edges {
			  node {
				relativePath
				childImageSharp {
				  fluid(maxWidth: 2048) {
					...GatsbyImageSharpFluid_withWebp_noBase64
				  }
				}
			  }
			}
		  }
	  }
	`)

	const {node: {childImageSharp}} = images.allFile.edges
		.find(({node: image}) => {
			return `/images/${image.relativePath}` === src
		});

	return <Img fluid={childImageSharp.fluid}/>
}