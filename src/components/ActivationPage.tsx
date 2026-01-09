import React, { useState, useEffect } from 'react';
import { MamlukGrid } from './MamlukGrid';
import { supabase } from '../utils/supabase/client.ts';

interface ActivationPageProps {
  onActivated: (vaultToken: string, vaultId: string) => void;
  initialCode?: string;
}

/**
 * PAGE ACTIVATION — ARCHÉ
 * 
 * VERSION DIRECTE : Appel Supabase sans Edge Function
 */
export function ActivationPage({ onActivated, initialCode }: ActivationPageProps) {
  const [code, setCode] = useState(initialCode || '');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Si code pré-rempli dans URL, focus password
  useEffect(() => {
    if (initialCode) {
      document.getElementById('password-input')?.focus();
    }
  }, [initialCode]);

  // DEV : Générer des codes de test
  const generateTestCodes = async () => {
    try {
      console.log('🎯 Génération codes DIRECTE via Supabase...');
      
      const codes = [
        'ARCHE-6C3F-2E9D',
        'ARCHE-TEST-DEMO',
        'ARCHE-DEMO-2024'
      ];
      
      const inserted = [];
      const errors = [];
      
      for (const code of codes) {
        const { error } = await supabase
          .from('activation_codes')
          .insert({
            code,
            status: 'issued',
            created_at: new Date().toISOString()
          });
        
        if (error) {
          if (error.code === '23505') {
            console.log(`⚠️  Code ${code} existe déjà`);
            errors.push(`${code}: déjà existant`);
          } else {
            console.error(`❌ Erreur ${code}:`, error);
            errors.push(`${code}: ${error.message}`);
          }
        } else {
          console.log(`✅ Code ${code} créé`);
          inserted.push(code);
        }
      }
      
      console.log('📋 Résultat:', { inserted, errors });
      
      if (inserted.length > 0) {
        alert(`✅ Codes créés: ${inserted.join(', ')}`);
      } else if (errors.length > 0) {
        alert(`⚠️ Codes déjà existants. Vous pouvez les utiliser !`);
      }
      
    } catch (err) {
      console.error('❌ Erreur génération:', err);
      alert(`❌ Erreur: ${err}`);
    }
  };

  const handleUnlock = async () => {
    if (!code.trim() || !password.trim()) {
      setError('Code et mot de passe requis');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('🔓 Tentative unlock DIRECT...');
      console.log('📋 Code:', code);
      
      // 1. Récupérer le code d'activation DIRECTEMENT
      const { data: codeData, error: codeError } = await supabase
        .from('activation_codes')
        .select('*')
        .eq('code', code)
        .single();
      
      console.log('📦 Code data:', codeData);
      console.log('❌ Code error:', codeError);

      if (codeError || !codeData || codeData.status === 'revoked') {
        setError('Code invalide ou révoqué');
        return;
      }

      // 2. Si code non activé → ACTIVATION
      if (codeData.status === 'issued') {
        console.log('✨ Code neuf - activation...');
        
        // Créer vault (hash côté client pour l'instant - pas idéal mais fonctionne)
        const passwordHash = btoa(password); // Simple pour test
        
        const { data: vault, error: vaultError } = await supabase
          .from('vaults')
          .insert({ password_hash: passwordHash })
          .select()
          .single();
        
        if (vaultError || !vault) {
          console.error('❌ Erreur création vault:', vaultError);
          setError('Erreur lors de la création du vault');
          return;
        }
        
        console.log('✅ Vault créé:', vault.id);
        
        // Marquer code activé
        const { error: updateError } = await supabase
          .from('activation_codes')
          .update({
            status: 'activated',
            vault_id: vault.id,
            activated_at: new Date().toISOString()
          })
          .eq('code', code);
        
        if (updateError) {
          console.error('❌ Erreur activation:', updateError);
          setError('Erreur lors de l\'activation');
          return;
        }
        
        console.log('✅ Activation réussie!');
        localStorage.setItem('vault_id', vault.id);
        onActivated('', vault.id);
        return;
      }

      // 3. Si code déjà activé → LOGIN
      if (codeData.status === 'activated') {
        console.log('🔑 Code déjà activé - login...');
        
        const { data: vault, error: vaultError } = await supabase
          .from('vaults')
          .select('*')
          .eq('id', codeData.vault_id)
          .single();
        
        if (vaultError || !vault) {
          console.error('❌ Erreur vault:', vaultError);
          setError('Impossible de déverrouiller ce code');
          return;
        }
        
        // Vérifier password
        const passwordHash = btoa(password);
        if (passwordHash !== vault.password_hash) {
          setError('Impossible de déverrouiller ce code');
          return;
        }
        
        console.log('✅ Login réussi!');
        localStorage.setItem('vault_id', vault.id);
        onActivated('', vault.id);
        return;
      }

      setError('Statut de code invalide');

    } catch (err) {
      console.error('❌ Erreur unlock:', err);
      setError('Erreur de connexion');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleUnlock();
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FAF8F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 'var(--space-xl)'
      }}
    >
      <MamlukGrid pattern="star8" opacity={0.02} scale={1.5} />

      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Titre */}
        <h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '38px',
            fontWeight: '400',
            color: '#1A1A1A',
            textAlign: 'center',
            marginBottom: 'var(--space-xs)',
            letterSpacing: '-0.01em'
          }}
        >
          Ouvrir mon ARCHÉ
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '16px',
            fontStyle: 'italic',
            color: '#1A1A1A',
            opacity: 0.5,
            textAlign: 'center',
            marginBottom: 'var(--space-xxl)'
          }}
        >
          Votre carte est la porte.
        </p>

        {/* DEV ONLY : Bouton pour générer des codes */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-lg)' }}>
          <button
            onClick={generateTestCodes}
            style={{
              padding: '8px 16px',
              background: '#FFD700',
              color: '#000',
              border: '1px solid #000',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              cursor: 'pointer'
            }}
          >
            [DEV] Générer codes test
          </button>
        </div>

        {/* Formulaire */}
        <div
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(0, 61, 44, 0.1)',
            padding: 'var(--space-xl)',
            backdropFilter: 'blur(10px)'
          }}
        >
          {/* Code */}
          <label
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              opacity: 0.6,
              display: 'block',
              marginBottom: 'var(--space-xs)'
            }}
          >
            Code
          </label>
          <input
            id="code-input"
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Code d'activation"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              border: '1px solid rgba(0, 61, 44, 0.2)',
              background: '#FFFFFF',
              color: '#1A1A1A',
              marginBottom: 'var(--space-sm)'
            }}
          />

          {/* Mot de passe */}
          <label
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#1A1A1A',
              opacity: 0.6,
              display: 'block',
              marginBottom: 'var(--space-xs)'
            }}
          >
            Clé
          </label>
          <input
            id="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Votre clé personnelle"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '16px',
              fontFamily: 'var(--font-sans)',
              fontSize: '16px',
              border: '1px solid rgba(0, 61, 44, 0.2)',
              background: '#FFFFFF',
              color: '#1A1A1A',
              marginBottom: 'var(--space-sm)'
            }}
          />

          {/* Avertissement */}
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '13px',
              fontStyle: 'italic',
              color: '#1A1A1A',
              opacity: 0.5,
              marginBottom: 'var(--space-lg)',
              lineHeight: '1.6'
            }}
          >
            Sans cette clé, votre Carnet est inaccessible.
          </p>

          {/* Erreur */}
          {error && (
            <div
              style={{
                padding: 'var(--space-md)',
                background: 'rgba(139, 0, 0, 0.08)',
                border: '1px solid rgba(139, 0, 0, 0.2)',
                color: '#8B0000',
                fontSize: '14px',
                marginBottom: 'var(--space-lg)',
                fontFamily: 'var(--font-sans)'
              }}
            >
              {error}
            </div>
          )}

          {/* Bouton */}
          <button
            onClick={handleUnlock}
            disabled={isLoading || !password.trim()}
            style={{
              width: '100%',
              padding: '18px',
              background: '#003D2C',
              color: '#FAF8F2',
              border: 'none',
              fontFamily: 'var(--font-sans)',
              fontSize: '13px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              cursor: isLoading ? 'wait' : 'pointer',
              opacity: isLoading || !password.trim() ? 0.5 : 1,
              transition: 'all var(--transition)'
            }}
          >
            {isLoading ? 'Ouverture...' : 'Entrer'}
          </button>
        </div>
      </div>
    </div>
  );
}