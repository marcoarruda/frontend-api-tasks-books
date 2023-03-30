import { Meta, Story } from '@storybook/vue3';
import { action } from '@storybook/addon-actions';
import { expect, jest } from '@storybook/jest';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { createMock, getMock } from 'storybook-addon-module-mock';

import apiTasks from '../../../api/tasks'

import CreateForm from '../Create.vue';
import { ApiGenericError, ApiResponse } from '../../../types/api';
import { TaskCreateForm } from '../../../types/forms';
import { Task } from '../../../types/models';

import { stubApiResponse, stubTask, stubTaskFormFailure } from '../../../api/__tests__/stubs';

export default {
  title: 'CreateForm',
  component: CreateForm,
  argTypes: {
    onCreate: { action: true },
  }
} as Meta;

const Template: Story = (args,) => ({
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
  createMock(apiTasks, 'createTask').mockResolvedValue(stubSuccessResponse)

  await userEvent.type(canvas.getByTestId('titulo'), 'Wash the dishes', { delay: 50 });
  await userEvent.click(canvas.getByRole('button'));
}

export const SubmitFormError = Template.bind({})
SubmitFormError.play = async ({ args, canvasElement, parameters }) => {
  const canvas = within(canvasElement)

  const stubFailureResponse = stubApiResponse<Task, TaskCreateForm>(false, stubTaskFormFailure(), null)
  createMock(apiTasks, 'createTask').mockResolvedValue(stubFailureResponse)

  await userEvent.type(canvas.getByTestId('titulo'), 'Wat', { delay: 50 });
  await userEvent.click(canvas.getByRole('button'));

//   const mock = getMock(parameters, apiTasks, 'createTask')
//   await expect(mock).toHaveBeenCalled()
}

export const SubmitApiError = Template.bind({})
SubmitApiError.play = async ({ args, canvasElement }) => {
  const canvas = within(canvasElement)

  const stubFailureApi = stubApiResponse<Task, TaskCreateForm>(false, null, 'Something went wrong')
  createMock(apiTasks, 'createTask').mockResolvedValue(stubFailureApi)

  await userEvent.type(canvas.getByTestId('titulo'), 'Wat', { delay: 50 });
  await userEvent.click(canvas.getByRole('button'));
}
