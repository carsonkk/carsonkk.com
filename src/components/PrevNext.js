import React from 'react'
import Link from 'gatsby-link'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

class PrevNext extends React.Component {
  render() {
    const PrevNext = Styled.div`
      display: flex;
      justify-content: space-between;
      margin-top: 1rem;
      font-size: 2rem;

      .blog-link-wrapper {
        display: inline-flex;
      }

      .icon-base,
      .icon-hover {
        position: absolute;
        margin-top: 0.5rem;
      }

      * > * > .icon-base,
      *:hover > * > .icon-hover {
        transition: all 0.25s;
        visibility: visible;
        opacity: 1.0;
      }

      * > * > .icon-hover,
      *:hover > * > .icon-base {
        transition: all 0.25s;
        visibility: hidden;
        opacity: 0.0;
      }

      .prev span {
        margin-left: 3rem;
      }

      .next {
        margin-right: 2.5rem;

        div {
          margin-left: 4.5rem;
        }
      }
    `

    return (
      <PrevNext>
        <div className="blog-link-wrapper">
          {this.props.prev &&
            <Link to={this.props.prev} className="prev">
              <div>
                <FontAwesomeIcon icon="angle-left" fixedWidth className="icon-base"/> 
                <FontAwesomeIcon icon="chevron-circle-left" fixedWidth className="icon-hover"/>
              </div>
              <span>Prev</span>
            </Link>
          }
        </div>
        <div className="blog-link-wrapper">
          {this.props.next &&
            <Link to={this.props.next} className="next">
              <div>
                <FontAwesomeIcon icon="angle-right" fixedWidth className="icon-base"/> 
                <FontAwesomeIcon icon="chevron-circle-right" fixedWidth className="icon-hover"/>
              </div>
              <span>Next</span>
            </Link>
          }
        </div>
      </PrevNext>
    )
  }
}

export default PrevNext