# HNBRA - Hospital Naval de Brasília

## Guia de Desenvolvimento de Sistema Digital

>   Este projeto é desenvolvido em conformidade ao `Boletim Técnico DCTIMBOTEC 30/002/2023`

### Guia de Estilo para Documentar em Markdown

<details>
    <summary> Estruturas Recorrentes</summary>

<br/>

>   *   Este guia serve como referência para futuras alterações neste documento. <br/>
>   *   Utilize os exemplos das estruturas recorrentes <br/>

#####   Navegação

*   Navegação interna: realizada por links apontando para os títulos

```md
[nome_do_link](#titulo_para_linkar)
```

#####   Tabelas

*   Alinhamento

>:--    = alinhamento a esquerda <br/>
:--:    = alinhamneto centralizado<br/>
--:     = alinhamento a direita<br/>

#####   Alinhamentos

| esquerda | meio | direita |
|:---|:---:|---:|
| estou_na_esquerda | estou_no_meio | estou_na_direita |
| estou_na_esquerda | estou_no_meio | estou_na_direita |

#####   Níveis de Citação

> citação n1
>> citação n2
> >> citação n3

#####   Sumários

```md
<details>
    <summary>Sumario</summary>
</details>
```

</details>

</details>

### Guia de Configuração do Ambiente de Desenvolvimento

<details>
    <summary>ATENÇÃO!</summary>

<br>

>   Consultar o `Boletim Técnico DCTIMBOTEC 30/002/2023`:  para acessar a tabela completa com todas as tecnologias e ferramentas disponíveis<br/>

> As tabelas a seguir orientam quais tecnologias e ferramentas adotadas no desenvolvimento deste projeto.

> Tabela 1: ferramentas de uso obrigatório<br/>
> Tabela 2: ferramentas de uso opcional<br/>
> Tabela 3: Frameworks recomendados

</details>

###   Ferramentas e frameworks<br/>

<details>
    <summary>WINDOWS</summary>

##### Tabela 1 - Tecnologias e Ferramentas de Uso Obrigatório

| Escopo            | Tecnologia     | Versão | Repositório
|   :---            |   :---         |  :---            |   :---
|   Linguagem       |   Javascript   |  ECMA-262 v15    |   [ecma-international](https://ecma-international.org/publications-and-standards/standards/ecma-262/)
|   Banco de Dados  |   SQL          | PostgreSQL 17 RC1| [postgresql](https://www.postgresql.org/)
|   IDE             |   VSCode       | v1.93            | [VSCode](https://code.visualstudio.com/Download)
|   Versionamento   |   Git          | v2.46.0          | [Git](https://git-scm.com/download/win)
| Containerização   |   Docker       | v2.46.0          | [Dorker](https://docs.docker.com/desktop/install/windows-install/)
| Containerização   |   WSL          | v2.2.4.0         |[WSL](https://learn.microsoft.com/pt-br/windows/wsl/install)
| Orquestração      | Kubernetes     | v1.31            | [Kubernetes](https://kubernetes.io/pt-br/)
| Framework         | Nextjs         | v14              | [Nextjs](https://kubernetes.io/pt-br/)

<br>

<details><summary>Observações</summary>

* Instalar WSL
    > powershell: `wsl --install`
</details>


##### Tabela 2 - Tecnologias e Ferramentas Opcionais

|   Escopo                  |   Tecnologia  |   Versão  |   Repositório
|   ---                     |   ---         |   ---     |   ---
|   Modelagem de Requisitos |   ?           |   ?       |   ?
|   Gerência de Projeto     |   Bitrix      |   ?       |   ?
|   Modelagem de Processos  |   Bizagi      |   ?       |   ?
|   Prototipação            |   Figma       |   ?       |   ?
|   Integração Continua     |   Github      |   ?       |   ?
|   Qualidade e Segurança   |   SonarQube   |   ?       |   ?
|   Testes Unitarios        |   JUnit       |   ?       |   ?
|   Testes Automatizados    |   Selenium    |   ?       |   ?
|   Testes de Desempenho    |   ApacheJMeter|   ?       |   ?
|   Observabilidade         |   Swagger     |   ?       |   ?         

##### Tabela 3 - Frameworks e Bibliotecas

|   Escopo      |   Tecnologia  |   Versão      |   Repositório
|   ---         |   ---         |   ---         |   ---
|   Runtime     |   NodeJS      |   v 20.17.0   |   [Node](https://nodejs.org/pt/download/prebuilt-installer)
|   Front-End   |   NextJS      |   v14.2       |   [NextJS](https://nextjs.org/docs/getting-started/installation)
|   Back-End    |   NextJS      |   v14.2       |   [Node](https://nodejs.org/pt/download/prebuilt-installer)
| BD            |   PostgreSQL  |   v16     |   [PostgreSQL](https://www.postgresql.org/docs/)