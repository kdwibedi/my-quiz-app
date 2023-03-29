import { shallowMount, mount, unmount } from '@vue/test-utils'
import HomeView from '@/views/HomeView.vue'
import { setActivePinia, createPinia } from 'pinia'
import { createTestingPinia } from '@pinia/testing'
import { useQuizStore } from '@/store/quiz'

const mockStore = {
  state: {
    categories: [{id:1, name:"www"}]
  },
  actions: {
    fetchCategories: jest.fn(() => Promise.resolve('mocked data'))
  }
}

const pinia = createTestingPinia()
pinia.use(() => mockStore)

describe('MyComponent', () => {
  it('renders with mocked data', async () => {
    // mount the component with the pinia instance

    mockStore.actions.fetchCategories.mockImplementation(() => { return  [{id:1, name:"www"}]})

    const wrapper = mount(HomeView, {
      global: {
        plugins: [pinia]
      }
    })

    // wait for any asynchronous actions to complete
    await wrapper.vm.$nextTick()

    
  })
})