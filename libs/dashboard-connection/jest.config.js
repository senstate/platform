module.exports = {
  name: 'dashboard-connection',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/libs/dashboard-connection',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
