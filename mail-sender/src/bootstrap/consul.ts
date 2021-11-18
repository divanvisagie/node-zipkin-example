import Consul from 'consul'

var ip = require('ip')

export const registerConsul = (serviceName: string, port: number) => {
  const thisIp = ip.address()
  console.log(thisIp)

  const consul = new Consul({
    host: 'localhost',
    port: '8500',
    promisify: true,
  })
  const opts: Consul.Agent.Service.RegisterOptions = {
    name: serviceName,
    address: thisIp,
    port: port,
    check: {
      http: `http://${thisIp}:${port}/health`,
      interval: '10s',
    },
  }
  consul.agent.service.register(opts, (err, result) => {
    if (err) return console.error(err)
    console.log(result)
  })

  return consul
}
