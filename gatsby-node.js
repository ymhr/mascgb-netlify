/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require('path');

const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const pageTemplate = path.resolve(`src/templates/page.js`);
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(
              filter: { frontmatter: { templateKey: { eq: "page" } } }
              sort: { fields: [frontmatter___order], order: ASC }
            ) {
              edges {
                node {
                  frontmatter {
                    templateKey
                    title
                    heading
                    blurb
                    headerImage
                    smallHeader
                    appPath
                    order
                    parent
                  }
                  htmlAst
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

        // Create pages for each markdown file.
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const appPath = node.frontmatter.appPath;
          const parentPath = node.frontmatter.parent;
          // GraphQL is not expecting the images folder to be part of the path
          const headerImage = node.frontmatter.headerImage.replace(
            '/images/',
            ''
          );
          const path = parentPath ? `${parentPath}${appPath}` : appPath;

          createPage({
            path,
            component: pageTemplate,
            // In your blog post template's graphql query, you can use path
            // as a GraphQL variable to query for data from the markdown file.
            context: {
              ...node.frontmatter,
              headerImage,
              generatedPath: path,
              htmlAst: node.htmlAst
            }
          });
        });
      })
    );
  });
};
