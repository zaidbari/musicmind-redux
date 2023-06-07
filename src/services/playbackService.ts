import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event, RepeatMode } from 'react-native-track-player'

export const PlaybackService = async function () {
	TrackPlayer.addEventListener(Event.RemotePlay, () => TrackPlayer.play())
	TrackPlayer.addEventListener(Event.RemotePause, () => TrackPlayer.pause())
	TrackPlayer.addEventListener(Event.RemoteNext, () => TrackPlayer.skipToNext())
	TrackPlayer.addEventListener(Event.RemotePrevious, () => TrackPlayer.skipToPrevious())
	TrackPlayer.addEventListener(Event.RemoteStop, () => TrackPlayer.reset())
}

export async function setupTrackPlayer() {
	let isSetup = false
	try {
		await TrackPlayer.getCurrentTrack()
		isSetup = true
	} catch {
		await TrackPlayer.setupPlayer()
		await TrackPlayer.updateOptions({
			android: {
				appKilledPlaybackBehavior: AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification
			},
			capabilities: [
				Capability.Play,
				Capability.Pause,
				Capability.SkipToNext,
				Capability.SkipToPrevious,
				Capability.SeekTo
			],
			compactCapabilities: [Capability.Play, Capability.Pause, Capability.SkipToPrevious, Capability.SkipToNext],
			progressUpdateEventInterval: 2
		})

		await TrackPlayer.setRepeatMode(RepeatMode.Queue)

		isSetup = true
	} finally {
		return isSetup
	}
}
