/**
 * Contract source: https://git.io/JvyKD
 *
 * Feel free to let us know via PR, if you find something broken in this
 * file.
 */

import { Application } from 'App/Models'

declare module '@ioc:Adonis/Addons/Auth' {
  /*
  |--------------------------------------------------------------------------
  | Providers
  |--------------------------------------------------------------------------
  |
  | The providers are used to fetch applications. The Auth module comes pre-bundled
  | with two providers that are `Lucid` and `Database`. Both uses database
  | to fetch application details.
  |
  | You can also create and register your own custom providers.
  |
  */
  interface ProvidersList {
    /*
    |--------------------------------------------------------------------------
    | Application Provider
    |--------------------------------------------------------------------------
    |
    | The following provider uses Lucid models as a driver for fetching application
    | details from the database for authentication.
    |
    | You can create multiple providers using the same underlying driver with
    | different Lucid models.
    |
    */
    application: {
      implementation: LucidProviderContract<typeof Application>
      config: LucidProviderConfig<typeof Application>
    }
  }

  /*
  |--------------------------------------------------------------------------
  | Guards
  |--------------------------------------------------------------------------
  |
  | The guards are used for authenticating applications using different drivers.
  | The auth module comes with 4 different guards.
  |
  | - SessionGuardContract
  | - BasicAuthGuardContract
  | - JwtGuardContract
  | - OATGuardContract ( Opaque access token )
  |
  | Every guard needs a provider for looking up applications from the database.
  |
  */
  interface GuardsList {
    api: {
      implementation: OATGuardContract<'application', 'api'>
      config: OATGuardConfig<'application'>
    }
  }
}
