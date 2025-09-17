import * as React from 'react';

export interface ITestAppProps {
  title: string;
}

export const TestApp: React.FC<ITestAppProps> = ({ title }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f5f5f5', borderRadius: '8px' }}>
      <h2>✅ WebPart Test - {title}</h2>
      <p>Se você está vendo esta mensagem, o WebPart está carregando corretamente!</p>
      <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'white', borderRadius: '4px' }}>
        <strong>Status:</strong> ✅ Funcionando
      </div>
    </div>
  );
};