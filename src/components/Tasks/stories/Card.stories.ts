import { Meta, Story } from "@storybook/vue3"
import { jest, expect } from "@storybook/jest"
import { action } from "@storybook/addon-actions"
import TaskCard from '../Card.vue'
import { stubTask } from "../../../api/__tests__/stubs"

import { faker } from '@faker-js/faker'

import { within, userEvent, waitFor } from "@storybook/testing-library"

import { Task } from "../../../types/models"

const onDeleteEmit = jest.fn()
const onCompleteEmit = jest.fn()

export default {
  title: 'TaskCard',
  component: TaskCard,
} as Meta

const Template = (args: { task: Task }) => ({
  components: { TaskCard },
  setup() {
    return {
      args,
      onDelete: (event: any) => {
        onDeleteEmit()
        action('onDelete').call({}, event)
      },
      onComplete: (event: any) => {
        onCompleteEmit()
        action('onComplete').call({}, event)
      },
    }
  },
  template: '<TaskCard @onComplete="onComplete" @onDelete="onDelete" v-bind="args" />',
})

export const RegularTask: Story<{ task: Task }> = Template.bind({})
RegularTask.args = {
  task: stubTask({
    completed_at: null,
  })
}
RegularTask.play = async ({ args, canvasElement }) => {
  onDeleteEmit.mockClear()
  onCompleteEmit.mockClear()

  const canvas = within(canvasElement)

  userEvent.click(canvas.getByTestId('btn-delete'))
  expect(onDeleteEmit).toHaveBeenCalled()

  userEvent.click(canvas.getByTestId('btn-complete'))
  expect(onCompleteEmit).toHaveBeenCalled()
}

export const CompletedTask: Story<{ task: Task }> = Template.bind({})
CompletedTask.args = {
  task: stubTask({
    completed_at: faker.date.recent(2),
  })
}
CompletedTask.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  expect(canvas.queryByTestId('btn-delete')).toBeNull()
  expect(canvas.queryByTestId('btn-complete')).toBeNull()
}
