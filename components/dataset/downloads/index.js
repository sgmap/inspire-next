import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import DatasetDownload from './dataset-download'

class Downloads extends React.Component {
  static propTypes = {
    distributions: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
      name: PropTypes.string,
      location: PropTypes.string
    })).isRequired,

    t: PropTypes.func.isRequired
  }

  render() {
    const { distributions, t } = this.props

    if (!distributions.length) {
      return t('downloads.noDownloads')
    }

    const vectorDistributions = distributions.filter(distribution => !distribution.originalDistribution)
    const otherDistributions = distributions.filter(distribution => distribution.originalDistribution === true)

    return (
      <div>
        <div>
          {vectorDistributions.length > 0 && (
            <section>
              <h5>{t('downloads.vectorData')}</h5>
              {vectorDistributions.map(distribution => (
                <div className='distribution' key={distribution._id}>
                  <DatasetDownload distribution={distribution} />
                </div>
              ))}
            </section>
          )}
          {otherDistributions.length > 0 && (
            <section>
              <h5>{t('downloads.otherData')}</h5>
              <ul>
                {otherDistributions.map(distribution => (
                  <li key={distribution._id}>
                    {distribution.available ? (
                      <a href={distribution.location} download>
                        {distribution.name}
                      </a>
                    ) : distribution.name}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <style jsx>{`
          section {
            margin-bottom: 1rem;

            &:last-child {
              margin-bottom: 0;
            }
          }

          ul {
            margin: 0;
            padding: 0;
            list-style-position: inside;
          }

          .distribution {
            margin-bottom: 1.4em;

            &:last-child {
              margin-bottom: 0;
            }
          }
        `}</style>
      </div>
    )
  }
}

export default translate('dataset')(Downloads)
