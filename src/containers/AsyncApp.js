import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { selectDate, fetchDateIfNeded, invalidateDate } from '../actions';
import Player from '../components/Player';

class AsyncApp extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
    }
  }
}
