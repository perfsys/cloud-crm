const getCleanString = (serverless) => {
  let stage = (serverless.config.serverless.processedInput.options.stage) ? serverless.config.serverless.processedInput.options.stage : 'dev'

  serverless.cli.consoleLog(stage)
  serverless.cli.consoleLog(stage.replace(/[^\w+]/gim, ''))

  let newName = stage.replace(/[^\w+]/gim, '')

  if(newName.length > 7){
    serverless.cli.consoleLog(`Stage length is ${newName.length}`)
    throw new Error('Stage length is bigger 7')
  }
  return newName
}

module.exports = {getCleanString}
