/**
 * Contract source: https://git.io/JBt3I
 *
 * Feel free to let us know via PR, if you find something broken in this contract
 * file.
 */

import type { InferDisksFromConfig } from '@adonisjs/core/build/config'
import type driveConfig from '../config/drive'

declare module '@ioc:Adonis/Core/Drive' {
  interface DisksList extends InferDisksFromConfig<typeof driveConfig> {
    r2: {
      config: R2DriverConfig // <-- Make sure to use the `R2DriverConfig` interface
      implementation: R2DriverContract // <-- Make sure to use the `R2DriverContract` interface
    }
  }
}
