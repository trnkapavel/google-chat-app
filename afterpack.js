const { execSync } = require('child_process')

exports.default = async function (context) {
  const appPath = `${context.appOutDir}/Google Chat.app`
  execSync(`codesign --sign - --force --deep "${appPath}"`)
}
