# Guard 📦

> Very simple Auth Guard for NodeJS

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/SecJS/Guard?style=for-the-badge&logo=appveyor">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/SecJS/Guard?style=for-the-badge&logo=appveyor">

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen?style=for-the-badge&logo=appveyor">
</p>

The intention behind this repository is to always maintain a viable and simple Guard to use in any type of `NodeJS Framework`

<img src=".github/guard.png" width="200px" align="right" hspace="30px" vspace="100px">

## Installation

You can install the Response using;

```bash
yarn add @SecJS/Guard
```

## Usage

> You can call the Guard class to create a new guard instance and use in middlewares

```js
import Guard from '@SecJS/Guard'

export class GuardMiddleware {
  async handle(request: any, response: any, next: any): Promise<void> {
    const token = request.header('authorization', null)

    if (!token) {
      // some unauthorized exception
      throw new Error
    }

    const guard = new Guard()
    await guard.parse(token)

    if (!guard.check()) {
      // some unauthorized exception
      throw new Error
    }

    request.guard = guard
    await next()
  }
}

```

> You can find all definitions and methods calling the ```IGuard Interface```.

```js
import { IGuard } from '@SecJS/Guard'

// It will have this format
interface IGuard {
  parse(token: string): Promise<void>
  isUser(): boolean
  isAdmin(): boolean
  getRoles(): RoleEnum[]
  hasRole(role: RoleEnum): boolean
  check(): boolean
}
```
