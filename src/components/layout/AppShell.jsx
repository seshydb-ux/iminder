import React from 'react';

export const AppShell = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--bg-color)' }}>
      {/* Main Content Area */}
      <div style={{ flex: 1, paddingBottom: '20px', overflowY: 'auto' }}>
        {children}
      </div>
    </div>
  );
};
