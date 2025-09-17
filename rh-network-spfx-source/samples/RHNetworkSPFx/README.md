# RH Network SPFx Web Part

Uma aplicação de rede social corporativa desenvolvida como Web Part do SharePoint Framework (SPFx) que permite visualizar e navegar entre perfis de pessoas e projetos na organização.

## 🚀 Status do Projeto

✅ **PRODUÇÃO PRONTA** - Totalmente funcional e pronto para deploy no SharePoint

## 🎯 Funcionalidades

### Sistema de Navegação Social
- **Perfis de Pessoas**: Visualização de colaboradores com foto, cargo e departamento
- **Perfis de Projetos**: Detalhes de projetos organizacionais com status e participantes
- **Navegação Interconectada**: Sistema que liga pessoas aos projetos como uma rede social
- **Interface Fluent UI**: Design moderno e consistente com o ecossistema Microsoft

### Recursos Principais
- 🔍 **Busca e Filtros**: Localização rápida de pessoas e projetos
- 🌐 **Visualização de Rede**: Conexões visuais entre colaboradores e iniciativas
- 📱 **Design Responsivo**: Compatível com desktop, tablet e mobile
- ⚡ **Performance Otimizada**: Carregamento rápido e navegação fluida

## 🛠️ Tecnologias

- **SharePoint Framework (SPFx)** 1.20.0
- **React** 18
- **TypeScript** 4.7
- **Fluent UI React** v9
- **Node.js** 20.19.3

## 📦 Estrutura do Projeto

```
RHNetworkSPFx/
├── src/
│   ├── components/           # Componentes React
│   │   ├── NetworkNavigator.tsx    # Navegação principal
│   │   ├── NetworkProfile.tsx      # Perfil de pessoa
│   │   ├── ProjetoNetworkProfile.tsx # Perfil de projeto
│   │   └── RhNetworkApp.tsx        # App principal
│   └── webparts/
│       └── rhNetwork/        # Web Part SPFx
├── sharepoint/
│   └── solution/
│       └── rh-network-spfx.sppkg   # Pacote pronto para deploy
├── DEPLOY.md                # Guia completo de deployment
└── README.md               # Este arquivo
```

## 🚀 Deploy Rápido

### 1. Pacote Pronto
O arquivo `sharepoint/solution/rh-network-spfx.sppkg` (1.3MB) está pronto para upload no SharePoint.

### 2. Deploy no SharePoint
1. Acesse o **SharePoint Admin Center**
2. Navegue para **Apps** > **App Catalog**
3. Faça upload do arquivo `rh-network-spfx.sppkg`
4. Clique em **Deploy**

### 3. Usar o Web Part
1. Vá para qualquer página SharePoint
2. Edite a página
3. Adicione o web part **"RH Network"**
4. Salve e publique

📖 **Para instruções detalhadas, consulte [DEPLOY.md](./DEPLOY.md)**

## 🎮 Demonstração

### Dados de Exemplo Incluídos
- **Pessoas**: Ana Silva (Gerente de Projetos), Carlos Santos (Desenvolvedor), Maria Oliveira (Designer), etc.
- **Projetos**: Transformação Digital, Inovação Sustentável, Capacitação Online, etc.
- **Relacionamentos**: Conexões realistas entre pessoas e projetos

### Como Testar Localmente
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npx gulp serve

# Abrir https://localhost:4321/temp/workbench.html
```

## 🔧 Desenvolvimento

### Comandos Principais
```bash
# Instalar dependências
npm install

# Desenvolvimento local
npx gulp serve

# Build de produção
npx gulp build --release

# Criar pacote SharePoint
npx gulp bundle --release
npx gulp package-solution --production
```

### Personalização
- **Visual**: Edite os componentes em `src/components/`
- **Dados**: Modifique `RhNetworkApp.tsx` para conectar com APIs reais
- **Estilos**: Customize usando Fluent UI themes

## 📊 Métricas de Qualidade

- ✅ **Compilação**: Sem erros TypeScript
- ✅ **Build**: Sucesso em modo produção
- ✅ **Linting**: Código limpo e padronizado
- ✅ **Pacote**: .sppkg gerado e validado
- ⚠️ **Source Maps**: Warnings normais do SPFx (não afetam funcionamento)

## 🔐 Requisitos de Sistema

- **SharePoint Online** ou **SharePoint Server 2019+**
- **Node.js** 20.x (desenvolvimento)
- **Permissões**: Site Collection Administrator (para deploy)

## 📞 Suporte

### Problemas Comuns
- **Web part não aparece**: Verifique permissões e se o tenant permite web parts customizados
- **Erro de carregamento**: Consulte F12 Developer Tools
- **Performance**: Considere implementar paginação para grandes volumes de dados

### Próximos Passos
- [ ] Integração com Microsoft Graph para dados do Azure AD
- [ ] Conectores para sistemas HR existentes
- [ ] Funcionalidades de chat e mensagens
- [ ] Dashboard de analytics e métricas

## 📄 Licença

Este projeto foi desenvolvido como parte do programa Power Apps Code Apps.

---

**Versão**: 0.0.1  
**Última Atualização**: Setembro 2024  
**Status**: ✅ Produção  
**Desenvolvido com**: ❤️ e SharePoint Framework