module.exports = {
  name: 'senstate',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/senstate',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
