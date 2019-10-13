module.exports = {
  name: 'client-connection',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/client-connection',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
