import { Meta } from "@storybook/vue3"
import { jest, expect } from "@storybook/jest"
import { action } from "@storybook/addon-actions"
import TaskCard from '../Card.vue'
import { stubTask } from "../../../api/__tests__/stubs"

import { within, userEvent, waitFor } from "@storybook/testing-library"

import { Task } from "../../../types/models"

const onDeleteEmit = jest.fn()

export default {
  title: 'TaskCard',
  component: TaskCard,
} as Meta

const Template = (args: { task: Task }) => ({
  components: { TaskCard },
  setup() {
    return {
      args,
      onDelete: (args: any) => {
        onDeleteEmit()
        action('onDelete').call({}, args)
      }
    }
  },
  template: '<TaskCard @onDelete="onDelete" v-bind="args" />',
})

export const SimpleTask = Template.bind({})
// @ts-ignore
SimpleTask.args = {
  task: stubTask()
}

export const SimpleTaskDelete = Template.bind({})
// @ts-ignore
SimpleTaskDelete.args = {
  task: stubTask()
}
// @ts-ignore
SimpleTaskDelete.play = async ({ args, canvasElement }) => {
  onDeleteEmit.mockClear()

  const canvas = within(canvasElement)

  await userEvent.click(canvas.getByRole('button'))
  expect(onDeleteEmit).toHaveBeenCalled()
}