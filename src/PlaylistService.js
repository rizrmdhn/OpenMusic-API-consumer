/* eslint-disable no-underscore-dangle */
const { Pool } = require('pg');

class PlaylistService {
    constructor() {
        this._pool = new Pool();
    }

    async getPlaylistById(userId) {

        const query = {
            text: `SELECT playlist.id, playlist.name
            FROM playlist
            LEFT JOIN collaborations ON collaborations.playlists_id = playlist.id
            WHERE playlist.owner = $1 OR collaborations.users_id = $1
            GROUP BY playlist.id
            `,
            values: [userId],
        };

        const result = await this._pool.query(query);

        return result.rows[0];
    }

    async getSongInPlaylistById(userId) {
        const query = {
            text: `SELECT song.id, song.title, song.performer
            FROM playlist_songs
			LEFT JOIN playlist ON playlist.id = playlist_songs.playlist_id
            LEFT JOIN song ON song.id = playlist_songs.song_id
			LEFT JOIN users ON users.id = playlist.owner
            WHERE playlist.owner = $1`,
            values: [userId],
        };

        const result = await this._pool.query(query);

        return result.rows;
    }

}

module.exports = PlaylistService;