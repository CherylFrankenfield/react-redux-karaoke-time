import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { restartSong } from './../actions';

const SongList = ({ dispatch, songList }) => {
  let action;
  return (
    <div>
      <em>Or select from our list:</em>
      {Object.keys(songList).map(songId => {
        let song = songList[songId];
        return <li key = {songId} onClick = {() => {
          if (song.arrayPosition > 0){
            dispatch(restartSong(songId));
          }
          action = {
            type: 'CHANGE_SONG',
            newSelectedSongId: songId
          };
          dispatch(action);
        }}>
          {song.title} by {song.artist}</li>;
      })}
    </div>
  );
};

SongList.propTypes = {
  songList: PropTypes.object,
  dispatch: PropTypes.func
};

const mapStateToProps = state => {
  return {
    songList: state.songsById
  };
};

export default connect(mapStateToProps)(SongList);
