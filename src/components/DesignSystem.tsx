interface DesignSystemProps {
  onBack: () => void;
}

export function DesignSystem({ onBack }: DesignSystemProps) {
  return (
    <div className="min-h-screen pb-16" style={{ background: 'var(--paper)' }}>
      {/* Header */}
      <div style={{ padding: 'var(--space-xl) var(--space-lg) var(--space-lg)', borderBottom: '0.5px solid var(--grey-light)' }}>
        <button
          onClick={onBack}
          className="transition-opacity small-caps"
          style={{
            background: 'transparent',
            opacity: 0.5,
            marginBottom: 'var(--space-md)',
            transition: 'opacity var(--transition)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
        >
          ‹ Retour
        </button>

        <h1 style={{ marginBottom: 'var(--space-xs)' }}>Design System</h1>
        <p className="small-caps">Petit Souvenir — CityNodes Paris</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--space-xl) var(--space-lg)' }}>
        
        {/* Color Tokens */}
        <section style={{ marginBottom: 'var(--space-xxl)' }}>
          <h2 style={{ marginBottom: 'var(--space-lg)' }}>Color Tokens</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
            {[
              { name: 'Paper', value: '#FAF8F2', var: '--paper' },
              { name: 'Ink', value: '#1A1A1A', var: '--ink' },
              { name: 'Green', value: '#003D2C', var: '--green' },
              { name: 'Gold', value: '#A38767', var: '--gold' },
              { name: 'Grey Light', value: '#E8E5DE', var: '--grey-light' },
              { name: 'Grey Medium', value: '#C8C4BA', var: '--grey-medium' }
            ].map((color) => (
              <div key={color.name} style={{ border: '0.5px solid var(--grey-light)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '80px', background: `var(${color.var})` }} />
                <div style={{ padding: 'var(--space-sm)' }}>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: '14px', fontWeight: '500', marginBottom: '4px' }}>{color.name}</p>
                  <p className="small-caps" style={{ fontSize: '10px' }}>{color.value}</p>
                  <p className="small-caps" style={{ fontSize: '10px', opacity: 0.4 }}>{color.var}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section style={{ marginBottom: 'var(--space-xxl)' }}>
          <h2 style={{ marginBottom: 'var(--space-lg)' }}>Typography</h2>
          
          <div style={{ border: '0.5px solid var(--grey-light)', borderRadius: '2px', padding: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
            <h1 style={{ marginBottom: 'var(--space-xs)' }}>Heading 1 — Cormorant Garamond</h1>
            <p className="small-caps">46px / 400 / -0.02em tracking / 1.1 line height</p>
          </div>

          <div style={{ border: '0.5px solid var(--grey-light)', borderRadius: '2px', padding: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
            <h2 style={{ marginBottom: 'var(--space-xs)' }}>Heading 2 — Cormorant Garamond</h2>
            <p className="small-caps">32px / 400 / -0.01em tracking / 1.2 line height</p>
          </div>

          <div style={{ border: '0.5px solid var(--grey-light)', borderRadius: '2px', padding: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
            <h3 style={{ marginBottom: 'var(--space-xs)' }}>Heading 3 — Cormorant Garamond</h3>
            <p className="small-caps">24px / 400 / 0 tracking / 1.3 line height</p>
          </div>

          <div style={{ border: '0.5px solid var(--grey-light)', borderRadius: '2px', padding: 'var(--space-lg)', marginBottom: 'var(--space-md)' }}>
            <p style={{ marginBottom: 'var(--space-xs)' }}>Body Text — Inter Regular</p>
            <p className="small-caps">17px / 400 / 1.4 line height</p>
          </div>

          <div style={{ border: '0.5px solid var(--grey-light)', borderRadius: '2px', padding: 'var(--space-lg)' }}>
            <p className="small-caps" style={{ marginBottom: 'var(--space-xs)', opacity: 1 }}>Small Caps — Inter Medium</p>
            <p className="small-caps">11px / 500 / +120 tracking / uppercase</p>
          </div>
        </section>

        {/* Buttons */}
        <section style={{ marginBottom: 'var(--space-xxl)' }}>
          <h2 style={{ marginBottom: 'var(--space-lg)' }}>Buttons</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', maxWidth: '400px' }}>
            <button
              style={{
                background: 'var(--green)',
                color: 'var(--paper)',
                padding: '20px 40px',
                borderRadius: '2px',
                fontFamily: 'var(--font-serif)',
                fontSize: '16px',
                fontWeight: '400',
                boxShadow: 'inset 0 -1px 0 rgba(0,0,0,0.1)'
              }}
            >
              Primary Button
            </button>

            <button
              style={{
                background: 'transparent',
                color: 'var(--ink)',
                padding: '16px 24px',
                borderRadius: '2px',
                border: '0.5px solid var(--grey-light)',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              Secondary Button
            </button>

            <button
              style={{
                background: 'transparent',
                color: 'var(--green)',
                border: '0.5px solid var(--green)',
                padding: '16px 24px',
                borderRadius: '2px',
                fontFamily: 'var(--font-sans)',
                fontSize: '11px',
                fontWeight: '500',
                letterSpacing: '0.12em',
                textTransform: 'uppercase'
              }}
            >
              Outlined Button
            </button>
          </div>
        </section>

        {/* Dividers */}
        <section style={{ marginBottom: 'var(--space-xxl)' }}>
          <h2 style={{ marginBottom: 'var(--space-lg)' }}>Architecture Lines & Dividers</h2>
          
          <div style={{ border: '0.5px solid var(--grey-light)', borderRadius: '2px', padding: 'var(--space-lg)' }}>
            <p style={{ marginBottom: 'var(--space-md)', fontSize: '14px', opacity: 0.6 }}>Thin Line (0.5px)</p>
            <div style={{ height: '0.5px', background: 'var(--grey-light)', marginBottom: 'var(--space-lg)' }} />
            
            <p style={{ marginBottom: 'var(--space-md)', fontSize: '14px', opacity: 0.6 }}>Medium Line (1px)</p>
            <div style={{ height: '1px', background: 'var(--grey-medium)', marginBottom: 'var(--space-lg)' }} />
            
            <p style={{ marginBottom: 'var(--space-md)', fontSize: '14px', opacity: 0.6 }}>Dotted Border</p>
            <div style={{ height: '60px', border: '0.5px dotted var(--grey-light)', borderRadius: '2px' }} />
          </div>
        </section>

        {/* Shadows */}
        <section style={{ marginBottom: 'var(--space-xxl)' }}>
          <h2 style={{ marginBottom: 'var(--space-lg)' }}>Shadows</h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-md)' }}>
            <div style={{ 
              padding: 'var(--space-lg)', 
              background: 'white', 
              borderRadius: '2px',
              boxShadow: 'var(--shadow-sm)'
            }}>
              <p style={{ fontSize: '14px', marginBottom: '4px' }}>Small</p>
              <p className="small-caps" style={{ fontSize: '10px' }}>0 1px 2px rgba(26, 26, 26, 0.04)</p>
            </div>

            <div style={{ 
              padding: 'var(--space-lg)', 
              background: 'white', 
              borderRadius: '2px',
              boxShadow: 'var(--shadow-md)'
            }}>
              <p style={{ fontSize: '14px', marginBottom: '4px' }}>Medium</p>
              <p className="small-caps" style={{ fontSize: '10px' }}>0 2px 8px rgba(26, 26, 26, 0.06)</p>
            </div>

            <div style={{ 
              padding: 'var(--space-lg)', 
              background: 'white', 
              borderRadius: '2px',
              boxShadow: 'var(--shadow-lg)'
            }}>
              <p style={{ fontSize: '14px', marginBottom: '4px' }}>Large</p>
              <p className="small-caps" style={{ fontSize: '10px' }}>0 4px 16px rgba(26, 26, 26, 0.08)</p>
            </div>
          </div>
        </section>

        {/* Spacing Grid */}
        <section style={{ marginBottom: 'var(--space-xxl)' }}>
          <h2 style={{ marginBottom: 'var(--space-lg)' }}>Editorial Spacing</h2>
          
          <div style={{ border: '0.5px solid var(--grey-light)', borderRadius: '2px', padding: 'var(--space-lg)' }}>
            {[
              { name: 'XS', value: '8px', var: '--space-xs' },
              { name: 'SM', value: '16px', var: '--space-sm' },
              { name: 'MD', value: '24px', var: '--space-md' },
              { name: 'LG', value: '40px', var: '--space-lg' },
              { name: 'XL', value: '64px', var: '--space-xl' },
              { name: 'XXL', value: '96px', var: '--space-xxl' }
            ].map((space, index) => (
              <div key={space.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)', marginBottom: index < 5 ? 'var(--space-md)' : 0 }}>
                <p className="small-caps" style={{ width: '60px', opacity: 1 }}>{space.name}</p>
                <div style={{ 
                  width: space.value, 
                  height: '24px', 
                  background: 'var(--green)', 
                  opacity: 0.3,
                  border: '0.5px solid var(--green)'
                }} />
                <p style={{ fontSize: '13px', opacity: 0.6 }}>{space.value}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Card Components */}
        <section>
          <h2 style={{ marginBottom: 'var(--space-lg)' }}>Card Components</h2>
          
          {/* Bordered Card */}
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <p className="small-caps" style={{ marginBottom: 'var(--space-sm)', opacity: 1 }}>Thin Bordered Card</p>
            <div style={{ 
              border: '0.5px solid var(--grey-light)', 
              borderRadius: '2px', 
              padding: 'var(--space-lg)',
              maxWidth: '500px'
            }}>
              <h3 style={{ marginBottom: 'var(--space-sm)' }}>Card Title</h3>
              <p style={{ fontSize: '14px', opacity: 0.6 }}>
                This is an example of a thin-bordered card component with minimal styling and generous padding.
              </p>
            </div>
          </div>

          {/* Quote Card */}
          <div style={{ marginBottom: 'var(--space-md)' }}>
            <p className="small-caps" style={{ marginBottom: 'var(--space-sm)', opacity: 1 }}>Dotted Quote Box</p>
            <div style={{ 
              border: '0.5px dotted var(--grey-light)', 
              borderRadius: '2px', 
              padding: 'var(--space-lg)',
              background: 'rgba(232, 229, 222, 0.15)',
              maxWidth: '500px'
            }}>
              <p style={{ 
                fontFamily: 'var(--font-serif)', 
                fontSize: '17px', 
                fontStyle: 'italic',
                fontWeight: '300',
                lineHeight: '1.6'
              }}>
                "Chaque expérience est une nouvelle histoire parisienne"
              </p>
            </div>
          </div>

          {/* Architectural Frame */}
          <div>
            <p className="small-caps" style={{ marginBottom: 'var(--space-sm)', opacity: 1 }}>Architectural Frame</p>
            <div style={{ 
              border: '0.5px solid var(--grey-light)', 
              borderRadius: '2px', 
              padding: 'var(--space-lg)',
              maxWidth: '500px',
              position: 'relative'
            }}>
              {/* Corner decorations */}
              <div style={{ position: 'absolute', top: '-1px', left: '-1px', width: '16px', height: '16px', borderTop: '1px solid var(--ink)', borderLeft: '1px solid var(--ink)', opacity: 0.2 }} />
              <div style={{ position: 'absolute', top: '-1px', right: '-1px', width: '16px', height: '16px', borderTop: '1px solid var(--ink)', borderRight: '1px solid var(--ink)', opacity: 0.2 }} />
              <div style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '16px', height: '16px', borderBottom: '1px solid var(--ink)', borderLeft: '1px solid var(--ink)', opacity: 0.2 }} />
              <div style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '16px', height: '16px', borderBottom: '1px solid var(--ink)', borderRight: '1px solid var(--ink)', opacity: 0.2 }} />
              
              <h3 style={{ marginBottom: 'var(--space-sm)' }}>Architectural Frame</h3>
              <p style={{ fontSize: '14px', opacity: 0.6 }}>
                Frame with corner decorations inspired by architectural drawings.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
