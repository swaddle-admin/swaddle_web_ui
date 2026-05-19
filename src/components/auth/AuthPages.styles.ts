export const pageStyle = {
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '16px',
}

export const cardStyle = {
  backgroundColor: 'rgba(255,255,255,0.15)',
  backdropFilter: 'blur(12px)',
  borderRadius: '24px',
  border: '1px solid rgba(255,255,255,0.4)',
  padding: '40px 32px',
  width: '100%',
  maxWidth: '420px',
}

export const pillStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '50px',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  height: '58px',

  '&::placeholder': {
    color: 'white',
    opacity: 1,
  },
}

export const pillInnerInputStyle = {
  textIndent: '30px',
  color: 'white',
  fontSize: '16px',

  '&::placeholder': {
    color: 'white',
    opacity: 1,
  },
}

export const iconWrapperStyle = {
  backgroundColor: 'white',
  borderRadius: '50%',
  width: '50px',
  height: '50px',
  minWidth: '50px',
  minHeight: '50px',
  aspectRatio: '1 / 1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '24px',
  flexShrink: 0,
}

export const buttonStyle = {
  background: 'linear-gradient(135deg, #4599CA 0%, #6745AB 100%)',
  borderRadius: '50px',
  height: '56px',
  border: 'none',
  fontSize: '16px',
  fontWeight: 700,
}
