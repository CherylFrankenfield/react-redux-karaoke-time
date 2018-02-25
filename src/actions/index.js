import * as types from './../constants/ActionTypes';
import v4 from 'uuid/v4';

export const nextLyric = (currentSongId) => ({
  type: types.NEXT_LYRIC,
  currentSongId
});

export const restartSong = (currentSongId) => ({
  type: types.RESTART_SONG,
  currentSongId
});

export const changeSong = (newSelectedSongId) => ({
  type: types.CHANGE_SONG,
  newSelectedSongId
});

export const requestSong = (title, localSongId) => ({
  type: types.REQUEST_SONG,
  title,
  songId: localSongId
});

export const receiveSong = (title, artist, songId, songArray) => ({
  type: types.RECEIVE_SONG,
  songId,
  title,
  artist,
  songArray,
  receivedAt: Date.now()
});

export function fetchSongId(title) {
  return function (dispatch) {
    const localSongId = v4();
    dispatch(requestSong(title, localSongId));
    title = title.replace(' ', '_');
    return fetch('http://api.musixmatch.com/ws/1.1/track.search?&q_track=' + title + '&page_size=1&s_track_rating=desc&apikey=8c541ea7b82482967149f352f33e6dbd').then(
      response => response.json(),
      error => console.log('An error occurred.', error)
    ).then(function(json) {
      // console.log('CHECK OUT THIS SWEET API RESPONSE:', json);
      if (json.message.body.track_list.length > 0) {
        const musicMatchId = json.message.body.track_list[0].track.track_id;
        const artist = json.message.body.track_list[0].track.artist_name;
        const title = json.message.body.track_list[0].track.track_name;
        fetchLyrics(title, artist, musicMatchId, localSongId, dispatch);
      } else {
        console.log('We couldn\'t locate a song under that ID');
      }
    });
  };
}

export function fetchLyrics(title, artist, musicMatchId, localSongId, dispatch) {
  return fetch('http://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=' + musicMatchId + '&apikey=8c541ea7b82482967149f352f33e6dbd').then(
    response => response.json(),
    error => console.log('An error occurred.', error)
  ).then(function(json) {
    console.log('HEY WOW, A SECOND API RESPONSE', json);
  });
}
