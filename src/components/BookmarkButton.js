import React from 'react'
import PropTypes from 'prop-types';
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import Platform from 'platform'

import { Colors } from '../utils/Theme'

class BookmarkButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = {wasClicked: false}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick() {
    const { title, href } = this.props
    this.setState({wasClicked: true})

    console.log(Platform)
    switch(Platform.name) {
      case 'IE':
        console.log('Here in 3')
        window.external.AddFavorite(href, title)
        break
      case 'Firefox':
        console.log('Here in 3')
        browser.bookmarks.create({
          title: title,
          url: href
        })
        break
      case 'Chrome':
      case 'Safari':
        console.log('Here in 3')
        var evt = document.createEvent("KeyboardEvent");
        evt.initKeyboardEvent("keypress", true, true, window,
                          0, 122, 122, 0,
                          0, "e".charCodeAt(0))
        var body = document.body;
        var canceled = !body.dispatchEvent(evt);
        if(canceled) {
          // A handler called preventDefault
          alert("canceled");
        } else {
          // None of the handlers called preventDefault
          alert("not canceled");
        }
        break
    }
  }

  render() {
    const wasClicked = this.state.wasClicked
    const Bookmark = Styled.button`
      padding: 0;
      border: 0;
      font-size: 2rem;
      cursor: pointer;
      color: ${Colors.text};
      background-color: transparent;

      .icon-base,
      .icon-hover,
      .icon-clicked {
        position: absolute;
      }

      * > .icon-base,
      * > .icon-clicked,
      *:hover > .icon-hover {
        transition: all 0.25s;
        visibility: visible;
        opacity: 1.0;
      }

      * > .icon-hover,
      *:hover > .icon-base {
        transition: all 0.25s;
        visibility: hidden;
        opacity: 0.0;
      }
    `

    return (
      <Bookmark onClick={this.handleClick}>
        <span>
          <FontAwesomeIcon icon={['far', 'bookmark']} className="icon-base"/>
          <FontAwesomeIcon icon="bookmark" className={wasClicked ? `icon-clicked` : `icon-hover`}/>
        </span>
      </Bookmark>
    )
  }
}

BookmarkButton.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
};

BookmarkButton.defaultProps = {
  title: '',
  href: '#',
};

export default BookmarkButton