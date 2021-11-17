import * as opentelemetry from '@opentelemetry/sdk-node'
import { JaegerExporter } from '@opentelemetry/exporter-jaeger'
import { ZipkinExporter } from '@opentelemetry/exporter-zipkin'
import { Resource } from '@opentelemetry/resources'
// import { PrometheusExporter } from '@opentelemetry/exporter-prometheus'
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node'
import {
  SemanticAttributes,
  SemanticResourceAttributes as ResourceAttributesSC,
} from '@opentelemetry/semantic-conventions'

// const jaegerExporter = new JaegerExporter()
const zipkinExporter = new ZipkinExporter()
// const prometheusExporter = new PrometheusExporter({ startServer: true })

const sdk = new opentelemetry.NodeSDK({
  // Optional - if omitted, the tracing SDK will not be initialized
  traceExporter: zipkinExporter,
  // Optional - If omitted, the metrics SDK will not be initialized
  // metricExporter: prometheusExporter,
  // Optional - you can use the metapackage or load each instrumentation individually
  instrumentations: [getNodeAutoInstrumentations() as any],
  resource: new Resource({
    [ResourceAttributesSC.SERVICE_NAME]: 'profile-bff',
  }),
  // See the Configuration section below for additional  configuration options
})

// You can optionally detect resources asynchronously from the environment.
// Detected resources are merged with the resources provided in the SDK configuration.
sdk.start().then(() => {
  // Resources have been detected and SDK is started
  console.log('sdk started')
})

// You can also use the shutdown method to gracefully shut down the SDK before process shutdown
// or on some operating system signal.
import process from 'process'
process.on('SIGTERM', () => {
  sdk
    .shutdown()
    .then(
      () => console.log('SDK shut down successfully'),
      (err) => console.log('Error shutting down SDK', err)
    )
    .finally(() => process.exit(0))
})
