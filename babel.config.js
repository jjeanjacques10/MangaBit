module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@tools': './src/tools',
          '@models': './src/models',
          '@controllers': './src/controllers',
          '@inters': './src/interfaces'
          
        }
      }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }