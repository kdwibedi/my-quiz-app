import { mount } from "@vue/test-utils";
import { createPinia, createTestingPinia  } from "pinia";
import HomeView from '@/views/HomeView.vue'
import { useQuizStore } from '@/store/todo';



describe("Quiz component", () => {
  let pinia;
  let store;

  beforeEach(() => {
    pinia = createTestingPinia()
  });

  test('fetchCategories action', async () => {
    jest.spyOn(pinia._p, 'fetch').mockImplementation(() => Promise.resolve([{ id: 1, name: 'Test Category' }]))
    const store = useQuizStore(pinia)

    await store.fetchCategories()

    expect(store.categories).toEqual([{ id: 1, name: 'Test Category' }])
    expect(pinia._p.fetch).toHaveBeenCalledWith(fetchCategories)
  })
});