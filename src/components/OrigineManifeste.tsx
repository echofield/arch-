import { MamlukGrid } from './MamlukGrid';
import { ArrowLeft } from 'lucide-react';

interface OrigineProps {
  onBack: () => void;
}

/**
 * PAGE ORIGINE — MANIFESTE
 * 
 * Texte fondateur.
 * Paris comme origine, geste, mesure.
 * 
 * Aucune interaction, aucun quiz.
 * Pure lecture éditoriale.
 */
export function OrigineManifeste({ onBack }: OrigineProps) {
  return (
    <div 
      className="min-h-screen relative"
      style={{ 
        background: '#FAF8F2',
        overflow: 'auto'
      }}
    >
      {/* Ghost Grid */}
      <MamlukGrid pattern="octagon" opacity={0.015} scale={1.2} rotation={15} layers={1} />

      {/* Header avec retour */}
      <header 
        style={{
          position: 'sticky',
          top: 0,
          background: 'rgba(250, 248, 242, 0.95)',
          backdropFilter: 'blur(8px)',
          borderBottom: '0.5px solid rgba(0, 61, 44, 0.1)',
          padding: 'var(--space-lg) var(--space-xl)',
          zIndex: 100
        }}
      >
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: '#003D2C',
            fontFamily: 'var(--font-sans)',
            fontSize: '11px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            opacity: 0.6,
            transition: 'opacity var(--transition)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
          onMouseLeave={(e) => e.currentTarget.style.opacity = '0.6'}
        >
          <ArrowLeft size={16} />
          Retour
        </button>
      </header>

      {/* Container principal */}
      <article 
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: 'var(--space-xxl) var(--space-xl)',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Titre */}
        <h1 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '56px',
            fontWeight: '600',
            lineHeight: '1.1',
            letterSpacing: '-0.01em',
            color: '#1A1A1A',
            marginBottom: '16px',
            textAlign: 'center'
          }}
        >
          ORIGINE
        </h1>

        {/* Sous-titre */}
        <p 
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '12px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#003D2C',
            opacity: 0.6,
            textAlign: 'center',
            marginBottom: '64px'
          }}
        >
          Paris comme geste fondateur
        </p>

        {/* Ligne décorative */}
        <div 
          style={{
            width: '80px',
            height: '1px',
            background: 'linear-gradient(to right, transparent, #003D2C, transparent)',
            margin: '0 auto var(--space-xxl)',
            opacity: 0.2
          }}
        />

        {/* Texte manifeste */}
        <div 
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '19px',
            lineHeight: '1.75',
            color: '#1A1A1A',
            opacity: 0.9
          }}
        >
          <p style={{ marginBottom: 'var(--space-xl)' }}>
            Paris n'est pas une destination. Paris est un geste fondateur.
          </p>

          <p style={{ marginBottom: 'var(--space-xl)' }}>
            Ce projet ne vous guidera pas. Il ne vous dira pas où aller, quoi voir, comment vous déplacer. 
            Il vous propose trois portes — trois manières de traverser la ville — et vous laisse marcher.
          </p>

          <p style={{ marginBottom: 'var(--space-xl)' }}>
            Nous avons choisi de ne pas tout montrer. De ne pas cartographier chaque ruelle. De ne pas indexer 
            chaque monument. Ce silence est délibéré. Il laisse de la place pour ce qui compte : votre regard, 
            votre pas, votre présence.
          </p>

          <p style={{ marginBottom: 'var(--space-xl)' }}>
            <em>Le Grand Hôtel</em> est un seuil symbolique. Vous entrez. Vous choisissez une porte. Vous sortez. 
            Paris commence là où ce produit s'arrête : dans la rue, sous vos pieds, devant vos yeux.
          </p>

          <p style={{ marginBottom: 'var(--space-xl)' }}>
            Trois quêtes seulement. Trois fils narratifs. Trois registres pour comprendre comment Paris 
            s'est construit, comment il s'est transformé, comment il vit encore.
          </p>

          <p style={{ marginBottom: 'var(--space-xl)' }}>
            <strong style={{ fontWeight: '600' }}>Lutèce — Origine</strong> vous ramène au geste premier, 
            à la fondation. Quand Paris n'était qu'une île, un franchissement, une décision.
          </p>

          <p style={{ marginBottom: 'var(--space-xl)' }}>
            <strong style={{ fontWeight: '600' }}>1789 — Décision</strong> vous plonge dans le moment de rupture. 
            Quand la ville devient le théâtre d'une révolution qui change l'histoire du monde.
          </p>

          <p style={{ marginBottom: 'var(--space-xl)' }}>
            <strong style={{ fontWeight: '600' }}>Vin & Table — Vie Parisienne</strong> vous raconte la ville 
            vivante, celle qui se nourrit, qui boit, qui parle. Paris comme corps, comme métabolisme.
          </p>

          <p style={{ marginBottom: 'var(--space-xl)' }}>
            Nous n'avons pas conçu une application. Nous avons dessiné un objet éditorial. Cette interface 
            pourrait être imprimée sans perdre son sens. Elle ne propose pas de fonctionnalités — elle propose 
            des seuils.
          </p>

          <p style={{ marginBottom: 'var(--space-xl)' }}>
            Pas de quiz pour vous orienter. Pas de profil pour vous catégoriser. Pas de score pour mesurer 
            votre parcours. Vous choisissez. Vous marchez. C'est tout.
          </p>

          <p style={{ marginBottom: 'var(--space-xl)', fontStyle: 'italic', opacity: 0.7 }}>
            Paris mesure. Paris pèse. Paris juge. Mais d'abord, Paris accueille.
          </p>

          <p style={{ marginBottom: 'var(--space-xl)', fontStyle: 'italic', opacity: 0.7 }}>
            Entrez. Marchez. Écoutez.
          </p>
        </div>

        {/* Signature */}
        <div 
          style={{
            marginTop: 'var(--space-xxl)',
            paddingTop: 'var(--space-xl)',
            borderTop: '0.5px solid rgba(0, 61, 44, 0.1)',
            textAlign: 'center'
          }}
        >
          <p 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '18px',
              color: '#1A1A1A',
              opacity: 0.3,
              fontStyle: 'italic'
            }}
          >
            Petit Souvenir — Édition Hôtel
          </p>
        </div>
      </article>
    </div>
  );
}
