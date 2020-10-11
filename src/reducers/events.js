import _ from 'lodash'
import { 
  READ_EVENTS,
  DELETE_EVENTS,
} from '../actions'

export default (events = {}, action) => {
  switch (action.type) {
    case READ_EVENTS:
      return _.mapKeys(action.response.data, 'id')
    case DELETE_EVENTS:
      delete events[action.id]
      return { ...events } //スプレット演算子（更新後の画面を返してくれる）
    default:
      return events
  }
}