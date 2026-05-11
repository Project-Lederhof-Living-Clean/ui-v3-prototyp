import { TakeAction } from '../sections/take-action'
import type { TakeActionProps } from '../sections/take-action/types'
import sampleData from '../sections/take-action/sample-data.json'

const data = sampleData as unknown as TakeActionProps

export function TakeActionPage() {
  return <TakeAction intro={data.intro} suggestions={data.suggestions} />
}
