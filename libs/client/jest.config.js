module.exports = {
  name: 'client',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/client',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
