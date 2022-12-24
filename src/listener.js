/* eslint-disable no-underscore-dangle */
class Listener {
    constructor(playlistService, mailSender) {
        this._playlistService = playlistService;
        this._mailSender = mailSender;

        this.listen = this.listen.bind(this);
    }

    async listen(message) {
        try {
            const { userId, targetEmail } = JSON.parse(message.content.toString());

            
            const playlist = await this._playlistService.getPlaylistById(userId);
            const songs = await this._playlistService.getSongInPlaylistById(userId);

            const data = ({
                playlist: {
                    ...playlist,
                    songs,
                }
            })
            const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(data));
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = Listener;
