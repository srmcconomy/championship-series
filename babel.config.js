module.exports = {
  node: {
    presets: [
      ['env', {
        targets: { node: true },
      }],
      'react'
    ],
    plugins: ['dynamic-import-node', 'transform-class-properties'],
  },
  clientDev: {
    presets: [
      ['env', {
        targets: { browsers: '> 5%' },
        modules: false,
      }],
      'react'
    ],
    plugins: ['syntax-dynamic-import', 'transform-class-properties'],
  },
  clientProd: {
    presets: [
      ['env', {
        targets: { browsers: '> 5%' },
        modules: false,
      }],
      'react',
      'minify',
    ],
    plugins: ['syntax-dynamic-import', 'transform-class-properties'],
  },
};
