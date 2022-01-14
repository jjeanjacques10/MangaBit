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
          "@intersScrap":"./src/scrap/interfaces",
          "@intersDB":"./src/Database/interfaces",
          "@servicesDB":"./src/Database/services"
          
        }
      }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }