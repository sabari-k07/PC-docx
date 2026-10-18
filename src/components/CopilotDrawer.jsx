/**
 * PC_DOCx Copilot Drawer Component
 * Powered by Google Gemini 2.5 Flash + Supabase Edge Functions with local inference fallback
 */

import React from 'react';
import { AIChatDrawer } from './AIChatDrawer.jsx';

export const CopilotDrawer = (props) => {
  return <AIChatDrawer {...props} />;
};

export default CopilotDrawer;
