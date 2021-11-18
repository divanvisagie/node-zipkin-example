import { registerConsul } from './consul'

const serviceName = 'profile-bff'

export const bootstrap = (port: number) => {
  const consul = registerConsul(serviceName, port)

  return {
    consul,
  }
}
