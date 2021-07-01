import { call } from 'typed-redux-saga/macro'
import { isEmpty } from 'lodash'

// ---------------------------------------------------------------------------

export type StandardAction = {
  error?: boolean
  meta?: Record<string, unknown>
  payload?: any
  type: string
}

export type DeferredAction = {
  error?: boolean
  payload?: any
  type: string
  meta: Record<string, unknown> & {
    deferred: {
      failure: (...args: any[]) => void
      success: (...args: any[]) => void
    }
  }
}

type StdOut = { stdout: (...args: string[]) => void }

// ---------------------------------------------------------------------------

export function standardAction<
IO extends StdOut,
Action extends StandardAction,
Saga extends (io: IO, action: Action) => any
> (
  fn: Saga,
  io: IO
) {
  return function* withCatch (action: Action) {
    const { stdout } = io

    try {
      yield* call<Saga>(fn, io, action)
    } catch (err) {
      yield* call(stdout, `${fn.name}`, err)
    }
  }
}

export function deferredAction<
IO extends StdOut,
Action extends DeferredAction,
Saga extends (io: IO, action: Action) => any,
> (
  fn: Saga,
  io: IO
) {
  return function* withCatch (action: Action) {
    const { stdout } = io
    const { meta: { deferred, ...restMeta }, ...rest } = action

    let restAction = { ...rest }

    if (isNotEmpty(restMeta)) {
      restAction = {
        ...rest, meta: restMeta }
    }

    try {
      const result = yield* call<Saga>(
        fn,
        io,
        restAction as Action
      )

      yield* call(deferred.success, result)
    } catch (err) {
      yield* call(stdout, `${fn.name}`, err)
      yield* call(deferred.failure, err)
    }
  }
}

function isNotEmpty<T> (value: T): value is NonNullable<T> {
  return !isEmpty(value)
}
