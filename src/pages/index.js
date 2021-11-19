import { graphql, Link } from "gatsby";
import React from "react";
import Img from "gatsby-image";
import Layout from "../components/Layout";

const index = ({ data }) => {
  return (
    <div>
      <Layout>
        <ul className='posts'>
          {data.allContentfulBlogPost.edges.map((edge) => {
            return (
              <li className='post' key={edge.node.id}>
                <h2>{edge.node.title}</h2>

                <div className='meta'>
                  <span>Posted On : {edge.node.publicationDate}</span>
                </div>

                {edge.node.images && (
                  <Img
                    className='featured'
                    fluid={edge.node.images.fluid}
                    alt={edge.node.images.title}
                  />
                )}

                <p className='excerpt'>
                  {edge.node.excerpt.childMarkdownRemark.excerpt}
                </p>

                <div className='button'>
                  <Link to={`/${edge.node.slug}`}>Read More</Link>
                </div>
              </li>
            );
          })}
        </ul>
      </Layout>
    </div>
  );
};

export default index;

export const query = graphql`
  query MyQuery {
    allContentfulBlogPost(sort: { fields: publicationDate, order: DESC }) {
      edges {
        node {
          id
          title
          slug
          publicationDate(formatString: "DD MM YYYY")
          images {
            id
            fluid(maxWidth: 0) {
              ...GatsbyContentfulFluid
            }
          }
          excerpt {
            id
            childMarkdownRemark {
              excerpt(pruneLength: 500)
            }
          }
        }
      }
    }
  }
`;
