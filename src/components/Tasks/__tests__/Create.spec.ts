import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CreateTaskForm from '../Create.vue'
import apiTasks from '../../../api/tasks'
import { Task } from '../../../types/models'
import { stubApiResponse, stubTask } from '../../../api/__tests__/stubs'
import { TaskCreateForm } from '../../../types/forms'

describe('CreateTaskForm', () => {
  it('emits task when create is successful', async () => {
    const task = stubTask()
    const response = stubApiResponse<Task, TaskCreateForm>(true, task, null)
    vi.spyOn(apiTasks, 'createTask').mockResolvedValueOnce(response)

    const wrapper = mount(CreateTaskForm)

    wrapper.find('input').setValue('Test task')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('onCreate')).toHaveLength(1)
    expect(wrapper.emitted('onCreate')?.[0]).toEqual([task])
  })
})
