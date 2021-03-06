import { FieldAST, ObjectMap } from './types'
import flattenObject from './flattenObject'
import isFieldAST from './isFieldAST'
import { parse } from '../FieldParser'

/**
 * Scans each property of an object, finds all the strings that contain
 * one or more variables and returns a map of FieldASTs with the key
 * representing the path of the string in the original object
 *
 * @param {ObjectMap<any>} obj
 * @returns {ObjectMap<FieldAST>}
 */
export default function extractFieldASTs(
  obj: ObjectMap<any>
): ObjectMap<FieldAST> {
  const flattened = flattenObject(obj)
  let fieldASTs = {}
  for ( let path in flattened ) {
    if (typeof flattened[path] === 'string') {
      const ast = parse(flattened[path], {})
      if (isFieldAST(ast)) {
        fieldASTs[path] = ast
      }
    }
  }
  return fieldASTs
}
