const getCleanString = (serverless) => {
  let stage = (serverless.config.serverless.processedInput.options.stage) ? serverless.config.serverless.processedInput.options.stage : 'dev'

  serverless.cli.consoleLog(stage)
  serverless.cli.consoleLog(stage.replace(/[^\w+]/gim, ''))

  if (stage.length > 7) {
    serverless.cli.consoleLog(`Stage length is ${stage.length}`)
    throw new Error('Stage length is bigger 7')
  }
  return stage.replace(/[^\w+]/gim, '')
}

module.exports = {getCleanString}
