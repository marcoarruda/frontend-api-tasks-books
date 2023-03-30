import { Meta, Story } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import { expect, jest } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { createMock } from 'storybook-addon-module-mock';

import apiTasks from '../../../api/tasks'

import CreateForm from '../Create.vue';
import { ApiGenericError, ApiResponse } from '../../../types/api';
import { TaskCreateForm } from '../../../types/forms';
import { Task } from '../../../types/models';

import { stubApiResponse, stubTask, stubTaskFormFailure } from '../../../api/__tests__/stubs';
import { flushPromises } from '@vue/test-utils';

export default {
  title: 'CreateForm',
  component: CreateForm,
  argTypes: {
    onCreate: { action: true },
  }
} as Meta;

const Template: Story = (args) => ({
  components: { CreateForm },
  setup() {
    return {
      onCreate: action('onCreate',)
    }
  },
  template: '<CreateForm @onCreate="onCreate" />'
})

export const SubmitSuccess = Template.bind({})
SubmitSuccess.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const stubSuccessResponse = stubApiResponse<Task, TaskCreateForm>(true, stubTask(), null)
  const mock = createMock(apiTasks, 'createTask')
  mock.mockResolvedValue(stubSuccessResponse)

  const taskTitulo = 'Wash the dishes'

  await userEvent.type(canvas.getByTestId('titulo'), taskTitulo, { delay: 50 });

  userEvent.click(canvas.getByRole('button'));
  expect(mock).toHaveBeenCalledWith({ titulo: taskTitulo })

  await flushPromises()
  await expect((canvas.getByTestId('titulo') as HTMLInputElement).value).toBe('')
}

export const SubmitFormError = Template.bind({})
SubmitFormError.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const stubFailureResponse = stubApiResponse<Task, TaskCreateForm>(false, stubTaskFormFailure(), null)
  const mock = createMock(apiTasks, 'createTask')
  mock.mockResolvedValue(stubFailureResponse)

  const taskTitulo = 'Wat'

  await userEvent.type(canvas.getByTestId('titulo'), taskTitulo, { delay: 50 });
  await userEvent.click(canvas.getByRole('button'));

  expect(mock).toHaveBeenCalledWith({ titulo: taskTitulo })
  expect((canvas.getByTestId('titulo') as HTMLInputElement).value).toBe(taskTitulo)
}

export const SubmitApiError = Template.bind({})
SubmitApiError.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const stubFailureApi = stubApiResponse<Task, TaskCreateForm>(false, null, 'Something went wrong')
  const mock = createMock(apiTasks, 'createTask')
  mock.mockResolvedValue(stubFailureApi)

  const taskTitulo = 'Err'

  await userEvent.type(canvas.getByTestId('titulo'), taskTitulo, { delay: 50 });
  await userEvent.click(canvas.getByRole('button'));

  expect(mock).toHaveBeenCalledWith({ titulo: taskTitulo })
  expect((canvas.getByTestId('titulo') as HTMLInputElement).value).toBe(taskTitulo)
}
