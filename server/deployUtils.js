const getCleanString = (serverless) => {
  let stage = (serverless.config.serverless.processedInput.options.stage) ? serverless.config.serverless.processedInput.options.stage : 'dev'

  serverless.cli.consoleLog(stage)
  serverless.cli.consoleLog(stage.replace(/[^\w+]/gim, ''))

  return stage.replace(/[^\w+]/gim, '')
}

module.exports = {getCleanString}
