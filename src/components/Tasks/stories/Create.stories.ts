import { defineComponent } from 'vue';
import { action } from '@storybook/addon-actions';
import CreateForm from '../Create.vue';

export default {
  title: 'CreateForm',
  component: CreateForm,
};

export const CreateTask = () => defineComponent({
  components: { CreateForm },
  template: `
    <div class="flex justify-center items-center h-screen">
      <create-form @create="onCreate" />
    </div>
  `,
  methods: {
    onCreate: action('create'),
  },
});