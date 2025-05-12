import {beforeEach, describe, expect, it, vi} from 'vitest';
import {mountSuspended} from "@nuxt/test-utils/runtime";
import IndexPage from '~/pages/index.vue';
import {UButton, UInputMenu, UInputNumber} from "#components";
import {useStorage} from '@vueuse/core'
import {loremIpsum} from 'lorem-ipsum';

const copyMock = vi.fn();

vi.mock('@vueuse/core', async (importOriginal) => ({
    ...await importOriginal(),
    useStorage: vi.fn((_, initialValue) => ref(initialValue)),
    useClipboard: vi.fn(() => ({ copy: copyMock }))
}))

vi.mock('lorem-ipsum', () => ({
    loremIpsum: vi.fn(({count, units}) => `Generated lorem ipsum: ${count} ${units}`)
}))

describe('IndexPage', () => {

    beforeEach(() => vi.clearAllMocks());

    it('Renders correctly with initial data', async () => {
        const wrapper = await mountSuspended(IndexPage);

        expect(useStorage).toHaveBeenCalledWith('amount', 5);
        expect(useStorage).toHaveBeenCalledWith('unit', 'Paragraph');
        expect(loremIpsum).toHaveBeenCalledWith({count: 5, units: 'paragraph'});
        expect(wrapper.find('p.whitespace-pre-wrap').text())
            .toBe(loremIpsum({count: 5, units: 'paragraph'}));
    });

    it('Generates text on load and input changes', async () => {
        const wrapper = await mountSuspended(IndexPage);

        wrapper.findComponent(UInputNumber).vm.$emit('update:modelValue', 10);
        wrapper.findComponent(UInputMenu).vm.$emit('update:modelValue', 'Sentence');

        await wrapper.vm.$nextTick();

        expect(loremIpsum).toHaveBeenCalledWith({count: 10, units: 'sentence'});
        expect(wrapper.find('p.whitespace-pre-wrap').text())
            .toBe(loremIpsum({count: 10, units: 'sentence'}));
    });

    it('Copies text and shows confirmation', async () => {
        const wrapper = await mountSuspended(IndexPage);

        wrapper.findAllComponents(UButton).find(component => component.props().label === 'Copy')?.find('button')?.trigger('click');

        expect(copyMock).toHaveBeenCalled();
    });
});
