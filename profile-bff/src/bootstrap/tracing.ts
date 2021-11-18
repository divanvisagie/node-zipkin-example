import * as opentelemetry from '@opentelemetry/sdk-node'
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin'
import { Resource } from '@opentelemetry/resources'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import { SemanticResourceAttributes as ResourceAttributesSC } from '@opentelemetry/semantic-conventions'
import process from 'process'

export const registerTracing = (serviceName: string) => {
  const zipkinExporter = new ZipkinExporter()

  const sdk = new opentelemetry.NodeSDK({
    traceExporter: zipkinExporter,
    instrumentations: [getNodeAutoInstrumentations() as any],
    resource: new Resource({
      [ResourceAttributesSC.SERVICE_NAME]: serviceName,
    }),
  })

  sdk.start().then(() => {
    console.log('sdk started')
  })

  process.on('SIGTERM', () => {
    sdk
      .shutdown()
      .then(
        () => console.log('SDK shut down successfully'),
        (err) => console.log('Error shutting down SDK', err)
      )
      .finally(() => process.exit(0))
  })
}
