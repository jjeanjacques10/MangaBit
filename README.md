# Modelo em branco para qualquer projeto web utilizando node e Typescript

## Atalhos para acessar models, controller.
@controllers
@models

### Para adiciona outros atalhos acesse tsconfig.json e enontre paths:[]

#### Assim que passar os paths tem que ir no arquivo babel.config "alias" e passar os mesmos paths manualmente

  alias: {
          '@tools': './src/tools',
          '@models': './src/models',
          '@controllers': './src/controllers'
        }
