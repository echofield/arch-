interface BackButtonProps {
  onClick: () => void;
  label?: string;
}

/**
 * BACK BUTTON — Composant réutilisable
 * Style éditorial cohérent avec ARCHÉ
 */
export function BackButton({ onClick, label = 'Retour' }: BackButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed',
        top: 'clamp(20px, 4vw, 32px)',
        left: 'clamp(20px, 4vw, 32px)',
        background: 'transparent',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: 'clamp(11px, 2vw, 13px)',
        color: '#6B6455',
        cursor: 'pointer',
        opacity: 0.4,
        transition: 'opacity 400ms',
        zIndex: 1000,
        fontFamily: 'Cormorant Garamond, serif',
        letterSpacing: '0.05em',
        padding: '8px 12px',
        WebkitTapHighlightColor: 'transparent'
      }}
      onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'}
      onMouseLeave={(e) => e.currentTarget.style.opacity = '0.4'}
      onTouchStart={(e) => e.currentTarget.style.opacity = '0.9'}
      onTouchEnd={(e) => e.currentTarget.style.opacity = '0.4'}
    >
      <span style={{ fontSize: 'clamp(16px, 3vw, 20px)' }}>‹</span>
      <span className="back-label">{label}</span>
    </button>
  );
}
