# Guia de Deploy - RH Network SPFx Web Part

## Pré-requisitos

1. Node.js 20.19.3 (ou compatible)
2. SharePoint Framework (SPFx) CLI tools
3. Acesso administrativo ao tenant SharePoint
4. Visual Studio Code (recomendado)

## Processo de Deploy

### 1. Preparação do Ambiente

```bash
# Instalar dependências
npm install

# Verificar se tudo está funcionando
npx gulp serve
```

### 2. Build de Produção

```bash
# Limpar artifacts anteriores
npx gulp clean

# Build para produção
npx gulp build --release

# Criar pacote SharePoint (.sppkg)
npx gulp bundle --release
npx gulp package-solution --release
```

### 3. Deploy no SharePoint

#### 3.1 Upload do Pacote
1. Navegue para `sharepoint/solution/` 
2. Localize o arquivo `rh-network-spfx.sppkg`
3. Acesse o SharePoint Admin Center
4. Vá para **More features** > **Apps** > **Open**
5. Clique em **App Catalog** (ou crie um se não existir)
6. Faça upload do arquivo `.sppkg`
7. Clique em **Deploy**

#### 3.2 Adicionando à Página
1. Acesse o site SharePoint onde deseja usar o web part
2. Edite uma página ou crie uma nova
3. Clique em **+** para adicionar web part
4. Procure por "RH Network" na seção **Custom**
5. Adicione o web part à página
6. Salve e publique a página

### 4. Configuração

#### 4.1 Dados de Exemplo
O web part já vem com dados de exemplo para demonstração:
- Pessoas: Ana Silva, Carlos Santos, Maria Oliveira, etc.
- Projetos: Transformação Digital, Inovação Sustentável, etc.
- Relacionamentos pré-configurados

#### 4.2 Integração com Dados Reais
Para conectar com dados reais do SharePoint:

1. **Criar Listas SharePoint:**
   - Lista "Pessoas" com colunas: Nome, Cargo, Departamento, Avatar
   - Lista "Projetos" com colunas: Nome, Descrição, Status, Líder
   - Lista "Relacionamentos" com colunas: PessoaId, ProjetoId, Tipo

2. **Modificar o código** (opcional):
   - Editar `src/components/RhNetworkApp.tsx`
   - Substituir dados mock por chamadas à SharePoint REST API
   - Usar PnP JS para facilitar as chamadas

### 5. Personalização

#### 5.1 Visual
- Edite os estilos em `src/components/` 
- Modifique cores e layout conforme identidade visual
- Adapte ícones do Fluent UI

#### 5.2 Funcionalidades
- Adicione filtros avançados
- Implemente busca por texto
- Adicione exportação de dados
- Integre com Microsoft Graph para dados do Azure AD

### 6. Troubleshooting

#### Problemas Comuns:

**Web part não aparece:**
- Verifique se o pacote foi deployado corretamente
- Confirme que o tenant permite web parts customizados

**Erro de carregamento:**
- Verifique console do navegador (F12)
- Confirme compatibilidade de versões SPFx

**Performance lenta:**
- Otimize consultas de dados
- Implemente paginação
- Use cache local quando apropriado

### 7. Atualizações

Para atualizar o web part:

1. Modifique o código conforme necessário
2. Incremente a versão em `package.json`
3. Execute o processo de build e deploy novamente
4. O SharePoint detectará automaticamente a nova versão

### 8. Monitoramento

- Use Developer Tools do navegador para debug
- Monitore logs do SharePoint
- Implemente telemetria customizada se necessário

## Recursos Úteis

- [SharePoint Framework Documentation](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/)
- [Fluent UI React Components](https://developer.microsoft.com/en-us/fluentui)
- [PnP JS Documentation](https://pnp.github.io/pnpjs/)

## Suporte

Para problemas técnicos:
1. Verifique os logs de erro
2. Consulte a documentação oficial
3. Entre em contato com a equipe de desenvolvimento

---

**Versão:** 0.0.1  
**Última atualização:** $(date)  
**Desenvolvido com:** SharePoint Framework 1.20.0