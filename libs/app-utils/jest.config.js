module.exports = {
  name: 'app-utils',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/app-utils',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
