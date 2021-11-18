import { registerConsul } from './consul'
import { registerTracing } from './tracing'

const serviceName = 'mail-sender'

export const bootstrap = (port: number) => {
  const consul = registerConsul(serviceName, port)
  registerTracing(serviceName)

  return {
    consul,
  }
}
