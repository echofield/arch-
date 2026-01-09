/**
 * ARCHÉ — Client Supabase Singleton
 * 
 * Instance unique partagée pour éviter les multiples GoTrueClient
 */

import { createClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from './info';

// Client singleton - une seule instance pour toute l'app
export const supabase = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);
