import { registerConsul } from './consul'

const serviceName = 'mail-sender'

export const bootstrap = (port: number) => {
  const consul = registerConsul(serviceName, port)

  return {
    consul,
  }
}
