module.exports = {
  name: 'example-app',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/example-app',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
