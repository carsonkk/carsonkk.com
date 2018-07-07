import React from 'react'
import Link from 'gatsby-link'

import { Container } from '../components/Container'
import { Row, Col } from '../components/Grid'
import Button from '../components/Button';

class IndexPage extends React.Component {
  render() {
    return (
      <Container>
        <Button
          type='internal'
          href='/blog'
          icon={['fas', 'angle-up']}
          text='hey'
        />
        <Row>
          <Col>
            <p>Column 1</p>
          </Col>
          <Col>
            <p>Column 2</p>
          </Col>
          <Col>
            <p>Column 3</p>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default IndexPage
