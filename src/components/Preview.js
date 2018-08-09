import React from 'react'
import { Divider, Card } from 'antd'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { Base64 } from 'js-base64'
import mermaid from 'mermaid'

class Preview extends React.Component {
  constructor (props) {
    super(props)
    this.onDownloadSVG = this.onDownloadSVG.bind(this)
  }

  onDownloadSVG (event) {
    event.target.href = `data:image/svg+xml;base64,${Base64.encode(this.container.innerHTML)}`
    event.target.download = `mermaid-diagram-${moment().format('YYYYMMDDHHmmss')}.svg`
  }

  render () {
    const { code, match: { url } } = this.props
    return <div>
      <Card title='Preview'>
        <div ref={div => { this.container = div }}>{code}</div>
      </Card>
      <Card title='Actions'>
        <div className='links'>
          <Link to={url.replace('/edit/', '/view/')}>Link to View</Link>
          <Divider type='vertical' />
          <a href='' download='' onClick={this.onDownloadSVG}>Download SVG</a>
        </div>
      </Card>
    </div>
  }

  initMermaid () {
    const { code, history, match: { url } } = this.props

    const firstLoadCallback = (...args) => {
      const images = this.container.getElementsByTagName('img')
      const imageCount = images.length
      if (images && imageCount) {
        let loadedCount = 0
        for (const image of images) {
          image.onload = () => {
            loadedCount++
            if (loadedCount >= imageCount) {
              // all images loaded, re-init
              mermaid.init(undefined, this.container)
            }
          }
        }
      }
    }

    try {
      mermaid.parse(code)
      mermaid.init(undefined, this.container, firstLoadCallback)
    } catch (e) { // {str, hash}
      const base64 = Base64.encodeURI(e.str || e.message)
      history.push(`${url}/error/${base64}`)
    }
  }

  componentDidMount () {
    this.initMermaid()
  }

  componentDidUpdate () {
    this.container.removeAttribute('data-processed')
    this.container.innerHTML = this.props.code
    this.initMermaid()
  }
}

export default Preview
