import { mount } from '@vue/test-utils'
import { describe, it, expect, vi, MockedFunction } from 'vitest'
import { nextTick } from 'vue'
import CreateTaskForm from '../Create.vue'
import { createTask } from '../../../api/tasks'
import { Task } from '../../../types/models'

vi.mock('../../../api/tasks', () => ({
  createTask: vi.fn(),
}))

describe('CreateTaskForm', () => {
  it('emits task when create is successful', async () => {
    const task: Task = {
      _id: "random-id",
      titulo: 'Test task',
      completed_at: new Date(),
      created_at: new Date(),
      user_id: 'random-user-id',
    };
    (createTask as MockedFunction<typeof createTask>).mockResolvedValueOnce({ success: true, data: task, error: null })

    const wrapper = mount(CreateTaskForm)

    wrapper.find('input').setValue('Test task')
    await wrapper.find('button').trigger('click')

    expect(wrapper.emitted('onCreate')).toHaveLength(1)
    expect(wrapper.emitted('onCreate')?.[0]).toEqual([task])
  })
})
