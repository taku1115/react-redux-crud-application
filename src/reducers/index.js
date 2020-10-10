import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'; // reducerという名前は一般的すぎるためここではformという名前を用いる
import events from './events'

export default combineReducers({ events, form })