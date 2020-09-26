const { ssr } = require('@sveltech/ssr')
const { script, template } = require('./bundle.json')

exports.handler = async (event) => {
    const body = await ssr(template, script, event.path)
    return { statusCode: 200, body: body + '\n<!--ssr rendered-->' }
}