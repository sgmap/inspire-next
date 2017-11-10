import React from 'react'
import PropTypes from 'prop-types'

import FacetGroup from './facet-group'

class Facets extends React.Component {
  static propTypes = {
    groups: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      values: PropTypes.array.isRequired
    })).isRequired,

    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  }

  setWrapperRef = ref => {
    this.wrapperRef = ref
  }

  onWrapperClick = e => {
    const { onClose } = this.props

    if (this.wrapperRef === e.target) {
      onClose()
    }
  }

  render() {
    const { groups, open } = this.props

    if (!groups.length) {
      return null
    }

    return (
      <div className={open ? 'wrapper open' : 'wrapper'} ref={this.setWrapperRef} onClick={this.onWrapperClick}>
        <div className='facets'>
          {groups.map(({ name, values }) => (
            <FacetGroup
              key={name}
              name={name}
              values={values}
            />
          ))}
        </div>

        <style jsx>{`
          @import 'colors';

          .wrapper {
            flex-basis: 272px;
            flex-shrink: 0;

            @media (max-width: 960px) {
              display: none;
            }
          }

          .facets {
            background-color: $white;
            margin-left: 2em;
          }

          .open {
            @media (max-width: 960px) {
              display: block;
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.2);
              overflow: auto;
              z-index: 2;
              -webkit-overflow-scrolling: touch;

              .facets {
                position: absolute;
                min-height: 100vh;
                width: 380px;
                top: 0;
                right: 0;
                background: #fff;
                box-shadow: -2px 0 2px rgba(0, 0, 0, 0.2);
                padding: 2em 1em 2em 1.5em;
              }
            }

            @media (max-width: 551px) {
              .facets {
                width: 260px;
              }
            }
          }
        `}</style>
      </div>
    )
  }
}

export default Facets