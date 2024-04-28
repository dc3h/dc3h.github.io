/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';

import { InjectedReducersType } from 'utils/types/injector-typings';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers, so returning identity function to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return state => state;
  } else {
    const validInjectedReducers = Object.keys(injectedReducers).reduce((acc, current) => {
      const currentValue = injectedReducers[current];
      if (currentValue !== undefined) {
        return { ...acc, [current]: currentValue }
      } else {
        return acc;
      }
    }, {});
  
    return combineReducers({
      ...validInjectedReducers,
    });
  }
}
