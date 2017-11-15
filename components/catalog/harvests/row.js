import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { translate } from 'react-i18next'

import RefreshIcon from 'react-icons/lib/fa/refresh'
import SuccessIcon from 'react-icons/lib/fa/check'
import FailIcon from 'react-icons/lib/fa/close'

import Link from '../../link'

import Delta from './delta'

const iconMap = {
  pending: <RefreshIcon />,
  successful: <SuccessIcon />,
  failed: <FailIcon />
}

const Row = ({ harvest, previousHarvest, catalog, t }) => (
  <tr>
    <td title={t(`details.harvests.status.${harvest.status}`)} className={harvest.status}>
      {iconMap[harvest.status]}
    </td>
    <td>
      {harvest.status === 'successful' ? harvest.itemsFound : '–'}
    </td>
    <td>
      <Delta harvest={harvest} previous={previousHarvest} />
    </td>
    <td>
      {harvest.finished ? moment(harvest.finished).fromNow() : '–'}
    </td>
    <td>
      {harvest.status === 'pending' ? (
        <span className='pending'>{t('details.harvests.status.pending')}</span>
      ) : (
        <Link href={`/catalogs/${catalog._id}/harvest/${harvest._id}`}>
          <a>
            {t('details.harvests.viewDetails')}
          </a>
        </Link>
      )}
    </td>

    <style jsx>{`
      @import 'colors';

      tr {
        text-align: center;

        &:hover {
          td {
            background-color: lighten($lightgrey, 2%);
          }
        }
      }

      td {
        padding: 0.3em 0.6em;
      }

      .pending {
        color: $grey;
      }

      .successful {
        color: $green;
      }

      .failed {
        color: $red;
      }
    `}</style>
  </tr>
)

Row.propTypes = {
  catalog: PropTypes.shape({
    _id: PropTypes.string.isRequired
  }).isRequired,

  harvest: PropTypes.shape({
    _id: PropTypes.string,
    status: PropTypes.string.isRequired,
    itemsFound: PropTypes.number
  }).isRequired,

  previousHarvest: PropTypes.shape({
    itemsFound: PropTypes.number
  }),

  t: PropTypes.func.isRequired
}

export default translate('catalogs')(Row)
