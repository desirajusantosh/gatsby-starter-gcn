import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import CardList from '../components/CardList'
import Card from '../components/Card'
import Helmet from 'react-helmet'
import Container from '../components/Container'
import Pagination from '../components/Pagination'
import SEO from '../components/SEO'
import ContactForm from '../components/ContactForm'
import config from '../utils/siteConfig'
import Contact from '../pages/contact'
import PageTitle from '../components/PageTitle'
import styled from 'styled-components';
import Img from "gatsby-image"

const ImgWrapper = styled.div`

  max-width: 300px;

  margin-bottom: 1.45rem;

`;
const Index = ({ data, pageContext }) => {
  const posts = data.allContentfulPost.edges
  const featuredPost = posts[0].node
  const { currentPage } = pageContext
  const isFirstPage = currentPage === 1

  return (
    <Layout>
        <img src="./logos/share.jpg" alt="" width="10" height="10"/>
        <PageTitle>RSVP</PageTitle>
	<ContactForm />
    </Layout>
  )
}

export const query = graphql`
  query($skip: Int!, $limit: Int!) {
    allContentfulPost(
      sort: { fields: [publishDate], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          title
          id
          slug
          publishDate(formatString: "MMMM DD, YYYY")
          heroImage {
            title
            fluid(maxWidth: 1800) {
              ...GatsbyContentfulFluid_withWebp_noBase64
            }
          }
          body {
            childMarkdownRemark {
              timeToRead
              html
              excerpt(pruneLength: 80)
            }
          }
        }
      }
    }
  }
`

//export default () => <div>Hello World</div>
export default Index

