export const stringifyObj = <T = Record<string, unknown>>(obj: T): Record<string, string> => {
    const newObj = Object.create(null)
  
    for (const [key, value] of Object.entries(obj)) {
      newObj[key] = typeof value === 'string' ? value : JSON.stringify(value)
    }
  
    return newObj
  }
  
  export const parseObj = (obj: Record<string, string>) => {
    const newObj = Object.create(null)
  
    for (const [key, value] of Object.entries(obj)) {
      try {
        newObj[key] = JSON.parse(value)
      } catch (e) {
        newObj[key] = value
      }
    }
  
    return newObj
  }
  