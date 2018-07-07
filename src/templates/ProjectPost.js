import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import ReactMarkdown from 'react-markdown'
import Styled from 'styled-components'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import RehypeReact from 'rehype-react'
import { OutboundLink } from 'gatsby-plugin-google-analytics'

import MetaText from '../components/MetaText'
import { GutterContainer } from '../components/Container'
import { Colors, FontSans } from '../utils/Theme'
import Button from '../components/Button'
import AjaxGet from '../utils/Ajax'
import NavTabs from '../components/Navigation/NavTabs'
import BlogPostPreview from '../components/BlogPostPreview'

const RenderAst = new RehypeReact({
  createElement: React.createElement,
  components: {},
}).Compiler

class ProjectPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      watchCount: '',
      starCount: '',
      forkCount: '',
      license: '',
      homepage: '',
      activeTab: 0,
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = (param) => (e) => {
    this.setState({
      activeTab: param
    })
  }

  componentDidMount() {
    const github = this.props.data.markdownRemark.frontmatter.github
    const external = this.props.data.markdownRemark.frontmatter.external
    let homepage = ''
    if(github) {
      this.xhr = AjaxGet(`//api.github.com/repos/${github}`, (res) => {
        if(!res) {
          return
        }
        this.setState({
          watchCount: res['subscribers_count'],
          starCount: res['stargazers_count'],
          forkCount: res['forks_count'],
          license: res['license']['spdx_id'],
        })
        if(res['homepage'] != '' && !res['homepage'].includes('carsonkk')) {
          homepage = res['homepage']
        }
      })
    }
    if(external) {
      this.setState({homepage: external})
    }
    else if(homepage) {
      this.setState({homepage})
    }
  }

  componentWillUnmount() {
    if(this.xhr) {
      this.xhr.abort()
    }
  }

  render() {
    const { markdownRemark } = this.props.data
    const { htmlAst, frontmatter, } = markdownRemark
    const edges = this.props.data.allMarkdownRemark.edges
    let posts = edges.map(edge => <BlogPostPreview key={edge.node.id} post={edge.node}/>)
    let tags
    const Banner = Styled.div`
      margin-bottom: 1.25rem;
    `
    const PostHeader = Styled.div`
      display: flex;
      flex-direction: column;
      margin-bottom: 2.75rem;
    `
    const HeaderContent = Styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 1.25rem;
    `
    const Left = Styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `
    const NameWrapper = Styled.div`
      display: flex;
      flex-direction: row;
      align-items: center;

      .gatsby-image-outer-wrapper {
        margin-right: 1rem;

        img {
          border-radius: 50%;
        }
      }
      h1 {
        margin: 0 0 0.5rem 0;
        font-family: ${FontSans};
        font-size: 3em;
      }
    `
    const Description = Styled.span`
      font-style: italic;
    `
    const Right = Styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    `
    const ButtonRow = Styled.div`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin-bottom: 0.25rem;

      > span:not(:first-child) {
        padding-left: 0.5rem;
      }
      > span:not(:last-child) {
        padding-right: 0.5rem;
      }
    `
    const PostBody = Styled.div`
      a.anchor svg {
        fill: ${Colors.text};
      }
      h1 > a.anchor {
        margin-left: -3rem;
        padding-right: 0.5rem;

        svg {
          height: 2.5rem;
          width: 2.5rem;
        }
      }
      h2 > a.anchor {
        margin-left: -2.375rem;
        padding-right: 0.5rem;

        svg {
          height: 1.875rem;
          width: 1.875rem;
        }
      }
      h3 > a.anchor {
        margin-left: -1.9375rem;
        padding-right: 0.5rem;

        svg {
          height: 1.4375rem;
          width: 1.4375rem;
        }
      }
      h4 > a.anchor {
        margin-left: -1.75rem;
        padding-right: 0.5rem;

        svg {
          height: 1.25rem;
          width: 1.25rem;
        }
      }
      h5 > a.anchor {
        margin-left: -1.5rem;
        padding-right: 0.5rem;

        svg {
          height: 1rem;
          width: 1rem;
        }
      }
      h6 > a.anchor {
        margin-left: -1.3125rem;
        padding-right: 0.5rem;

        svg {
          height: 0.8125rem;
          width: 0.8125rem;
        }
      }
    `
    const tabs = [
      <Button
        type='action'
        text='About'
        func={this.handleClick(0)}
        radius='0rem 0rem 0.5rem 0.5rem'
        active={this.state.activeTab == 0 ? 'active' : ''}
      />,
      <Button
        type='action'
        text='Posts'
        func={this.handleClick(1)}
        radius='0rem 0rem 0.5rem 0.5rem'
        active={this.state.activeTab == 1 ? 'active' : ''}
      />
    ]
    const contents = [
      RenderAst(htmlAst),
      posts
    ]
    const readme = atob('IyBTZWFsYXJnCj4gQW4gZWFzeS10by11c2UgY29tbWFuZC1saW5lIGFyZ3Vt\nZW50IHBhcnNpbmcgbGlicmFyeSBmb3IgQwoKIyMgQWJvdXQKClNlYWxhcmcg\naXMgYSBjb21tYW5kLWxpbmUgcGFyc2luZyBsaWJyYXJ5IGRlc2lnbmVkIHRv\nIGJlIGFzIHN0cmFpZ2h0Zm9yd2FyZCBhcyBwb3NzaWJsZSB0byB1c2UuIEl0\nIGlzIGEgc21hbGwgd3JhcHBlciBhcm91bmQgdGhlIFBPU0lYIGBnZXRvcHRg\nL0dOVSBgZ2V0b3B0X2xvbmdgIHV0aWxpdGllcywgd3JpdHRlbiB0byBoaWRl\nIHRoZSBncnVudCB3b3JrIGFuZCBsZWFybmluZyBjdXJ2ZSBhc3NvY2lhdGVk\nIHdpdGggdGhlIGdldG9wdCBpbnRlcmZhY2UuIFNraXAgdG8gdGhlIFtHZXR0\naW5nIFN0YXJ0ZWRdKCNnZXR0aW5nLXN0YXJ0ZWQpIHNlY3Rpb24gYmVsb3cg\nZm9yIGEgZGVtb25zdHJhdGlvbiBvZiBTZWFsYXJnIGluIGFjdGlvbiBhbmQg\naG93IHRvIHF1aWNrbHkgYmVnaW4gaW50ZWdyYXRpbmcgdGhlIGxpYnJhcnkg\naW50byB5b3VyIHByb2plY3QuCgpXaGlsZSBnZXRvcHQgaXRzZWxmIGlzIGEg\nc29saWQsIHN0YW5kYXJkaXplZCBhcHByb2FjaCB0byBjb21tYW5kLWxpbmUg\ncGFyc2luZywgbGVhcm5pbmcgZW5vdWdoIGFib3V0IGl0IHRvIGF0dGFpbiBh\nIGRlc2lyYWJsZSBsZXZlbCBvZiByb2J1c3RuZXNzIGNhbiBvZnRlbiBnZXQg\naW4gdGhlIHdheSBvZiB0aGUgYWN0dWFsIHByb2plY3QgaXQncyBiZWluZyB1\nc2VkIGluLiBHZXRvcHQgaGFzIGJlZW4gd2lkZWx5IHVzZWQgZm9yIGRlY2Fk\nZXMgYW5kIGluc3BpcmVkIG1hbnkgc2ltaWxhciBsaWJyYXJpZXMgaW4gW290\naGVyIGxhbmd1YWdlc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kv\nR2V0b3B0I090aGVyX2xhbmd1YWdlcyksIGhvd2V2ZXIgb3RoZXIgbGlicmFy\naWVzIHN1Y2ggYXMgUHl0aG9uJ3MgW2FyZ3BhcnNlXShodHRwczovL2RvY3Mu\ncHl0aG9uLm9yZy8zL2hvd3RvL2FyZ3BhcnNlLmh0bWwpIGhhdmUgYmVlbiBk\nZXZlbG9wZWQgd2l0aCB0aGUgaW50ZW50IG9mIHByb3ZpZGluZyBhIG11Y2gg\nc2ltcGxlciBhbHRlcm5hdGl2ZSB0byB2ZXJib3NlIGFyZ3VtZW50IHBhcnNp\nbmcuIEFzIHN1Y2gsIHRoaXMgbGlicmFyeSBsZW5kcyBtdWNoIG9mIGl0cyBk\nZXNpZ24gY2hvaWNlcyB0byB0aGVzZSBuZXdlciBhbHRlcm5hdGl2ZSBsaWJy\nYXJpZXMuCgojIyBHZXR0aW5nIFN0YXJ0ZWQKClRoZSBzYW1wbGUgY29kZSBi\nZWxvdyBpbGx1c3RyYXRlcyBqdXN0IGhvdyBlYXN5IFNlYWxhcmcgaXMgdG8g\ndXNlIGluIDUgc3RlcHMuIEhlcmUgb3VyIHByb2dyYW0gdGFrZXMgYSBzdHJp\nbmcgYXMgYSBwb3NpdGlvbmFsIGFyZ3VtZW50IGFuZCBwcmludHMgaXQuIElm\nIHRoZSBvcHRpb2FubCBhcmd1bWVudCBgLW1gL2AtLW11bHRpcGxlYCBpcyB1\nc2VkLCB0aGUgcHJvZ3JhbSBwcmludHMgb3V0IHRoZSBzdHJpbmcgYXMgbWFu\neSB0aW1lcyBhcyBzcGVjaWZpZWQgYnkgdGhlIHZhbHVlIHBhc3NlZCB0byB0\naGUgb3B0aW9uLgoKYGBgYwojaW5jbHVkZSAic2VhbGFyZy5oIgoKaW50IG1h\naW4oaW50IGFyZ2MsIGNoYXIgKiphcmd2KSB7CiAgICBpbnQgaTsKICAgIGlu\ndCBjb3VudDsKICAgIGNoYXIgKnN0cjsKCiAgICAvLyAxLiBBbGxvY2F0ZSBh\nIFNlYWxQYXJzZXIgaW5zdGFuY2UKICAgIFNlYWxQYXJzZXIgKnBhcnNlciA9\nIG1hbGxvYyhzaXplb2YoU2VhbFBhcnNlcikpOwoKICAgIC8vIDIuIEluaXRp\nYWxpemUgdGhlIHBhcnNlcgogICAgSW5pdGlhbGl6ZShwYXJzZXIsICJQcmlu\ndHMgYSBzdHJpbmcgc29tZSBudW1iZXIgb2YgdGltZXMiLCAiVGhpcyBpcyBh\nIHByb2xvZ3VlIiwgIlRoaXMgaXMgYW4gZXBpbG9ndWUiLCBQU19TRUFMKTsK\nCiAgICAvLyAzLiBBZGQgYW55IG51bWJlciBvZiBvcHRpb25hbCBvciBwb3Np\ndGlvbmFsIGFyZ3VtZW50cwogICAgQWRkQXJndW1lbnQocGFyc2VyLCAibSIs\nICJtdWx0aXBsZSIsICJOdW1iZXIgb2Ygc3RyaW5nIGluc3RhbmNlcyB0byBw\ncmludCIsIEFLX09QVElPTkFMLCBBUl9SRVFVSVJFRCwgQUFfVkFMVUUsIFZU\nX0lOVCk7CiAgICBBZGRBcmd1bWVudChwYXJzZXIsIE5VTEwsICJzdHJpbmci\nLCAiU3RyaW5nIHRvIGJlIHByaW50ZWQiLCBBS19QT1NJVElPTkFMLCBBUl9S\nRVFVSVJFRCwgQUFfVkFMVUUsIFZUX1NUUklORyk7CgogICAgLy8gNC4gUGFy\nc2UgYWxsIHRoZSBhcmd1bWVudHMgYW5kIGNoZWNrIGZvciBhbnkgZXJyb3Jz\nCiAgICBQYXJzZShwYXJzZXIsIGFyZ2MsIGFyZ3YpOwogICAgaWYocGFyc2Vy\nLT5lcnIgIT0gMCkgewogICAgICAgIGZyZWUocGFyc2VyKTsKICAgICAgICBy\nZXR1cm4gcGFyc2VyLT5lcnI7CiAgICB9CgogICAgLy8gNS4gQWNjZXNzIGFy\nZ3VtZW50cyBieSBpbmRleCBpbiB0aGUgb3JkZXIgdGhleSB3ZXJlIGFkZGVk\nIHRvIHRoZSBwYXJzZXIKICAgIGNvdW50ID0gcGFyc2VyLT5hcmdzWzFdLnZh\nbHVlLmk7CiAgICBzdHIgPSBwYXJzZXItPmFyZ3NbMl0udmFsdWUuY3A7Cgog\nICAgZm9yKGkgPSAwOyBpIDwgY291bnQ7IGkrKykgewogICAgICAgIHByaW50\nZigiJXNcbiIsIHN0cik7CiAgICB9CgogICAgZnJlZShwYXJzZXIpOwogICAg\ncmV0dXJuIDA7Cn0KYGBgCgpXaGVuIGNvbXBpbGVkIGFuZCBydW4gd2l0aCB0\naGUgYC1oYC9gLS1oZWxwYCBvcHRpb24sIHRoZSBmb2xsb3dpbmcgdXNhZ2Ug\nc3RhdGVtZW50IGlzIGF1dG9tYXRpY2FsbHkgYnVpbHQgYW5kIHByaW50ZWQ6\nCgpgYGAKJCAuL3NhbXBsZV9wcm9ncmFtIC1oClVzYWdlOiBzYW1wbGVfcHJv\nZ3JhbSBbLWhdIFstbSBNVUxUSVBMRV0gU1RSSU5HClByaW50cyBhIHN0cmlu\nZyBzb21lIG51bWJlciBvZiB0aW1lcwoKVGhpcyBpcyBhIHByb2xvZ3VlCgpQ\nb3NpdGlvbmFsIEFyZ3VtZW50czoKICBTVFJJTkcgICAgICAgICAgICAgICAg\nICAgIFN0cmluZyB0byBiZSBwcmludGVkCiAgCk9wdGlvbmFsIEFyZ3VtZW50\nczoKICAtaCwgLS1oZWxwICAgICAgICAgICAgICAgIERpc3BsYXkgdGhpcyBo\nZWxwIG1lc3NhZ2UgYW5kIGV4aXQKICAtbSwgLS1tdWx0aXBsZSAgICAgICAg\nICAgIE51bWJlciBvZiBzdHJpbmcgaW5zdGFuY2VzIHRvIHByaW50CgpUaGlz\nIGlzIGFuIGVwaWxvZ3VlCiQKYGBgCgpUaGluZ3MgbGlrZSBtaXNzaW5nL2V4\nY2Vzc2l2ZSBhcmd1bWVudHMsIGludmFsaWQgYXJndW1lbnRzLCBhbmQgYmFz\naWMgdHlwZS9saW1pdCBjaGVja2luZyBhcmUgYWxsIGhhbmRsZWQgYXV0b21h\ndGljYWxseS4KCioqVG8gaW50ZWdyYXRlIFNlYWxhcmcgaW50byB5b3VyIHBy\nb2plY3Q6KioKCi0gQ29weSBgc3JjL3NlYWxhcmcuY2AgYW5kIGBpbmNsdWRl\nL3NlYWxhcmcuaGAgaW50byB5b3VyIHByb2plY3QgZm9sZGVyIGFuZCBhZGQg\ndGhlbSBhcyBkZXBlbmRlbmljZXMgaW4geW91ciBNYWtlZmlsZSwganVzdCBs\naWtlIHRoZSByZXN0IG9mIHlvdXIgY29kZSBmaWxlcwotIEFkZCBgI2luY2x1\nZGUgInNlYWxhcmcuaCJgIHRvIHdoZXJldmVyIHlvdSdsbCBiZSBkZWFsaW5n\nIHdpdGggY29tbWFuZC1saW5lIGFyZ3VtZW50cy0gdHlwaWNhbGx5IHRoaXMg\nd291bGQgYmUgdGhlIC5jIGZpbGUgY29udGFpbmluZyB5b3VyIGBtYWluYCBm\ndW5jdGlvbgotIFRyeSBjb21waWxpbmcgdG8gbWFrZSBzdXJlIHRoZSBsaWJy\nYXJ5IGNhbiBiZSBidWlsdCBhbG9uZ3NpZGUgeW91ciBjb2RlIHdpdGhvdXQg\nYW55IGlzc3Vlcy4gSWYgc28sIHlvdSdyZSByZWFkeSB0byBzdGFydCBtYWtp\nbmcgY2FsbHMgdG8gU2VhbGFyZydzIEFQSSBhbmQgcGFyc2Ugc29tZSBhcmd1\nbWVudHMhCgoqRm9yIGFkZGl0aW9uYWwgZXhhbXBsZXMsIGNoZWNrIG91dCBb\nYGV4YW1wbGUvYF0oZXhhbXBsZSkqCgoqRm9yIGZ1bGwgZG9jdW1lbnRhdGlv\nbiBvZiBTZWFsYXJnJ3MgQVBJLCBpbmNsdWRpbmcgaXRzIG1vcmUgYWR2YW5j\nZWQgc2VtYW50aWNzIGFuZCBmaW5lci1ncmFpbmVkIGNvbnRyb2wsIGNoZWNr\nIG91dCBbYGRvYy9gXShkb2MpKgoKIyMgUmVmZXJlbmNlcwoKV2FudCB0byBs\nZWFybiBtb3JlIGFib3V0IGdldG9wdD8gQ2xpY2sgdGhlIGxpbmtzIGJlbG93\nOgoKLSBbR05VIGRvY3MvZXhhbXBsZXMgb24gZ2V0b3B0L2dldG9wdF9sb25n\nXShodHRwczovL3d3dy5nbnUub3JnL3NvZnR3YXJlL2xpYmMvbWFudWFsL2h0\nbWxfbm9kZS9HZXRvcHQuaHRtbCkKLSBbTWFuIHBhZ2UgZ2V0b3B0KDMpXSho\ndHRwOi8vbWFuNy5vcmcvbGludXgvbWFuLXBhZ2VzL21hbjMvZ2V0b3B0LjMu\naHRtbCkKLSBbR2V0b3B0IG9uIFdpa2lwZWRpYV0oaHR0cHM6Ly9lbi53aWtp\ncGVkaWEub3JnL3dpa2kvR2V0b3B0KQotIFtJQk0gYXJ0aWNsZV0oaHR0cHM6\nLy93d3cuaWJtLmNvbS9kZXZlbG9wZXJ3b3Jrcy9haXgvbGlicmFyeS9hdS11\nbml4LWdldG9wdC5odG1sKQotIFtJbmZvcm1pdCBhcnRpY2xlXShodHRwOi8v\nd3d3LmluZm9ybWl0LmNvbS9hcnRpY2xlcy9hcnRpY2xlLmFzcHg/cD0xNzU3\nNzEmc2VxTnVtPTMpCi0gW1J1dGdlcnMgYXJ0aWNsZV0oaHR0cHM6Ly93d3cu\nY3MucnV0Z2Vycy5lZHUvfnB4ay80MTYvbm90ZXMvYy10dXRvcmlhbHMvZ2V0\nb3B0Lmh0bWwpCi0gW1NPIHBvc3RzXShodHRwczovL3N0YWNrb3ZlcmZsb3cu\nY29tL3F1ZXN0aW9ucy90YWdnZWQvYytnZXRvcHQp')

    if(markdownRemark.fields.tagSlugs) {
      const tagsArray = markdownRemark.fields.tagSlugs
      tags = tagsArray.map((tag, i) => {
        const divider = i < tagsArray.length - 1 && <span>{`, `}</span>
        return (
          <span key={tag}>
            <Link to={tag}>{markdownRemark.frontmatter.tags[i]}</Link>
            {divider}
          </span>
        )
      })
    }

    return (
      <GutterContainer>
        <PostHeader>
          {frontmatter.banner &&
            <Banner>
              <Img sizes={frontmatter.banner.childImageSharp.sizes} alt="banner"/>
            </Banner>
          }
          <HeaderContent>
            <Left>
              <NameWrapper>
                {frontmatter.icon &&
                  <Img resolutions={frontmatter.icon.childImageSharp.resolutions} alt="icon"/>
                }
                <h1>{frontmatter.name}</h1>
              </NameWrapper>
              <div>
                <div>
                  <Description>{frontmatter.description}</Description>
                </div>
                <MetaText>
                  <span><FontAwesomeIcon icon="tags" fixedWidth/> {tags}</span>
                </MetaText>
              </div>
            </Left>
            <Right>
              <div>
                {frontmatter.github &&
                  <ButtonRow>
                    <Button
                      type='external'
                      href={`//github.com/${frontmatter.github}/watchers`}
                      icon={['fas', 'eye']}
                      text={`Watch ${this.state.watchCount}`}
                      size='sm'
                      border={true}
                    />
                    <Button
                      type='external'
                      href={`//github.com/${frontmatter.github}/stargazers`}
                      icon={['fas', 'star']}
                      text={`Star ${this.state.starCount}`}
                      size='sm'
                      border={true}
                    />
                    <Button
                      type='external'
                      href={`//github.com/${frontmatter.github}/network`}
                      icon={['fas', 'code-branch']}
                      text={`Fork ${this.state.forkCount}`}
                      size='sm'
                      border={true}
                    />
                  </ButtonRow>
                }
              </div>
              <div>
                {this.state.license && 
                  <MetaText>
                    <span>
                      <FontAwesomeIcon icon="balance-scale" fixedWidth/>
                      <span> {this.state.license} License</span>
                    </span>
                  </MetaText>
                }
                {frontmatter.github &&
                  <MetaText>
                    <span>
                      <FontAwesomeIcon icon={['fab', 'github']} fixedWidth/>
                      <OutboundLink href={`//github.com/${frontmatter.github}`} target="_blank"> github.com/{frontmatter.github}</OutboundLink>
                    </span>
                  </MetaText>
                }
                {this.state.homepage &&
                  <MetaText>
                    <span>
                      <FontAwesomeIcon icon="external-link-alt" fixedWidth/>
                      <OutboundLink href={`//${this.state.homepage}`} target="_blank"> {this.state.homepage}</OutboundLink>
                    </span>
                  </MetaText>
                }
              </div>
            </Right>
          </HeaderContent>
          <NavTabs tabs={tabs}></NavTabs>
        </PostHeader>
        <PostBody>
          {RenderAst(htmlAst)}
        </PostBody>
        {RenderAst(frontmatter.linkedMarkdownFile.childMarkdownRemark.htmlAst)}
        <div>
          <ReactMarkdown source={readme}/>
        </div>
        <div>
          {posts}
        </div>
      </GutterContainer>
    )
  }
}

export default ProjectPost

export const pageQuery = graphql`
  query ProjectPostBySlug($slug: String!) {
    allMarkdownRemark(
      filter: {fields: {kind: {eq: "blog"} tagSlugs: {regex: $slug}}}, 
      sort: {order: DESC, fields: [fields___date]}
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 140)
          fields {
            date
            slug
            tagSlugs
          }
          frontmatter {
            title
            tags
          }
        }
      }
    }
    markdownRemark(fields: {slug: {eq: $slug}}) {
      htmlAst
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        banner {
          childImageSharp {
            sizes(maxWidth: 800, maxHeight: 250, cropFocus: CENTER) {
              ...GatsbyImageSharpSizes
            }
          }
        }
        icon {
          childImageSharp {
            resolutions(width: 100, height: 100, cropFocus: CENTER) {
              ...GatsbyImageSharpResolutions
            }
          }
        }
        name
        description
        tags
        github
        external
        linkedMarkdownFile {
          childMarkdownRemark {
            htmlAst
            frontmatter {
              description
            }
          }
        }
      }
    }
  }
`
