export const containerStyle = {
  position: 'fixed' as const,
  bottom: 0,
  left: 0,
  right: 0,
  padding: '16px',
  paddingBottom: 'calc(16px + env(safe-area-inset-bottom))',
  display: 'flex',
  justifyContent: 'center',
}

export const inputBarStyle = {
  width: '100%',
  maxWidth: '768px',
  backgroundColor: 'white',
  borderRadius: '32px',
  padding: '8px 8px 8px 16px',
  boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
}

export const dividerStyle = {
  width: '1px',
  height: '24px',
  backgroundColor: 'rgba(0,0,0,0.1)',
  margin: '0 8px',
}
