import { registerConsul } from './consul'
import { registerTracing } from './tracing'

const serviceName = 'profile-bff'

export const bootstrap = (port: number) => {
  const consul = registerConsul(serviceName, port)
  registerTracing(serviceName)

  return {
    consul,
  }
}
