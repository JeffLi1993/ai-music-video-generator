export const fetchDefaultMediaStream = (): Promise<MediaStream> => {
  return navigator.mediaDevices.getUserMedia({ audio: true })
}

export const fetchMediaStream = (deviceId?: string): Promise<MediaStream> => {
  if (!deviceId) {
    return fetchDefaultMediaStream()
  }
  return navigator.mediaDevices.getUserMedia({ audio: { deviceId } })
}

export const fetchAvailableAudioDevices = async (): Promise<MediaDeviceInfo[]> => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  return devices.filter((device) => device.kind === 'audioinput')
}

export const getMediaStreamDeviceId = (stream: MediaStream): string | null => {
  const [track] = stream.getAudioTracks()
  const { deviceId } = track.getSettings()
  return deviceId ?? null
}

export const stopMediaStream = (stream: MediaStream) : void => {
  stream.getTracks().forEach((track) => track.stop())
}

export const getPermissionStatus = async (): Promise<PermissionStatus> => {
  const status = await navigator.permissions.query({ name: 'microphone' })
  return status
}
