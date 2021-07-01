import { SagaIterator } from 'redux-saga'
import { call } from 'redux-saga/effects'
import { isEmpty } from 'lodash/fp'

// ---------------------------------------------------------------------------

export type StandardAction = {
  type: string

  error?: boolean
  payload?: any
  meta?: Record<string, unknown>
}

export type DeferredAction = {
  type: string
  meta: Record<string, unknown> & {
    deferred: {
      failure: (...args: any[]) => void
      success: (...args: any[]) => void
    }
  }

  error?: boolean
  payload?: any
}

type StdOut = { stdout: (...args: string[]) => void }
type Saga<T, A> = (io: T, action: A) => SagaIterator

export function isNotEmpty<T> (value: T): value is NonNullable<T> {
  return !isEmpty(value)
}

// ---------------------------------------------------------------------------

export function standardAction<T extends StdOut, A> (saga: Saga<T, A>, io: T) {
  return function* withCatch (action: A & StandardAction) {
    const { stdout } = io

    try {
      yield call(saga, io, action)
    } catch (err) {
      yield call(stdout, `${saga.name}`, err)
    }
  }
}

export function deferredAction<T extends StdOut, A> (saga: Saga<T, A>, io: T) {
  return function* withCatch (action: A & DeferredAction) {
    const { stdout } = io
    const { meta: { deferred, ...restMeta }, ...rest } = action

    let payload = { ...rest }
    if (isNotEmpty(restMeta)) {
      payload = {
        ...rest,
        meta: restMeta
      }
    }

    try {
      // const result = yield call(saga, io, payload as A)
      //
      // yield call(deferred.success, result)
    } catch (err) {
      yield call(stdout, `${saga.name}`, err)
      yield call(deferred.failure, err)
    }
  }
}
