import React from 'react'
import { translate } from 'react-i18next'
import PropTypes from 'prop-types'

import MarkdownPreview from 'common/components/MarkdownPreview'
import DatasetInfo from 'common/components/DatasetInfo'

import styles from './DatasetHeader.scss'

const DatasetHeader = ({ dataset, t, i18n }) => {
  const { title, description, purpose, lineage, inspireTheme } = dataset.metadata

  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.title}>
          <h1>{title}</h1>

          <DatasetInfo metadata={dataset.metadata} displayType />
        </div>

        {inspireTheme && (
          <a href={`${inspireTheme.uri}?lang=${i18n.language}`} className={styles.theme} target='_blank'>
            <img
              src={`/assets/inspire-icons/${inspireTheme.id}.svg`}
              title={inspireTheme.label[i18n.language]}
              alt={inspireTheme.label[i18n.language]}
            />
          </a>
        )}
      </div>

      <div>
        {description && (
          <MarkdownPreview markdown={description} />
        )}
        <p>
          <b>{t('components.DatasetHeader.purpose')} :</b> {purpose || t('Common:enums.unknownData.notSpecified')}
        </p>
        <p>
          <b>{t('components.DatasetHeader.dataOrigin')} :</b> {lineage || t('Common:enums.unknownData.notSpecified', { context: 'female' })}
        </p>
      </div>
    </div>
  )
}

DatasetHeader.propTypes = {
  dataset: PropTypes.shape({
    metadata: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      purpose: PropTypes.string,
      lineage: PropTypes.string,
      inspireTheme: PropTypes.shape({
        id: PropTypes.string.isRequired,
        label: PropTypes.object.isRequired
      })
    }).isRequired
  }).isRequired,

  i18n: PropTypes.shape({
    language: PropTypes.string.isRequired
  }).isRequired,
  t: PropTypes.func.isRequired
}

export default translate('Dataset')(DatasetHeader)
