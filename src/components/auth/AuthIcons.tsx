import keyIcon from '../assets/key.svg'

export const EmailIcon = () => (
  <span style={{ color: '#77B4D8', fontWeight: 700, fontSize: '21px' }}>@</span>
)

export const KeyIcon = () => (
  <img src={keyIcon} width={16} height={16} alt="password" />
)
