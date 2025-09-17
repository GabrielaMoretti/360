# 🚀 RH Network SPFx - Instruções de Setup

## 📋 Pré-requisitos

### Node.js
O projeto requer **Node.js 18.x** (18.17.1 a 18.x.x). **NÃO use Node.js 22.x**!

```bash
# Se você tem NVM instalado:
nvm install 18.20.4
nvm use 18.20.4

# Verificar versão
node --version  # Deve mostrar v18.x.x
```

### SharePoint Framework
```bash
npm install -g @microsoft/generator-sharepoint
npm install -g gulp-cli
```

## 🔧 Setup do Projeto

### 1. Instalar Dependências
```bash
cd samples/RHNetworkSPFx
npm install
```

### 2. Build do Projeto
```bash
npm run build
```

### 3. Servidor de Desenvolvimento
```bash
npm run serve
```

O servidor irá abrir em: `http://localhost:4321`

### 4. Build de Produção
```bash
npm run build:production
```

O arquivo `.sppkg` será gerado em: `sharepoint/solution/rh-network-spfx.sppkg`

## 🧪 Testando a Aplicação

### Opção 1: Página de Teste Simples
- Abra: `http://localhost:4321/test.html`
- Interface simplificada para testar funcionalidades

### Opção 2: SharePoint Workbench
- Abra: `http://localhost:4321`
- Interface oficial do SPFx
- Clique em "+" para adicionar o Web Part "RH Network"

## 📦 Deploy no SharePoint

### 1. Fazer Upload do Pacote
1. Acesse o **App Catalog** do seu tenant SharePoint
2. Faça upload do arquivo: `sharepoint/solution/rh-network-spfx.sppkg`
3. Clique em **Deploy**

### 2. Adicionar à Página
1. Edite uma página SharePoint
2. Clique em **+** para adicionar Web Part
3. Procure por **"RH Network"**
4. Adicione à página

## 🎯 Funcionalidades

- ✅ **Dashboard** com estatísticas de RH
- ✅ **Navegação social** entre perfis de colaboradores
- ✅ **Visualização de projetos** e relacionamentos
- ✅ **Interface moderna** com Fluent UI v9
- ✅ **Design responsivo** para mobile/desktop
- ✅ **Localização** pt-br e en-us

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── RhNetworkApp.tsx    # Componente principal
│   ├── NetworkNavigator.tsx # Navegador de rede
│   └── NetworkProfile.tsx   # Perfil de colaborador
├── models/              # Interfaces TypeScript
├── webparts/           # Web Part SPFx
└── assets/             # Recursos estáticos
```

## ⚠️ Problemas Conhecidos

### Node.js Version Error
Se aparecer erro de versão do Node.js:
```bash
nvm use 18.20.4
# ou
nvm install 18.20.4 && nvm use 18.20.4
```

### Vulnerabilidades de Segurança
84 vulnerabilidades foram detectadas (não impedem funcionamento):
```bash
npm audit fix  # Para corrigir automaticamente
```

### Source Map Warnings
Warnings sobre arquivos .map faltando - não afetam funcionalidade.

## 📞 Suporte

- Projeto testado e funcional ✅
- Build de produção funcionando ✅
- Pacote `.sppkg` gerado com sucesso ✅
- Interface moderna e responsiva ✅

---

**Último teste:** 17/09/2025 - Todas as funcionalidades operacionais