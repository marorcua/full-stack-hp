import { shallowMount } from '@vue/test-utils'
import AlbumList from '@/components/AlbumList.vue'
import { albumResponse } from './response'

describe('AlbumList.vue', () => {
  it('renders input', () => {
    const wrapper = shallowMount(AlbumList)
    const input = wrapper.find('input')
    expect(input).toBeTruthy()
  })

  it('writes in input and is collected by component', () => {
    const wrapper = shallowMount(AlbumList)
    const input = wrapper.find('input')
    const newValue = 'Updated value'
    input.setValue(newValue)

    expect(wrapper.vm.artist).toEqual(newValue)
  })

  it('button exists and calls fetchAlbums() when clicked', () => {
    const wrapper = shallowMount(AlbumList)
    const fetchButton = wrapper.find('button')
    const spy = jest.spyOn(wrapper.vm, 'fetchAlbums')
    fetchButton.trigger('click')
    expect(fetchButton).toBeTruthy()
    expect(spy).toBeCalled()
  })
})

describe('AlbumList.vue api call', () => {
  it('displays correctly the data', (done) => {
    const wrapper = shallowMount(AlbumList)
    const fetchButton = wrapper.find('button')
    const spy = jest.spyOn(wrapper.vm, 'fetchAlbums')
    spy.mockImplementation(() => (wrapper.vm.originalAlbums = albumResponse))
    fetchButton.trigger('click')

    wrapper.vm.$nextTick(() => {
      expect(JSON.stringify(wrapper.vm.originalAlbums)).toBe(
        JSON.stringify(albumResponse)
      )
      done()
    })
  })
})
